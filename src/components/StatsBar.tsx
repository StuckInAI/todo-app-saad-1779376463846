type StatsBarProps = {
  total: number;
  active: number;
  completed: number;
};

export default function StatsBar({ total, active, completed }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-indigo-600">{total}</p>
        <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wide">Total</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-amber-500">{active}</p>
        <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wide">Active</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-emerald-500">{completed}</p>
        <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wide">Done</p>
      </div>
    </div>
  );
}
