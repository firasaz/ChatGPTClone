import React from 'react'
import { Send } from 'lucide-react'
import 'github-markdown-css' // Import GitHub Markdown styles
import { callApi } from '@/lib/utils'

const NewChat = ({ inputChange, onSubmit, input }) => {
  const createNewChat = async () => {
    console.log(input)
    const body = {
      "user": "1",
      "title": input.slice(0, 10)
    }
    const res = await callApi('http://localhost:8000/api/chat/new-chat/', 'POST', body)
    const data = await res.json()
    console.log(data)
    onSubmit
  }
  return (
    <div className="sm:mx-20 lg:mx-32 xl:mx-56 flex flex-col h-full overflow-auto px-4 justify-center">
      <div className="text-center h-32 relative w-full">
        <h3 className="text-2xl font-medium mb-3">What can I help you with?</h3>
        <textarea
          type="text"
          placeholder="Ask anything"
          className="rounded-xl bg-neutral-700 w-full h-full p-3 focus:outline-0 resize-none"
          onChange={e => inputChange(e.target.value)}
        />
        <button
          className="absolute bottom-2 right-2 p-2 rounded-full bg-white text-black hover:bg-neutral-300"
          onClick={createNewChat}
        >
          <Send />
        </button>
      </div>
    </div>
  )
}

export default NewChat
