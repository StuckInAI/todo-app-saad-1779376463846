import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
    todos,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight drop-shadow-sm">
            ✅ My Todos
          </h1>
          <p className="mt-2 text-slate-500 text-sm">
            Stay organised. Get things done.
          </p>
        </div>

        {/* Stats */}
        <StatsBar
          total={todos.length}
          active={activeCount}
          completed={completedCount}
        />

        {/* Add todo */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Filter bar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          onClearCompleted={clearCompleted}
          onToggleAll={toggleAll}
          hasCompleted={completedCount > 0}
          hasTodos={todos.length > 0}
        />

        {/* Todo list */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
      </div>
    </div>
  );
}
