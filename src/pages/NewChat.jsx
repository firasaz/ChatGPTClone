import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Atom, ChevronDown, Send, Share, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css'; // Import GitHub Markdown styles

const NewChat = () => {
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('{"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:27.5136788Z","response":"\u003cthink\u003e","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:27.7062983Z","response":"\n\n","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:27.9097731Z","response":"\u003c/think\u003e","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:28.1022303Z","response":"\n\n","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:28.2871073Z","response":"Hello","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:28.4769745Z","response":"!","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:28.6782721Z","response":" How","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:28.9003853Z","response":" can","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:29.1304975Z","response":" I","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:29.3672203Z","response":" assist","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:29.6318319Z","response":" you","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:29.8871531Z","response":" today","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:30.1588471Z","response":"?","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:30.7693918Z","response":" 😊","done":false} {"model":"deepseek-r1:8b","created_at":"2025-03-12T09:29:31.0257039Z","response":"","done":true,"done_reason":"stop","context":[128011,6151,128012,128013,271,128014,271,9906,0,2650,649,358,7945,499,3432,30,27623,232],"total_duration":3789401700,"load_duration":77812100,"prompt_eval_count":4,"prompt_eval_duration":197000000,"eval_count":16,"eval_duration":3513000000}')
    const [loading, setLoading] = useState(false)

    const sendPromptToOllama = async () => {
        setResponse('')
        setLoading(true)

        try {
            const res = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: 'deepseek-r1:8b',
                    stream: true,
                    prompt
                })
            })
            if(!res.body) throw new Error('No response body!')
            
            const reader = res.body.getReader()
            const decoder = new TextDecoder()

            let partialResponse = ''
            while(true) {
                const { value, done } = await reader.read()
                if (done) break;

                const chunk = decoder.decode(value, { stream: true })
                const data = JSON.parse(chunk)?.response
                partialResponse += data
                console.log(data)
                // partialResponse = partialResponse.replace('<think>', '')
                // partialResponse = partialResponse.replace('</think>', '')
                setResponse(prev => prev + partialResponse)
            }
        } catch (err) {
            console.error("Streaming error:", err)
            setResponse('Error fetching response.')
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="bg-neutral-800 flex-1 p-2 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {/* change the below to something other than button */}
            <div className="flex gap-1 items-center p-2 rounded-lg hover:bg-neutral-700 opacity-75 text-lg">
              ChatGPT
              <ChevronDown />
            </div>
            {/* <CustomShadcnTrigger Icon={ChevronDown} text='ChatGPT' className='w-auto' /> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-54 w-80 bg-neutral-700 border-neutral-500 text-white rounded-xl px-1 py-3">
            <DropdownMenuItem>
              <div className="bg-neutral-600 p-1 rounded-full">
                <Sparkles className="text-white" />
              </div>
              <div>
                <p>ChatGPT Plus</p>
                <p className="text-xs opacity-75">Great for everyday tasks</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="bg-neutral-600 p-1 rounded-full">
                <Atom className="text-white" />
              </div>
              <div>
                <p>ChatGPT</p>
                <p className="text-xs opacity-75">Great for everyday tasks</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2">
          <Button className="rounded-full" variant="secondary">
            <Share />
            Share
          </Button>
          <Button className="rounded-full">F</Button>
        </div>
      </div>

      {/* Body */}
      <div className="sm:mx-20 lg:mx-32 xl:mx-56 mt-8 flex flex-col h-full justify-between overflow-auto px-4">
        <div className="h-full">
          {/* User Prompt */}
          <div className="text-right my-2">
            <span className="px-4 py-2 rounded-full bg-neutral-700">
              how do i create a mask group in figma
            </span>
          </div>
          <div className='word-break mt-5'>
            <ReactMarkdown>
                {response}
            </ReactMarkdown>
          </div>
        </div>
      </div>

        {/* Footer */}
        <div className="sm:mx-20 lg:mx-32 xl:mx-68 mt-4 text-center h-32 relative">
            <textarea
                type="text"
                placeholder="Ask anything"
                className="rounded-xl bg-neutral-700 w-full h-full p-3 focus:outline-0 resize-none"
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
                className="absolute bottom-2 right-2 p-2 rounded-full bg-white text-black hover:bg-neutral-300" 
                onClick={sendPromptToOllama}
            >
                <Send />
            </button>
        </div>
    </div>
  );
};

export default NewChat;
