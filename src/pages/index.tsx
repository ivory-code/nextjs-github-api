// pages/index.tsx
import {useEffect, useState, type FormEvent} from 'react'

interface ApiResponse {
  message: string
  issue?: {
    html_url: string
  }
  error?: string
}

interface Issue {
  id: number
  title: string
  body: string
}

export default function Home() {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [responseMessage, setResponseMessage] = useState<string>('')
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

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
    }
  }

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/get-issues')
        if (!response.ok) {
          throw new Error('Failed to fetch issues')
        }
        const data = await response.json()
        setIssues(data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()
  }, [])

  if (loading) {
    return <div>Loading...</div>
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
        <button type="submit">Create Issue</button>
        <div>
          <h1>GitHub Issues</h1>
          <ul>
            {issues.map(issue => (
              <li key={issue.id}>
                <h3>{issue.title}</h3>
                <p>{issue.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  )
}
