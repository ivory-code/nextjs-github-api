// Modal 컴포넌트
interface Props {
  isVisible: boolean
  onClick: () => void
  data: Item
}

interface Item {
  id: string
  text: string
  category: 'todo' | 'in-progress' | 'done'
}

export function Modal({isVisible, onClick, data}: Props) {
  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경만 투명하게 설정
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}>
      <div
        style={{
          width: '50vw',
          height: '600px',
          backgroundColor: 'white',
          padding: '20px',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 배경 닫힘 방지
      >
        <h3>{data.id}</h3>
        <p>{data.category}</p>
        <p>{data.text}</p>
        <button
          onClick={onClick}
          style={{position: 'absolute', top: '10px', right: '10px'}}>
          X
        </button>
      </div>
    </div>
  )
}
