import {type NextApiRequest, type NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {title, body} = req.body

    if (!title || !body) {
      return res.status(400).json({error: 'Title and body are required'})
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN // 환경 변수로 GitHub 토큰 저장
    const repoOwner = process.env.GITHUB_USER_NAME // GitHub 리포지토리 소유자
    const repoName = process.env.GITHUB_REPO_NAME // GitHub 리포지토리 이름

    const issueData = {
      title, // 이슈 제목
      body, // 이슈 내용
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
        {
          method: 'POST',
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(issueData),
        },
      )

      if (!response.ok) {
        throw new Error(`GitHub API returned an error: ${response.statusText}`)
      }

      const issue = await response.json()
      res.status(200).json({message: 'Issue created successfully', issue})
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({error: error.message})
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
