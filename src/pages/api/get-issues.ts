import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    if (!GITHUB_TOKEN) {
      // eslint-disable-next-line no-console
      console.error('GitHub token is missing')
      return res.status(500).json({error: 'GitHub token is missing'})
    }

    const repoOwner = process.env.GITHUB_USER_NAME // 리포지토리 소유자
    const repoName = process.env.GITHUB_REPO_NAME // 리포지토리 이름

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
        {
          method: 'GET',
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        // eslint-disable-next-line no-console
        console.error('GitHub API Response:', response.status, errorText)
        throw new Error(`GitHub API returned an error: ${response.statusText}`)
      }

      const issues = await response.json()
      res.status(200).json(issues)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error fetching issues:', error)
      res.status(500).json({error: error.message})
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
