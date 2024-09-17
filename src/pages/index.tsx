import Link from 'next/link'
import {type MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from 'next-mdx-remote/serialize'
import {useEffect, useState} from 'react'

import IssueList from '@/pages/components/IssueList'

interface Issue {
  id: number
  title: string
  body: MDXRemoteSerializeResult
}

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  const markdownToMdx = async (
    markdown: MDXRemoteSerializeResult,
  ): Promise<MDXRemoteSerializeResult> => {
    return serialize(markdown)
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
            body: await markdownToMdx(issue.body),
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
        <div key={issue.id}>
          <h2>{issue.title}</h2>
          <IssueList data={issue} />
        </div>
      ))}
    </div>
  )
}
