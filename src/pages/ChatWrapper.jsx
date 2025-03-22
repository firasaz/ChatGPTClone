import React, { useContext, useEffect, useState } from 'react'
import { Loader, Send, Share } from 'lucide-react'
import classNames from 'classnames'
import { Button } from '@/components/ui/button'
import ModelsDropdown from '@/components/ModelsDropdown'
// import { callApi } from '@/lib/utils'
// import NewChat from './NewChat'
// import OldChat from './OldChat'
import { ChatContext, ChatProvider } from '@/context/ChatContext'
import ReactMarkdown from 'react-markdown'

const ChatWrapper = () => {
  const { prompt, loading, response, sendPromptToOllama } =
    useContext(ChatContext)
  return (
    <ChatProvider>
      <div className="bg-neutral-800 flex-1 p-2 text-white flex flex-col h-screen">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-1">
          <ModelsDropdown />
          <div className="flex gap-2">
            <Button className="rounded-full" variant="secondary">
              <Share />
              Share
            </Button>
            <Button className="rounded-full">F</Button>
          </div>
        </div>
        {/* {response === null ? <NewChat /> : <OldChat />} */}

        {/* Body */}
        <div
          className={classNames(
            'sm:mx-20 lg:mx-32 xl:mx-56 flex flex-col h-full overflow-auto px-4',
            !response ? 'justify-center' : 'justify-between',
            (prompt && response) || loading ? 'mt-8' : ''
          )}
        >
          {response !== null && (
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
          )}
          {response === null && (
            <div className="text-center h-32 relative w-full">
              <h3 className="text-2xl font-medium mb-3">
                What can I help you with?
              </h3>
              <textarea
                type="text"
                placeholder="Ask anything"
                className="rounded-xl bg-neutral-700 w-full h-full p-3 focus:outline-0 resize-none"
                onChange={e => handleSetPrompt(e.target.value)}
              />
              <button
                className="absolute bottom-2 right-2 p-2 rounded-full bg-white text-black hover:bg-neutral-300"
                onClick={sendPromptToOllama}
              >
                <Send />
              </button>
            </div>
          )}
        </div>
        {/* Footer */}
        {response !== null && (
          <div className="sm:mx-20 lg:mx-32 xl:mx-68 mt-4 text-center h-32 relative">
            <textarea
              type="text"
              placeholder="Ask anything"
              className="rounded-xl bg-neutral-700 w-full h-full p-3 focus:outline-0 resize-none"
              onChange={e => handleSetPrompt(e.target.value)}
            />
            <button
              className="absolute bottom-2 right-2 p-2 rounded-full bg-white text-black hover:bg-neutral-300"
              onClick={sendPromptToOllama}
            >
              {loading ? <Loader className="animate-spin" /> : <Send />}
            </button>
          </div>
        )}
      </div>
    </ChatProvider>
  )
}

export default ChatWrapper
