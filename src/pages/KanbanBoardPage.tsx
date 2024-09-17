import React, {type DragEvent, useEffect, useState} from 'react'

import {Modal} from '@/pages/components/Modal'

// 아이템의 타입 정의
interface Item {
  id: string
  text: string
  category: 'todo' | 'in-progress' | 'done'
}

const getCategoryLabel = (category: Item['category']): string => {
  switch (category) {
    case 'todo':
      return 'To Do'
    case 'in-progress':
      return 'In Progress'
    case 'done':
      return 'Done'
    default:
      return ''
  }
}

export default function KanbanBoardPage() {
  const [items, setItems] = useState<Item[]>([
    {id: '1', text: 'Item 1', category: 'todo'},
    {id: '2', text: 'Item 2', category: 'todo'}, // 초기 상태를 todo로 설정
    {id: '3', text: 'Item 3', category: 'todo'},
  ])

  // 모달에 표시할 아이템의 ID를 저장
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const handleModal = (id: string | null) => {
    setSelectedItemId(id) // 클릭한 아이템의 ID를 저장하거나, null로 설정해 모달 닫기
  }

  // 드래그 시작 이벤트 처리
  const onDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id)
  }

  // 드롭 이벤트 처리
  const onDrop = (e: DragEvent<HTMLDivElement>, category: Item['category']) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    const updatedItems = items.map(item =>
      item.id === id ? {...item, category} : item,
    )
    setItems(updatedItems)
    localStorage.setItem('kanban-items', JSON.stringify(updatedItems)) // 상태를 로컬 스토리지에 저장
  }

  // 드래그 오버 이벤트 처리
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // 페이지 로드 시 로컬 스토리지에서 상태 불러오기
  useEffect(() => {
    const savedItems = localStorage.getItem('kanban-items')
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  const selectedItem = items.find(item => item.id === selectedItemId)

  return (
    <div style={{display: 'flex', gap: '10px'}}>
      {['todo', 'in-progress', 'done'].map(category => (
        <div
          key={category}
          onDrop={e => onDrop(e, category as Item['category'])}
          onDragOver={onDragOver}
          style={{
            width: '200px',
            minHeight: '300px',
            border: '1px solid black',
            padding: '10px',
          }}>
          <h2>{category}</h2>
          {items
            .filter(item => item.category === category)
            .map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={e => onDragStart(e, item.id)}
                style={{
                  padding: '10px',
                  border: '1px solid gray',
                  marginBottom: '10px',
                  position: 'relative',
                }}
                onClick={() => handleModal(item.id)} // 클릭한 아이템의 ID 저장
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '10px',
                    fontSize: '12px',
                    color: 'white',
                    backgroundColor:
                      item.category === 'todo'
                        ? 'blue'
                        : item.category === 'in-progress'
                          ? 'orange'
                          : 'green',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>
                  {getCategoryLabel(item.category)}
                </span>
                {item.text}
              </div>
            ))}
        </div>
      ))}
      {selectedItem && (
        <Modal
          isVisible={!!selectedItemId}
          onClick={() => handleModal(null)}
          data={selectedItem}
        />
      )}
    </div>
  )
}
