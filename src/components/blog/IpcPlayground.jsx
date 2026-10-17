import { useRef, useState } from "react";

const NOTES = "buy milk, call mom, finish blog post";

const readSteps = [
  { active: "renderer", text: 'Your page calls window.notes.read().' },
  { active: "wire-1", direction: "forward", pill: '"notes:read"', text: "The preload script sends a notes:read message with ipcRenderer.invoke." },
  { active: "wire-2", direction: "forward", pill: '"notes:read"', text: "The message reaches the main process." },
  { active: "main", text: "ipcMain.handle runs and reads notes.txt from disk." },
  { active: "wire-2", direction: "back", pill: "text", text: "The file contents travel back." },
  { active: "wire-1", direction: "back", pill: "text", text: "The preload script resolves the promise." },
  { active: "renderer", text: "Your page shows the notes.", done: true },
];

const directSteps = [
  { active: "renderer", text: 'Your page calls require("fs")', error: true },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Box({ id, label, sub, active, error, children }) {
  return (
    <div
      className={`relative flex-1 rounded-md border-2 border-ink bg-card p-3 transition-all duration-300 ${
        active === id
          ? error
            ? "shadow-[4px_4px_0_#e5484d] -translate-y-1"
            : "shadow-[4px_4px_0_var(--pen)] -translate-y-1"
          : "shadow-[3px_3px_0_var(--ink)]"
      }`}
    >
      <p className="font-hand text-2xl leading-none font-bold">{label}</p>
      <p className="mt-1 text-xs text-pencil">{sub}</p>
      {children}
    </div>
  );
}

function Wire({ id, active, step }) {
  const isActive = active === id;
  return (
    <div className="ipc-wire relative flex shrink-0 items-center justify-center" aria-hidden="true">
      <span className="ipc-wire-line" />
      {isActive && (
        <span key={`${id}-${step.direction}-${step.pill}`} data-direction={step.direction} className="ipc-pill">
          {step.pill}
        </span>
      )}
    </div>
  );
}

export default function IpcPlayground() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState(readSteps);
  const [running, setRunning] = useState(false);
  const runId = useRef(0);

  const step = steps[stepIndex] ?? {};
  const showNotes = steps === readSteps && step.done;

  async function run(nextSteps) {
    const id = ++runId.current;
    setSteps(nextSteps);
    setRunning(true);
    for (let i = 0; i < nextSteps.length; i++) {
      if (runId.current !== id) return;
      setStepIndex(i);
      await wait(1100);
    }
    if (runId.current === id) setRunning(false);
  }

  function reset() {
    runId.current++;
    setRunning(false);
    setStepIndex(-1);
  }

  return (
    <div className="not-prose my-10 rounded-md border-2 border-dashed border-faint p-4 sm:p-6">
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-hand text-2xl font-bold">try it: send a message</p>
        {stepIndex >= 0 && (
          <button type="button" onClick={reset} className="font-hand text-xl text-pencil underline decoration-wavy underline-offset-4 hover:text-ink">
            reset
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-0 md:flex-row md:items-stretch">
        <Box id="renderer" label="renderer" sub="your page, one per window" active={step.active} error={step.error}>
          <div className="mt-3 rounded border border-faint bg-paper p-2 text-xs">
            <div className="mb-2 flex gap-1" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#e5484d]" />
              <span className="h-2 w-2 rounded-full bg-[#f2b705]" />
              <span className="h-2 w-2 rounded-full bg-[#2e9e5b]" />
            </div>
            {step.error ? (
              <span className="text-[#e5484d]">ReferenceError: require is not defined</span>
            ) : showNotes ? (
              <span>{NOTES}</span>
            ) : (
              <span className="text-faint">no notes loaded</span>
            )}
          </div>
        </Box>
        <Wire id="wire-1" active={step.active} step={step} />
        <Box id="preload" label="preload.js" sub="decides what the page can call" active={step.active === "wire-1" ? "preload" : step.active}>
          <code className="mt-3 block text-xs text-pencil">window.notes.read</code>
        </Box>
        <Wire id="wire-2" active={step.active} step={step} />
        <Box id="main" label="main process" sub="one per app, has Node.js" active={step.active}>
          <code className="mt-3 block text-xs text-pencil">notes.txt</code>
        </Box>
      </div>

      <p className="mt-5 min-h-12 text-sm" aria-live="polite">
        {stepIndex >= 0 ? (
          <>
            <span className="font-bold">
              {step.error ? "Blocked." : `Step ${stepIndex + 1} of ${steps.length}.`}
            </span>{" "}
            {step.text}
            {step.error && ". The page has no Node.js, so it has to ask the main process through the preload script."}
          </>
        ) : (
          <span className="text-pencil">Press a button to watch where the code runs.</span>
        )}
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={running}
          onClick={() => run(readSteps)}
          className="-rotate-1 rounded-md border-2 border-ink bg-card px-3 py-1 font-hand text-xl font-bold shadow-[3px_3px_0_var(--ink)] transition-all hover:-translate-y-px active:translate-y-0.5 active:shadow-none disabled:opacity-50"
        >
          load notes the right way
        </button>
        <button
          type="button"
          disabled={running}
          onClick={() => run(directSteps)}
          className="rotate-1 rounded-md border-2 border-ink bg-card px-3 py-1 font-hand text-xl font-bold shadow-[3px_3px_0_var(--ink)] transition-all hover:-translate-y-px active:translate-y-0.5 active:shadow-none disabled:opacity-50"
        >
          read the file from the page
        </button>
      </div>
    </div>
  );
}
