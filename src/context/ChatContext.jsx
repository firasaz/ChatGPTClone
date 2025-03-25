import { createContext, useEffect, useState } from 'react'
import { callApi } from '@/lib/utils'

// Create the Context
export const ChatContext = createContext()

// Build the Provider (Wrapper) Component
export const ChatProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [models, setModels] = useState([])
  const [model, setModel] = useState({})

  const [oldChatLayout, setOldChatLayout] = useState(false)

  const controller = new AbortController()
  const sendPromptToOllama = async prompt => {
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
          // messages: [{ role: 'user', content: prompt }],
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
  const handleSetModel = newModel => {
    setModel(newModel)
  }
  const handleSetPrompt = userPrompt => {
    setPrompt(userPrompt)
  }

  useEffect(() => {
    const downloadedModels = async () => {
      const res = await callApi('http://localhost:11434/api/tags')
      const data = await res.json()
      setModel(
        data.models.find(model => model.model === 'deepseek-r1:1.5b') ??
          data.models[0]
      )
      setModels(data.models)
    }
    downloadedModels()
  }, [])

  const states = {
    prompt,
    handleSetPrompt,
    response,
    loading,
    models,
    model,
    handleSetModel,
    oldChatLayout,
    setOldChatLayout,

    sendPromptToOllama,
  }
  return <ChatContext.Provider value={states}>{children}</ChatContext.Provider>
}
