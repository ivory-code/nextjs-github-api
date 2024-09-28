import {Card} from '@/pages/components/Card'

export const LessonOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Objectives">
        <p>Far far away, behind the word mountains...</p>
      </Card>
      <Card title="Materials">
        <ul>
          <li>Material 01</li>
          <li>Material 02</li>
          <li>Material 03</li>
          <li>Material 04</li>
        </ul>
      </Card>
      <Card title="Resources">
        <ul>
          <li>Resource 01</li>
          <li>Resource 02</li>
          <li>Resource 03</li>
          <li>Resource 04</li>
          <li>Resource 05</li>
        </ul>
      </Card>
      <Card title="Other">
        <p>Aenean commodo ligula eget dolor. Aenean massa.</p>
      </Card>
    </div>
  )
}
