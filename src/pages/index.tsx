import {useEffect, useState, type FormEvent} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

import IssueList from './components/IssueList'

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

  const markdownToHtml = async (markdown: string) => {
    const processedContent = await remark().use(html).process(markdown)

    return processedContent.toString()
  }

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

        const processedIssues = await Promise.all(
          data.map(async (issue: Issue) => ({
            ...issue,
            body: await markdownToHtml(issue.body),
          })),
        )

        setIssues(processedIssues)
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
        {issues.map(issue => (
          <IssueList key={issue.id} data={issue} />
        ))}
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  )
}
