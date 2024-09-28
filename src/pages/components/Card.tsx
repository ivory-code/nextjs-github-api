interface CardProps {
  title: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({title, children}) => {
  return (
    <div className="stroke-box bg-pastelYellow p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  )
}
