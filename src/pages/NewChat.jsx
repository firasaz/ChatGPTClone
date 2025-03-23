import React from 'react'
import { Send } from 'lucide-react'
import classNames from 'classnames'
import 'github-markdown-css' // Import GitHub Markdown styles

const NewChat = ({ inputChange, onSubmit }) => {
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
          onClick={onSubmit}
        >
          <Send />
        </button>
      </div>
    </div>
  )
}

export default NewChat
