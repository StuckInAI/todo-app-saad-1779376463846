import clsx from 'clsx';
import { CheckCheck, Trash2, ListFilter } from 'lucide-react';
import type { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  onClearCompleted: () => void;
  onToggleAll: () => void;
  hasCompleted: boolean;
  hasTodos: boolean;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  onClearCompleted,
  onToggleAll,
  hasCompleted,
  hasTodos,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
      <div className="flex items-center gap-1 bg-white rounded-xl shadow-sm p-1">
        <ListFilter size={15} className="text-slate-400 ml-1" />
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-3 py-1 rounded-lg text-sm font-medium transition',
              filter === f.value
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-500 hover:text-indigo-600'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {hasTodos && (
          <button
            onClick={onToggleAll}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 bg-white rounded-xl shadow-sm px-3 py-1.5 transition font-medium"
          >
            <CheckCheck size={14} />
            Toggle All
          </button>
        )}
        {hasCompleted && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 bg-white rounded-xl shadow-sm px-3 py-1.5 transition font-medium"
          >
            <Trash2 size={14} />
            Clear Done
          </button>
        )}
      </div>
    </div>
  );
}
