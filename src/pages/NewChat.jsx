import React, { useEffect, useState } from 'react'
import { Loader, Send, Share } from 'lucide-react'
import classNames from 'classnames'
import { Button } from '@/components/ui/button'
import ModelsDropdown from '@/components/ModelsDropdown'
import { callApi } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css' // Import GitHub Markdown styles

const NewChat = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [models, setModels] = useState([])
  const [model, setModel] = useState({})

  const controller = new AbortController()
  const sendPromptToOllama = async () => {
    console.log('request submitted...')
    if (loading) {
      console.log('aborting...')
      controller.abort()
      return
    }
    setResponse('')
    setLoading(true)

    try {
      const res = await callApi(
        'http://localhost:11434/api/generate',
        'POST',
        JSON.stringify({
          model: model.name,
          stream: true,
          prompt,
        }),
        { signal: controller.signal }
      )
      if (res.status === 404) throw new Error('No AI model found!')

      if (!res.body) throw new Error('No response body!')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let partialResponse = ''

      console.groupCollapsed('chunks')
      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const data = JSON.parse(chunk)?.response
        partialResponse += data
        console.log(JSON.parse(chunk))
        // partialResponse = partialResponse.replace('<think>', '')
        // partialResponse = partialResponse.replace('</think>', '\n')
        setResponse(partialResponse) // to render the final and complete response instead of gradually writing the response
        // setResponse((prev) => prev + partialResponse) // shows the process gradually the response gets rendered by the model, results in a very long and repeated responses
      }
    } catch (err) {
      console.error('Streaming error:', err)
      // append error message if error occured mid response
      // instead of overwriting the inital response
      setResponse(prev => (prev += err))
    } finally {
      setLoading(false)
      console.groupEnd()
    }
  }

  useEffect(() => {
    const downloadedModels = async () => {
      const res = await callApi('http://localhost:11434/api/tags')
      const data = await res.json()
      setModel(data.models.find(model => model.model === 'deepseek-r1:1.5b') ?? data.models[0])
      setModels(data.models)
    }
    downloadedModels()
  }, [])
  return (
    <div className="bg-neutral-800 flex-1 p-2 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-1">
        <ModelsDropdown models={models} selectedModel={model} setModel={setModel} />
        <div className="flex gap-2">
          <Button className="rounded-full" variant="secondary">
            <Share />
            Share
          </Button>
          <Button className="rounded-full">F</Button>
        </div>
      </div>

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
              onChange={e => setPrompt(e.target.value)}
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
            onChange={e => setPrompt(e.target.value)}
          />
          <button
            className="absolute bottom-2 right-2 p-2 rounded-full bg-white text-black hover:bg-neutral-300"
            onClick={sendPromptToOllama}
          >
            {loading ? <Loader className='animate-spin' /> : <Send />}
          </button>
        </div>
      )}
    </div>
  )
}

export default NewChat
