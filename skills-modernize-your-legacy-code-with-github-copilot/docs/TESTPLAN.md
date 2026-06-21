# COBOL Account Management Test Plan

This test plan covers the current business logic implemented by the COBOL account management application. It is intended for validation with business stakeholders and later use in unit and integration tests for the Node.js transformation.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | View current account balance | Application is running and initial balance is available | 1. Start the application
2. Select option 1 (View Balance) | The application displays the current balance (initially 1000.00) |  |  |  |
| TC-002 | Credit account with a valid amount | Application is running and balance is 1000.00 or current balance is known | 1. Start the application
2. Select option 2 (Credit Account)
3. Enter credit amount 200.00 | The application reads the current balance, adds 200.00, updates the balance, and displays 1200.00 |  |  |  |
| TC-003 | Debit account with sufficient funds | Application is running and balance is 1000.00 or greater | 1. Start the application
2. Select option 3 (Debit Account)
3. Enter debit amount 200.00 | The application reads the current balance, subtracts 200.00, updates the balance, and displays 800.00 |  |  |  |
| TC-004 | Debit account with insufficient funds | Application is running and balance is less than debit amount | 1. Start the application
2. Select option 3 (Debit Account)
3. Enter debit amount higher than current balance | The application displays "Insufficient funds for this debit." and does not change the balance |  |  |  |
| TC-005 | Exit application from menu | Application is running | 1. Start the application
2. Select option 4 (Exit) | The application stops the menu loop and displays "Exiting the program. Goodbye!" |  |  |  |
| TC-006 | Invalid menu selection handling | Application is running | 1. Start the application
2. Enter an invalid option such as 5 or a non-numeric input | The application displays "Invalid choice, please select 1-4." and remains in the menu |  |  |  |
| TC-007 | Balance persists within a session after credit | Application is running and balance is initialized | 1. Start application
2. Credit 100.00
3. View balance | The displayed balance reflects the credited amount and remains updated for the session |  |  |  |
| TC-008 | Balance persists within a session after debit | Application is running and balance is initialized | 1. Start application
2. Debit 100.00 with sufficient funds
3. View balance | The displayed balance reflects the debited amount and remains updated for the session |  |  |  |
| TC-009 | Data module read operation returns current balance | Application is running | 1. Start application
2. Select option 1 (View Balance) | `DataProgram` is invoked with `READ` and returns the current balance to `Operations` |  |  |  |
| TC-010 | Data module write operation saves updated balance | Application is running and an update is performed | 1. Start application
2. Perform a credit or debit operation
3. Confirm updated balance via view balance | `DataProgram` is invoked with `WRITE` and stores the new balance for the session |  |  |  |
| TC-011 | Credit zero amount | Application is running and balance is known | 1. Start application
2. Select option 2 (Credit Account)
3. Enter credit amount 0.00 | The application reads the balance, adds 0.00, updates the balance unchanged, and displays the same current balance |  |  |  |
| TC-012 | Debit zero amount | Application is running and balance is known | 1. Start application
2. Select option 3 (Debit Account)
3. Enter debit amount 0.00 | The application reads the balance, subtracts 0.00, updates the balance unchanged, and displays the same current balance |  |  |  |
| TC-013 | Credit with a negative amount | Application is running | 1. Start application
2. Select option 2 (Credit Account)
3. Enter negative credit amount such as -100.00 | The application should treat negative values as invalid input or reject the entry; balance should not be increased incorrectly |  |  |  |
| TC-014 | Debit with a negative amount | Application is running | 1. Start application
2. Select option 3 (Debit Account)
3. Enter negative debit amount such as -50.00 | The application should treat negative values as invalid input or reject the entry; balance should not be reduced incorrectly |  |  |  |
| TC-015 | Credit with non-numeric input | Application is running | 1. Start application
2. Select option 2 (Credit Account)
3. Enter invalid input such as "abc" | The application should reject non-numeric input, display an error or re-prompt, and not change the balance |  |  |  |
| TC-016 | Debit with non-numeric input | Application is running | 1. Start application
2. Select option 3 (Debit Account)
3. Enter invalid input such as "xyz" | The application should reject non-numeric input, display an error or re-prompt, and not change the balance |  |  |  |
| TC-017 | Debit exact available balance | Application is running and balance is 1000.00 | 1. Start application
2. Select option 3 (Debit Account)
3. Enter debit amount 1000.00 | The application subtracts the exact amount, updates balance to 0.00, and displays the new balance |  |  |  |
| TC-018 | Credit amount boundary test at maximum field size | Application is running and current balance is known | 1. Start application
2. Select option 2 (Credit Account)
3. Enter a large amount near input limit, such as 999999.99 | The application should accept the amount if supported by the numeric field or display a validation error if out of range |  |  |  |
| TC-019 | Debit amount boundary test at maximum field size | Application is running and balance is sufficient | 1. Start application
2. Select option 3 (Debit Account)
3. Enter a large amount near input limit, such as 999999.99 | The application should process the debit if balance supports it, or display an error if the amount is out of range |  |  |  |
| TC-020 | Multiple sequential operations in one session | Application is running and initial balance is known | 1. Start application
2. Credit 200.00
3. Debit 150.00
4. View balance | The application correctly updates the balance after each operation and displays the final expected balance |  |  |  |
| TC-021 | Repeated invalid menu entries then valid selection | Application is running | 1. Start application
2. Enter invalid option 9
3. Enter invalid option "abc"
4. Enter valid option 1 | The application shows invalid choice messages and continues to accept menu input until a valid option is entered |  |  |  |
| TC-022 | Session non-persistence check | Application is restarted after operations | 1. Start application
2. Credit 100.00
3. Exit application
4. Restart application
5. View balance | The application resets to the initial balance of 1000.00 because current implementation stores balance only in memory |  |  |  |

> Note: The current COBOL implementation stores the balance in memory for the running session only. It does not persist account data between application restarts.
