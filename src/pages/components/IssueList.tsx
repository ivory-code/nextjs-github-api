type IssueData = {
  id: number
  title: string
  body: string
}

interface Props {
  data: IssueData
}

export default function IssueList({data}: Props) {
  return (
    <div>
      <h1>Github Issues</h1>
      <ul>
        <li key={data.id}>
          <h3>{data.title}</h3>
          <div dangerouslySetInnerHTML={{__html: data.body}} />
        </li>
      </ul>
    </div>
  )
}
