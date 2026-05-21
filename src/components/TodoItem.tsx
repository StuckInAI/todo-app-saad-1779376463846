import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  isLast: boolean;
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-600',
  medium: 'bg-amber-100 text-amber-600',
  high: 'bg-red-100 text-red-600',
};

const PRIORITY_BORDER: Record<string, string> = {
  low: 'border-l-emerald-400',
  medium: 'border-l-amber-400',
  high: 'border-l-red-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(
        'flex items-center gap-3 px-5 py-4 group border-l-4 transition-all',
        PRIORITY_BORDER[todo.priority],
        todo.completed ? 'bg-slate-50' : 'bg-white'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Text / Edit input */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            type="text"
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onBlur={handleEditSave}
            className="w-full text-sm border-b-2 border-indigo-400 focus:outline-none bg-transparent py-0.5 text-slate-700"
          />
        ) : (
          <span
            className={clsx(
              'text-sm block truncate',
              todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
            )}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge */}
      {!editing && (
        <span
          className={clsx(
            'text-xs font-semibold px-2 py-0.5 rounded-full capitalize flex-shrink-0',
            PRIORITY_BADGE[todo.priority]
          )}
        >
          {todo.priority}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleEditSave}
              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition"
              aria-label="Save"
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
