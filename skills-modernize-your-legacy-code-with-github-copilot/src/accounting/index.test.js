const {
  dataModule,
  operationsModule,
  parseAmount,
  formatAmount,
} = require("./index");

describe("Accounting application business logic", () => {
  beforeEach(() => {
    dataModule.storageBalance = 1000.0;
  });

  test("TC-001: View current account balance", () => {
    expect(operationsModule.totalBalance()).toBe(1000.0);
  });

  test("TC-002: Credit account with a valid amount", () => {
    const newBalance = operationsModule.credit(200.0);
    expect(newBalance).toBe(1200.0);
    expect(dataModule.read()).toBe(1200.0);
  });

  test("TC-003: Debit account with sufficient funds", () => {
    const result = operationsModule.debit(200.0);
    expect(result.success).toBe(true);
    expect(result.balance).toBe(800.0);
    expect(dataModule.read()).toBe(800.0);
  });

  test("TC-004: Debit account with insufficient funds", () => {
    dataModule.storageBalance = 100.0;
    const result = operationsModule.debit(200.0);
    expect(result.success).toBe(false);
    expect(result.balance).toBe(100.0);
    expect(dataModule.read()).toBe(100.0);
  });

  test("TC-011: Credit zero amount", () => {
    const result = operationsModule.credit(0.0);
    expect(result).toBe(1000.0);
    expect(dataModule.read()).toBe(1000.0);
  });

  test("TC-012: Debit zero amount", () => {
    const result = operationsModule.debit(0.0);
    expect(result.success).toBe(true);
    expect(result.balance).toBe(1000.0);
    expect(dataModule.read()).toBe(1000.0);
  });

  test("TC-013: Credit with a negative amount is invalid", () => {
    expect(parseAmount("-100.00")).toBeNull();
  });

  test("TC-014: Debit with a negative amount is invalid", () => {
    expect(parseAmount("-50.00")).toBeNull();
  });

  test("TC-015: Credit with non-numeric input is invalid", () => {
    expect(parseAmount("abc")).toBeNull();
  });

  test("TC-016: Debit with non-numeric input is invalid", () => {
    expect(parseAmount("xyz")).toBeNull();
  });

  test("TC-017: Debit exact available balance", () => {
    const result = operationsModule.debit(1000.0);
    expect(result.success).toBe(true);
    expect(result.balance).toBe(0.0);
    expect(dataModule.read()).toBe(0.0);
  });

  test("TC-018: Credit large boundary amount near input limit", () => {
    const amount = parseAmount("999999.99");
    expect(amount).toBe(999999.99);
    const newBalance = operationsModule.credit(amount);
    expect(newBalance).toBeCloseTo(1000999.99, 2);
    expect(dataModule.read()).toBeCloseTo(1000999.99, 2);
  });

  test("TC-019: Debit large boundary amount near input limit", () => {
    dataModule.storageBalance = 1000000.0;
    const amount = parseAmount("999999.99");
    expect(amount).toBe(999999.99);
    const result = operationsModule.debit(amount);
    expect(result.success).toBe(true);
    expect(result.balance).toBeCloseTo(0.01, 2);
    expect(dataModule.read()).toBeCloseTo(0.01, 2);
  });

  test("TC-020: Multiple sequential operations in one session", () => {
    operationsModule.credit(200.0);
    operationsModule.debit(150.0);
    expect(operationsModule.totalBalance()).toBe(1050.0);
  });

  test("TC-022: Session data is in-memory and reset between runs", () => {
    operationsModule.credit(100.0);
    expect(dataModule.read()).toBe(1100.0);
    dataModule.storageBalance = 1000.0;
    expect(operationsModule.totalBalance()).toBe(1000.0);
  });

  test("Format amount prints two decimal places", () => {
    expect(formatAmount(1000)).toBe("1000.00");
    expect(formatAmount(1000.5)).toBe("1000.50");
  });
});
