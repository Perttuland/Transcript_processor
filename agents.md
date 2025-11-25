# Agent Operating Protocols: The Autonomous Standard

This document defines the **Standard Operating Procedures (SOP)** for AI agents working on this project. Your goal is **autonomous success**: completing complex tasks without user intervention by being rigorous, self-correcting, and methodical.

## Core Philosophy: "Slow is Smooth, Smooth is Fast"
- **Precision > Speed**: A correct step taken slowly is infinitely faster than a broken step taken quickly.
- **Verify > Assume**: Never assume a command worked. Always check.
- **Fix > Ask**: When things break, try to fix them yourself using logic and evidence before stopping.

---

## 1. The Autonomous Workflow Cycle

Every task must follow this strict cycle. Do not skip steps.

### Phase 1: Planning (The "Measure Twice" Phase)
Before writing a single line of code:
1.  **Understand the Goal**: Read the user request and `task.md`.
2.  **Research**: Check existing files, directory structures, and documentation.
    - *Rule*: Do not import a file you haven't checked exists.
    - *Rule*: Do not use a library you haven't verified is installed (`package.json`).
3.  **Plan Atomic Steps**: Break the task into the smallest possible units.
    - *Bad Plan*: "Refactor the auth system."
    - *Good Plan*: "1. Create `AuthService` interface. 2. Implement `Login` method. 3. Create unit test for `Login`."

### Phase 2: Execution (The "Cut Once" Phase)
Execute your plan one step at a time.
1.  **Atomic Actions**: Edit one file or run one command at a time.
2.  **Sequential Execution**: Never chain commands with `&&` (unless you are 100% sure of the shell syntax). Run them separately.
3.  **Immediate Verification**: After *every* significant action (file creation, dependency install), verify the result.
    - *Action*: `npm install tailwindcss`
    - *Verification*: `npm run build` (Does it still build?)
    - *Action*: Create `Button.tsx`
    - *Verification*: Check file exists and has content.

### Phase 3: Self-Correction (The "Resilience" Phase)
If a step fails, enter the Self-Correction Loop:
1.  **Read the Error**: Do not skim. Read the *entire* error message.
2.  **Diagnose**: Why did it fail? (Missing file? Syntax error? Wrong version?)
3.  **Hypothesize & Fix**: Formulate a fix and apply it.
4.  **Verify Fix**: Run the verification step again.
5.  **Escalate (Last Resort)**: Only if you fail 3 times on the same issue, stop and document the failure for the user.

---

## 2. Critical Rules of Engagement

### 🛑 Zero Tolerance for "Blind Fixes"
- **Never** apply a fix without understanding the error.
- **Never** "try random things" to see if they work.
- **Example**: If a build fails, do not just delete the failing line. Understand *why* it failed.

### 🔍 Context is King
- **Maintain `task.md`**: You are responsible for keeping the `task.md` up to date. It is your memory.
- **Read `package.json`**: Before importing *anything*, check `package.json`.
- **Check File Paths**: Always use `list_dir` or `find_by_name` if you are unsure of a path.

### 🛠️ Tool Usage Best Practices
- **`run_command`**:
    - Always set `Cwd` explicitly.
    - For long-running processes (like dev servers), use `WaitMsBeforeAsync`.
    - For setup commands, verify success immediately after.
- **`replace_file_content`**:
    - Use unique context. If `TargetContent` matches multiple places, the tool will fail.
    - Verify the file content after replacement if the change is complex.
- **`write_to_file`**:
    - Always provide a full, valid path.

---

## 3. The "Anti-Patterns" (What NOT to do)
1.  **The "Kitchen Sink" Install**: Installing 10 libraries at once. *Result*: Dependency conflicts.
2.  **The "Ghost" Edit**: Editing a file that doesn't exist or has moved. *Result*: Tool error.
3.  **The "Silent Fail"**: Ignoring a command failure and proceeding to the next step. *Result*: Catastrophic failure later.
4.  **The "Syntax Guess"**: Guessing PowerShell syntax (e.g., `export VAR=val`). *Result*: Command failure.

## 4. Verification Checklist
Before marking a task as "Done":
- [ ] Does the code build? (`npm run build`)
- [ ] Do the tests pass? (`npm test`)
- [ ] Are there any linting errors?
- [ ] Did I clean up temporary files?

Follow these protocols, and you will succeed.
