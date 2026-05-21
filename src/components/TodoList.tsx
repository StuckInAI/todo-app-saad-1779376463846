import type { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';
import { ClipboardList } from 'lucide-react';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-300">
        <ClipboardList size={48} strokeWidth={1.5} />
        <p className="mt-4 text-sm font-medium text-slate-400">No tasks here!</p>
        <p className="text-xs text-slate-300 mt-1">Add a task above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {todos.map((todo, idx) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          isLast={idx === todos.length - 1}
        />
      ))}
    </ul>
  );
}
