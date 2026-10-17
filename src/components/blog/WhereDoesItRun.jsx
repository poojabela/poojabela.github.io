import { useState } from "react";

const PLACES = ["main", "preload", "renderer"];

const questions = [
  {
    code: 'document.querySelector("#title")',
    answer: "renderer",
    why: "The DOM only exists in the page.",
  },
  {
    code: "new BrowserWindow({ width: 800 })",
    answer: "main",
    why: "Only the main process can create windows.",
  },
  {
    code: 'contextBridge.exposeInMainWorld("notes", api)',
    answer: "preload",
    why: "The preload script is where you choose what the page can call.",
  },
  {
    code: 'fs.readFile("notes.txt")',
    answer: "main",
    why: "File access needs Node.js, and the page doesn't have it by default.",
  },
  {
    code: 'ipcRenderer.invoke("notes:read")',
    answer: "preload",
    why: "The page can't see ipcRenderer. The preload script uses it and exposes a small function instead.",
  },
  {
    code: "dialog.showOpenDialog()",
    answer: "main",
    why: "Native dialogs belong to the operating system, so they live in the main process.",
  },
];

export default function WhereDoesItRun() {
  const [picked, setPicked] = useState({});
  const answered = Object.keys(picked).length;
  const score = questions.filter((q, i) => picked[i] === q.answer).length;

  return (
    <div className="not-prose my-10 rounded-md border-2 border-dashed border-faint p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-hand text-2xl font-bold">quiz: where does this line run?</p>
        {answered > 0 && (
          <p className="font-hand text-xl text-pencil">
            {score} / {answered} right
            <button type="button" onClick={() => setPicked({})} className="ml-3 underline decoration-wavy underline-offset-4 hover:text-ink">
              reset
            </button>
          </p>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {questions.map((q, i) => {
          const choice = picked[i];
          const correct = choice === q.answer;
          return (
            <div key={q.code} className="rounded-md border-2 border-ink bg-card p-3 shadow-[3px_3px_0_var(--ink)]">
              <code className="block overflow-x-auto text-sm whitespace-nowrap">{q.code}</code>
              <div className="mt-3 flex flex-wrap gap-2">
                {PLACES.map((place) => {
                  const isChoice = choice === place;
                  const isAnswer = choice && place === q.answer;
                  return (
                    <button
                      key={place}
                      type="button"
                      disabled={Boolean(choice)}
                      onClick={() => setPicked((prev) => ({ ...prev, [i]: place }))}
                      className={`rounded-md border-2 px-2.5 py-0.5 font-hand text-lg font-bold transition-all ${
                        isAnswer
                          ? "border-[#2e9e5b] bg-[#2e9e5b] text-white"
                          : isChoice
                            ? "border-[#e5484d] bg-[#e5484d] text-white"
                            : choice
                              ? "border-faint text-faint"
                              : "border-ink hover:-translate-y-px hover:shadow-[2px_2px_0_var(--ink)]"
                      }`}
                    >
                      {place}
                    </button>
                  );
                })}
              </div>
              {choice && (
                <p className="mt-2 text-sm">
                  <span className="font-bold">{correct ? "Yes." : `It's ${q.answer}.`}</span>{" "}
                  <span className="text-pencil">{q.why}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
