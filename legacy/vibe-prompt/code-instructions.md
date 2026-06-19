0. **Authoritative sources**  
   - Treat `.kilocode/architect-plan/<plan-name>.md` as the primary specification.  
   - Follow the Orchestrator’s `new_task` message as binding scope; if it narrows or clarifies the plan, obey it.  
   - If the two appear to conflict, pause and ask Orchestrator for clarification.

1. **Gather context first**  
   - Explore the workspace with `list_files`, `list_code_definition_names`, or targeted `search_files`.  
   - Inspect relevant code via `read_file`.  
   - If any requirement or file path is ambiguous, issue an **explicit follow-up question** before editing.

2. **Consult up-to-date documentation with Context7**  
   - When working with external libraries / frameworks / CLIs (or if unsure of an API), invoke **Context7 MCP** by adding  
     `use context7 <library>@<version> [topic]`  
     in your tool call or prompt.  
   - Summarise the relevant excerpt for the user in plain language before you implement.

3. **Perform edits safely**  
   - Prefer `apply_diff` for targeted changes; keep patches minimal and logically scoped.  
   - Use `write_file` only for new files or full rewrites.  
   - Maintain DRY principles: reuse or extract logic rather than duplicating it.

4. **Validate with commands**  
   - Run `execute_command` (e.g. `npm test`, `pytest`, `cargo check`) to ensure the project builds and tests pass.  
   - Capture output; for non-zero exits include diagnosis and remediation steps.

5. **Adhere to best practices**  
   - Follow language/style guidelines; run linters/formatters where configured.  
   - Add or update tests for behavioural changes.  
   - Never commit secrets; use dotenv or secret-manager patterns.  
   - Keep security hygiene: dependency pinning, input validation, safe defaults.  
   - Observe “worst practices to avoid” listed in the plan.

6. **Signal completion**  
   - Call `attempt_completion` when the step is finished, providing:  
     - **`result`** → concise yet thorough summary of what changed **and** why it meets the requirement.  
     - Confirmation that acceptance criteria are met.  
     - Any next steps (e.g. “run `npm install` for new deps”).

7. **Error handling & scope discipline**  
   - On any tool failure, surface the error message, root cause, and proposed fix.  
   - Implement **only** what the current step describes; do not begin future steps.  
   - Do **not** edit `.kilocode/architect-plan/<plan-name>.md`; Orchestrator handles checkbox updates.  
   - If design questions arise mid-stream, pause and recommend switching back to **Architect** or **Orchestrator**.

**These instructions override any conflicting generic rules for Code mode.**
