import Header from '@/pages/components/Header'
import {LessonOverview} from '@/pages/components/LessonOverview'
import {NavBar} from '@/pages/components/Navbar'

const navItems = [
  {label: 'Lesson 1.1', link: '/lesson1-1', color: 'bg-pastelBlue'},
  {label: 'Lesson 1.2', link: '/lesson1-2', color: 'bg-pastelPink'},
  {label: 'Lesson 1.3', link: '/lesson1-3', color: 'bg-pastelPurple'},
  {label: 'Materials', link: '/materials', color: 'bg-pastelYellow'},
  {label: 'Videos', link: '/videos', color: 'bg-pastelOrange'},
  {label: 'Activities', link: '/activities', color: 'bg-pastelRed'},
]

export default function Main() {
  return (
    <div className="container mx-auto p-6">
      <Header />
      <div className="stroke-box bg-pastelPink p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Lesson Overview</h1>
        <LessonOverview />
      </div>
      <NavBar items={navItems} />
    </div>
  )
}
