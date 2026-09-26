# QA Automation Protocol

## Task 1: Test Suite Management
1. Read `requirements/app_requirements.md`.
2. Generate or update structured test cases in `test-cases/test_cases.md` using a Markdown table.
3. Columns: `Test ID`, `Feature`, `Action Steps`, `Expected Result`, `Execution Status`, `Notes`.

## Task 2: Browser Actuation & Exploration
1. Parse test scenarios directly from `test-cases/test_cases.md`.
2. Execute test cases against the application URL.
3. Do NOT save screenshots for passed tests. Save screenshots to `reports/bug_reports/screenshots/` ONLY if a step fails.

## Task 3: Reporting & Markdown Logging
1. Directly edit `test-cases/test_cases.md` to update `Execution Status` to `PASSED` or `FAILED`.
2. For every `FAILED` test case, create `reports/bug_reports/BUG-[ID].md` formatted according to `templates/bug_report_template.md`.