'use client';

import type { Deduction } from '../types';

export function DeductionBoard({
  deduction,
  answers,
  onSelectOption,
}: {
  deduction: Deduction;
  answers: Record<string, string>;
  onSelectOption: (blankId: string, optionId: string) => void;
}) {
  return (
    <div>
      <p className="mb-4 text-xs leading-relaxed text-slate-500">{deduction.intro}</p>

      <div className="space-y-6">
        {deduction.blanks.map(blank => {
          const selectedId = answers[blank.id];
          const selectedOption = blank.options.find(o => o.id === selectedId);

          return (
            <div key={blank.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="mb-3 text-sm leading-relaxed text-slate-300">
                {blank.promptBefore}
                <span className="mx-1 inline-block min-w-[3rem] rounded border-b-2 border-amber-300/60 px-1 text-center font-medium text-amber-200">
                  {selectedOption ? selectedOption.text : '　　　　'}
                </span>
                {blank.promptAfter}
              </p>

              <div className="flex flex-wrap gap-2">
                {blank.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => onSelectOption(blank.id, opt.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      selectedId === opt.id
                        ? 'border-amber-300 bg-amber-300/15 text-amber-200'
                        : 'border-white/15 text-slate-300 hover:border-white/35'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
