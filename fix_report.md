# Bug Report: Phase 1 Navigation Issue

## Issue Description
The "Proceed to Framework Generation" button in Phase 1 required two clicks to work.
- **First Click:** Updated the application state but failed to navigate.
- **Second Click:** Successfully navigated using the state set by the first click.

## Root Cause Analysis
The issue was caused by a **race condition** between state updates and the navigation logic.

1.  **State Update:** The `proceedToFramework` function called `setPhase1Data`, which triggers an asynchronous React state update.
2.  **Navigation Check:** Immediately after, it called `navigateToPhase`, which checks `canProceedToPhase`.
3.  **The Race:** `canProceedToPhase` evaluated the *current* state (which was still empty/old because the update hadn't processed yet) and returned `false`, blocking navigation.
4.  **Second Click:** By the time of the second click, the state update from the first click had processed, so `canProceedToPhase` returned `true`, allowing navigation.

## Implemented Fix
We modified `Phase1_UploadAlign.tsx` to:

1.  **Bypass the Race Condition:** Instead of relying on `navigateToPhase` (which checks the potentially stale state), we now manually set the phase and navigate using `useNavigate` directly within the `proceedToFramework` function. This is safe because we *know* we just set the valid data in the lines above.
    ```typescript
    setPhase1Data(finalOutput, transcript);
    setCurrentPhase(Phase.PROCESSING_VALIDATION);
    navigate('/framework');
    ```

2.  **Tier 1 UX Improvements:**
    *   **Disabled Button:** The "Proceed" button is now disabled until the "Analysis Objective" field is filled.
    *   **Validation:** Added a check to prevent proceeding if the objective is empty (showing an error toast).
    *   **Placeholder:** Updated the objective textarea placeholder to clearly indicate it is required.

## Verification
- Verified that the UI changes (disabled button) are active.
- Confirmed that the navigation logic no longer relies on the asynchronous state check for this specific transition.
