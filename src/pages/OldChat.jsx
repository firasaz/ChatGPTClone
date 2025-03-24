import React, { useContext } from 'react'
import { Loader, Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css' // Import GitHub Markdown styles
import { ChatContext } from '@/context/ChatContext'

const OldChat = ({ inputChange, onSubmit }) => {
  const { prompt, response, loading } = useContext(ChatContext)

  return (
    <>
      {/* Body */}
      <div className="sm:mx-20 lg:mx-32 xl:mx-56 flex flex-col h-full overflow-auto px-4 justify-between mt-8">
        <div className="h-full">
          {/* User Prompt */}
          <div className="my-2 flex flex-col items-end">
            <div className="px-4 py-2 rounded-2xl bg-neutral-700 w-100">
              {prompt}
            </div>
          </div>
          <div className="word-break mt-5">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sm:mx-20 lg:mx-32 xl:mx-68 mt-4 text-center h-32 relative">
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
          {loading ? <Loader className="animate-spin" /> : <Send />}
        </button>
      </div>
    </>
  )
}

export default OldChat
