import {MDXRemote, type MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from 'next-mdx-remote/serialize'
import {useEffect, useState} from 'react'

interface Props {
  markdownBody: string
}

export default function PostPreview({markdownBody}: Props) {
  const [mdxContent, setMdxContent] = useState<MDXRemoteSerializeResult | null>(
    null,
  )

  useEffect(() => {
    const convertMarkdownToMDX = async () => {
      const mdxSource = await serialize(markdownBody)
      setMdxContent(mdxSource)
    }

    convertMarkdownToMDX()
  }, [markdownBody])

  return (
    <div>
      <h3>Preview:</h3>
      {mdxContent ? <MDXRemote {...mdxContent} /> : <p>Loading...</p>}
    </div>
  )
}
