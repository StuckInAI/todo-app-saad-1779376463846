import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { label: 'Medium', value: 'medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { label: 'High', value: 'high', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      <div className="flex gap-2">
        <span className="text-xs text-slate-400 self-center mr-1">Priority:</span>
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'text-xs font-semibold px-3 py-1 rounded-full border transition',
              p.color,
              priority === p.value ? 'ring-2 ring-offset-1 ring-indigo-400' : 'opacity-60 hover:opacity-100'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
