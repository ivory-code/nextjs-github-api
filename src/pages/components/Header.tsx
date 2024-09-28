const Header = () => {
  return (
    <div className="flex items-center justify-between bg-retroCream border-2 border-black rounded-t-lg p-4 shadow-retro">
      {/* 좌측 아이콘 */}
      <div className="flex space-x-2">
        <button className="w-4 h-4 bg-pink-400 rounded-full border-2 border-black" />
        <button className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-black" />
        <button className="w-4 h-4 bg-blue-400 rounded-full border-2 border-black" />
      </div>

      {/* 네비게이션 버튼 */}
      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 bg-white border-2 border-black rounded-lg shadow-md">
          {'<'}
        </button>
        <button className="w-8 h-8 bg-white border-2 border-black rounded-lg shadow-md">
          {'>'}
        </button>
        <button className="w-8 h-8 bg-white border-2 border-black rounded-lg shadow-md">
          <span className="material-icons">grid_on</span>
        </button>
      </div>

      {/* 타이틀 */}
      <h1 className="text-xl font-bold">Lesson Overview</h1>

      {/* 우측 Week 버튼 */}
      <button className="px-4 py-2 border-2 border-black rounded-lg shadow-md">
        Week 5
      </button>
    </div>
  )
}

export default Header
