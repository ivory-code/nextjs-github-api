import Link from 'next/link'

interface NavItem {
  label: string
  link: string
  color: string
}

interface NavBarProps {
  items: NavItem[]
}

export const NavBar: React.FC<NavBarProps> = ({items}) => {
  return (
    <nav className="flex justify-center bg-retroCream p-4 rounded-full shadow-lg">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`mx-2 px-4 py-2 rounded-t-lg ${item.color} border-2 border-black shadow-md
              transform transition-transform duration-300 ease-in-out hover:-translate-y-2
              hover:shadow-xl focus:translate-y-0 focus:shadow-md no-underline text-black`}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
