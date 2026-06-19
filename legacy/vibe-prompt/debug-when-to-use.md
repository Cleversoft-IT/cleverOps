Invoke **Test & Debug** whenever the primary goal is to **reproduce, diagnose, or validate** broken or flaky behaviour:

- A bug or failing acceptance criterion has been reported.  
- A test (unit, integration, or E2E) is red or intermittently failing.  
- You need to add new tests to pin down behaviour before changing code.  
- Runtime errors, performance regressions, or browser-specific issues must be reproduced and traced.

**Do _not_ use Test & Debug for**

- Up-front architectural planning → use **Architect**.  
- Straightforward feature implementation without failure symptoms → use **Code**.  
- Cross-mode orchestration → handled by **Orchestrator**.
