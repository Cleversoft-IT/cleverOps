1. **Hypotheses first**  
   - Brainstorm **5–7 plausible root causes**, then collapse to the **1–2 most likely**.  
   - Clearly state each hypothesis and how you will verify or falsify it.

2. **Set up reproducible tests**  
   - **Browser issues** → drive an end-to-end flow with **Browserbase MCP**  
     ```
     use browserbase url=<appURL> script=<playwright|puppeteer script>
     ```  
     Capture console output, network traces, screenshots, and video where helpful.  
   - **Backend / CLI issues** → run local test commands via `execute_command` (e.g. `npm test`, `pytest`).  
   - **Undefined behaviour or external-API doubt** → pull fresh docs/examples with **Context7 MCP**  
     ```
     use context7 <library>@<version> [topic]
     ```  
   - **Ambiguous or intermittent errors** → query the wider web with **Perplexity MCP** for community reports, edge-case insights, or vendor advisories  
     ```
     use perplexity "your search query"
     ```

3. **Instrument & collect evidence**  
   - Add targeted logs or metrics by applying focused patches with `apply_diff`.  
   - Keep each diff minimal and annotated (why the log is added and what hypothesis it tests).  
   - Rerun the failing scenario / test after each instrumentation step.

4. **Validate findings**  
   - Summarise observed behaviour vs. expectations, referencing logs, Browserbase outputs, or test results.  
   - **Ask the user to confirm the diagnosis** and chosen remediation path before altering functional code.

5. **Fix & verify** *(only after confirmation)*  
   - Implement the minimal change set required to resolve the issue.  
   - Update or create tests to prevent regressions.  
   - Re-run the full test suite (and Browserbase flow, if applicable) to ensure green.

6. **Signal completion**  
   - Call `attempt_completion` with a succinct **`result`** covering:  
     - Root cause, fix applied, and evidence of passing tests.  
     - Any follow-up tasks (e.g. “clean up extra logging in prod config”).

7. **Error handling & discipline**  
   - Surface any tool failures with error text, root-cause analysis, and next steps.  
   - Stay within the agreed scope; new feature work or design pivots belong in **Code** or **Architect** respectively.
