import {useRouter} from 'next/router'
import {type FormEvent, useState} from 'react'

import PostPreview from '@/pages/components/PostPreview'

interface ApiResponse {
  message: string
  issue?: {
    html_url: string
  }
  error?: string
}

export default function PostPage() {
  const router = useRouter()

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [responseMessage, setResponseMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/create-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, body}),
      })

      const data: ApiResponse = await response.json()

      if (response.ok && data.issue) {
        setResponseMessage(
          `Issue created successfully! Issue URL: ${data.issue.html_url}`,
        )
      } else {
        setResponseMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponseMessage(`Error: ${error}`)
    } finally {
      router.push('/')
    }
  }

  return (
    <div>
      <h1>Create a GitHub Issue</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Issue Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Issue Body (Markdown):</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={10}
            required
          />
        </div>
        <PostPreview markdownBody={body} />
        <button type="submit">Create Issue</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  )
}
