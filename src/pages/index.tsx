import Link from 'next/link'
import {useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

import IssueList from './components/IssueList'

interface Issue {
  id: number
  title: string
  body: string
}

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  const markdownToHtml = async (markdown: string) => {
    const processedContent = await remark().use(html).process(markdown)

    return processedContent.toString()
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
      <Link href="/PostPage">Create Post</Link>
      {issues.map(issue => (
        <IssueList key={issue.id} data={issue} />
      ))}
    </div>
  )
}
