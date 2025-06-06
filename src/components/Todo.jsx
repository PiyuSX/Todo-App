import { useState, useEffect } from 'react'

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setTodos([...todos, input.trim()])
    setInput('')
  }

  const deleteTodo = (i) => {
    setTodos(todos.filter((_, idx) => idx !== i))
  }

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-[#f5f9eb]">
        <div className="bg-[#fcfff3] p-10 rounded-xl shadow-md w-full max-w-lg">
          <form onSubmit={addTodo} className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write something..."
              className="flex-1 px-4 py-2 rounded-md bg-[#f5f9eb] outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[#454545] text-white rounded-full hover:bg-[#333]"
            >
              Add
            </button>
          </form>

          <ul className="mt-6 space-y-3">
            {todos.map((todo, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-4 py-2 bg-[#f5f9eb] rounded-md"
              >
                <span>{todo}</span>
                <button
                  onClick={() => deleteTodo(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <div className="fixed bottom-3 right-4 text-sm text-gray-500">
        A app by <strong>Piyush</strong>
      </div>
    </>
  )
}

export default Todo
