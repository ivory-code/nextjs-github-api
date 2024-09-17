import {useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

interface Props {
  markdownBody: string
}

export default function PostPreview({markdownBody}: Props) {
  const [htmlContent, setHtmlContent] = useState('')

  // 마크다운을 HTML로 변환하고 상태에 저장
  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      const processedContent = await remark().use(html).process(markdownBody)
      setHtmlContent(processedContent.toString())
    }

    convertMarkdownToHtml()
  }, [markdownBody]) // markdownBody가 변경될 때마다 변환

  return (
    <div>
      {' '}
      <h3>Preview:</h3>
      {/* 변환된 HTML을 렌더링 */}
      <div dangerouslySetInnerHTML={{__html: htmlContent}} />
    </div>
  )
}
