import {MDXRemote} from 'next-mdx-remote'
import {type MDXRemoteSerializeResult} from 'next-mdx-remote'

type IssueData = {
  id: number
  title: string
  body: MDXRemoteSerializeResult
}

interface Props {
  data: IssueData
}

export default function IssueList({data}: Props) {
  return (
    <div>
      <h2>{data.title}</h2>
      {/* Use MDXRemote to render the MDX content */}
      <MDXRemote {...data.body} />
    </div>
  )
}
