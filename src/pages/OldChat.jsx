import React, { useContext, useEffect, useState } from 'react'
import { Loader, Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css' // Import GitHub Markdown styles
import { ChatContext } from '@/context/ChatContext'
import { useParams } from 'react-router-dom'
import { callApi } from '@/lib/utils'

const OldChat = ({ inputChange, onSubmit }) => {
  const { prompt, response, loading } = useContext(ChatContext)
  const { chatId } = useParams()
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const res = await callApi('http://localhost:8000/api/messages/messages-list/')
        const data = await res.json()
        setFilteredData(data.filter(msg => msg.id == chatId))
        console.log(data[0]?.message)
        console.log(data.filter(msg => msg.id == chatId))
      } catch(err) {
        console.groupCollapsed('messages errors')
        console.error(err)
        console.groupEnd()
      }
    }
    fetchChatMessages()
  }, [chatId])
  return (
    <>
      {/* Body */}
      <div className="sm:mx-20 lg:mx-32 xl:mx-56 flex flex-col h-full overflow-auto px-4 justify-between mt-8">
        <div className="h-full">
          {/* User Prompt */}
          <div className="my-2 flex flex-col items-end">
            <div className="px-4 py-2 rounded-2xl bg-neutral-700 w-100">
              {filteredData?.[0]?.is_mesage_artificial === false && filteredData?.[0]?.message}
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
