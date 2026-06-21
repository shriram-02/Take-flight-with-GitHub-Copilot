# COBOL Account Management Documentation

This documentation describes the COBOL source files in `src/cobol/` and explains the purpose of each program, its key operations, and the business rules implemented for account management.

## File Overview

### `src/cobol/main.cob`
- Purpose: Provides the main user interface and menu loop for the account management system.
- Behavior:
  - Displays options to view balance, credit the account, debit the account, or exit.
  - Accepts the user's menu selection and calls the `Operations` program with the corresponding operation code.
  - Repeats until the user chooses to exit.
- Key control flow:
  - `PERFORM UNTIL CONTINUE-FLAG = 'NO'`
  - `EVALUATE USER-CHOICE`
  - Calls `Operations` with `'TOTAL '`, `'CREDIT'`, or `'DEBIT '`.

### `src/cobol/operations.cob`
- Purpose: Implements the main account operations and coordinates read/write access to account data.
- Key operations:
  - `TOTAL`: Reads the current balance and displays it.
  - `CREDIT`: Prompts for a credit amount, reads the balance, adds the amount, updates the stored balance, and displays the new balance.
  - `DEBIT`: Prompts for a debit amount, reads the balance, checks funds, subtracts the amount if sufficient, updates the stored balance, and displays the new balance.
- Data flow:
  - Uses `CALL 'DataProgram' USING 'READ', FINAL-BALANCE` to fetch the stored balance.
  - Uses `CALL 'DataProgram' USING 'WRITE', FINAL-BALANCE` to persist balance updates.
- Business rules:
  - Debit transactions require sufficient funds: `FINAL-BALANCE >= AMOUNT`.
  - If insufficient funds exist, the program displays an error and does not modify the balance.

### `src/cobol/data.cob`
- Purpose: Acts as the data storage and access module for the account balance.
- Responsibilities:
  - Maintains `STORAGE-BALANCE` as the current account balance in working storage.
  - Implements read and write operations via the `DataProgram` callable module.
- Behavior:
  - On `'READ'`, moves `STORAGE-BALANCE` to the caller's `BALANCE` field.
  - On `'WRITE'`, updates `STORAGE-BALANCE` with the passed-in `BALANCE` value.
- Notes:
  - This example uses in-memory storage and does not persist data across program execution.
  - The initial account balance is set to `1000.00`.

## Business Rules for Student Accounts

Although the current COBOL source is written as a generic account management system, it models the following student account business rules:

- A student account begins with a default balance of `1000.00`.
- Students can view their current balance at any time.
- Students can credit their account with a positive amount.
- Students can debit their account only if sufficient funds are available.
- Debit attempts that exceed the current balance are rejected with an "Insufficient funds" message.
- The system uses a simple menu-driven interface to select account operations.

## Notes on COBOL Structure

- `main.cob` is the entry point and user menu controller.
- `operations.cob` contains the account operation logic and enforces the core business rules.
- `data.cob` leverages COBOL linkage sections and `CALL` statements to simulate a shared account data module.

## How the Files Work Together

1. `MainProgram` asks the user which account action to perform.
2. Based on the choice, `MainProgram` calls `Operations` with an operation code.
3. `Operations` uses `DataProgram` to read or write the account balance.
4. `DataProgram` keeps the current balance in memory and returns it to `Operations`.

This documentation should help developers understand the role of each COBOL module and how account operations are handled in this legacy code sample.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Main as MainProgram
    participant Ops as Operations
    participant Data as DataProgram

    User->>Main: Start app
    Main->>User: Display menu
    User->>Main: Enter choice
    Main->>Ops: CALL 'Operations' USING operationCode

    alt View Balance
        Ops->>Data: CALL 'DataProgram' USING 'READ', FINAL-BALANCE
        Data-->>Ops: return FINAL-BALANCE
        Ops-->>User: Display current balance
    else Credit Account
        Ops-->>User: Prompt credit amount
        User-->>Ops: Enter AMOUNT
        Ops->>Data: CALL 'DataProgram' USING 'READ', FINAL-BALANCE
        Data-->>Ops: return FINAL-BALANCE
        Ops: ADD AMOUNT TO FINAL-BALANCE
        Ops->>Data: CALL 'DataProgram' USING 'WRITE', FINAL-BALANCE
        Ops-->>User: Display new balance
    else Debit Account
        Ops-->>User: Prompt debit amount
        User-->>Ops: Enter AMOUNT
        Ops->>Data: CALL 'DataProgram' USING 'READ', FINAL-BALANCE
        Data-->>Ops: return FINAL-BALANCE
        alt Sufficient funds
            Ops: SUBTRACT AMOUNT FROM FINAL-BALANCE
            Ops->>Data: CALL 'DataProgram' USING 'WRITE', FINAL-BALANCE
            Ops-->>User: Display new balance
        else Insufficient funds
            Ops-->>User: Display "Insufficient funds for this debit."
        end
    end

    alt Exit
        Main-->>User: Exit message
    end
```
