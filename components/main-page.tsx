"use client";
import {
  useAddTodo,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from "@/hooks/useTodos";
import { PencilSimpleIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import React, { FormEvent, useState, useMemo } from "react";

interface ITodo {
  title: string;
  _id: string;
}

function MainPage() {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateData, setUpdateData] = useState<ITodo | null>(null);
  const { data, isLoading } = useTodos();
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length > 3) {
      addTodo.mutate(title);
      setTitle("");
    }
  };

  const isDuplicate = useMemo(() => {
    if (!title.trim() || !data?.todos) return false;
    return data.todos.some(
      (todo: ITodo) => todo.title.toLowerCase() === title.toLowerCase()
    );
  }, [title, data?.todos]);

  const sortedTodos = useMemo(() => {
    if (!data?.todos) return [];
    if (!search.trim()) return data.todos;

    const lowerSearch = search.toLowerCase();

    const matched = data.todos.filter((todo: any) =>
      todo.title.toLowerCase().includes(lowerSearch)
    );
    const unmatched = data.todos.filter(
      (todo: any) => !todo.title.toLowerCase().includes(lowerSearch)
    );

    return [...matched, ...unmatched];
  }, [data?.todos, search]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full h-full ">
      {/* LEFT: Add Todo */}
      <div className="border-r p-7 border-gray-800">
        <div className=" text-center mb-4">add todo</div>
        <form onSubmit={(e) => handleAddTodo(e)}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="add new todo"
            className="
      w-full px-2 py-1 text-sm mb-3
      border-b border-gray-800
      caret-orange-400
      cursor-pointer
      outline-none
      "
          />
          {title.length > 0 && title.length <= 3 && (
            <p className="text-sm block text-center text-gray-600">
              enter more than 3 chars
            </p>
          )}
          <button
            type="submit"
            disabled={title.length <= 3 || isDuplicate}
            className={`w-full rounded-lg py-1 outline-none transition-all duration-300 ${
              isDuplicate
                ? "bg-zinc-500 cursor-not-allowed"
                : title.length > 3
                ? "bg-green-700 cursor-pointer"
                : "bg-zinc-700 cursor-not-allowed"
            }`}
          >
            {isDuplicate ? "already exists" : "add todo"}
          </button>
        </form>
      </div>

      {/* MIDDLE: Todos */}
      <div className="border-r py-7 border-gray-800">
        <div className=" text-center mb-4">todos</div>
        <div className="px-7">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            className="
        w-full px-2 py-1 text-sm mb-4
        border-b border-gray-800
        caret-orange-400
        cursor-pointer
        outline-none
      "
          />
        </div>
        <ul>
          {isLoading ? (
            <div className="px-7 h-[26rem] overflow-y-scroll scrollbar-hide">
              {[...Array(6)].map((_, i) => (
                <li
                  key={i}
                  className="border-b border-gray-800 flex justify-between items-center px-2 py-2 my-3"
                >
                  <div className="w-1/2 h-4 bg-zinc-700 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 bg-zinc-700 rounded animate-pulse"></div>
                    <div className="w-4 h-4 bg-zinc-700 rounded animate-pulse"></div>
                  </div>
                </li>
              ))}
            </div>
          ) : (
            <div className="px-7 h-[26rem] overflow-y-scroll scrollbar-hide">
              {sortedTodos.map((todo: any) => {
                const isMatch = todo.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
                return (
                  <li
                    className="border-b border-gray-800 flex justify-between items-center px-2 py-2 my-3"
                    key={todo._id}
                  >
                    <div
                      className={`capitalize ${
                        isMatch && search.length > 0 ? "text-yellow-400" : ""
                      }`}
                    >
                      {todo.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setUpdateData(todo);
                          setUpdateTitle(todo.title);
                        }}
                      >
                        <PencilSimpleIcon
                          className="cursor-pointer"
                          size={18}
                          weight="thin"
                        />
                      </button>
                      <button onClick={() => deleteTodo.mutate(todo._id)}>
                        <TrashSimpleIcon className="cursor-pointer" size={16} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </div>
          )}
        </ul>
      </div>

      {/* RIGHT: Update Todo */}
      <div className=" p-7 md:col-span-2 lg:col-span-1">
        <div className=" text-center mb-4">update todo</div>
        {updateData && (
          <>
            <input
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              placeholder="add new todo"
              className="
            w-full px-2 py-1 text-sm mb-3
            border-b border-gray-800
            caret-orange-400
            cursor-pointer
            outline-none
            "
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  updateTitle.trim().length > 3 &&
                    updateTodo.mutate({
                      id: updateData._id,
                      newTitle: updateTitle,
                    });
                  setUpdateData(null);
                }}
                disabled={updateData?.title === updateTitle}
                className={`w-full transition-all duration-300 ease-in-out rounded-lg py-1 ${
                  updateData?.title === updateTitle
                    ? "bg-zinc-500 cursor-not-allowed "
                    : "bg-yellow-600 cursor-pointer"
                } outline-none `}
              >
                {updateData?.title === updateTitle
                  ? "title is same "
                  : "update todo"}
              </button>

              <button
                onClick={() => setUpdateData(null)}
                className={`w-[35%] transition-all duration-300 ease-in-out rounded-lg py-1 bg-red-700 outline-none cursor-pointer`}
              >
                cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainPage;
