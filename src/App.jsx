import Timer from "./components/Timer"

function App() {

  return (
    <main className='h-96 w-72 p-4 bg-blue-200'>
      <h1 className="text-center text-xl font-bold text-slate-900">FocusMate</h1>
      <div className="bg-blue-100 p-2 rounded-md">
        <p className="text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium explicabo illum, distinctio voluptate quasi nobis incidunt velit iure esse sit?</p>
        <p className="text-right">- s2sharpit</p>
      </div>
      <Timer />
    </main>
  )
}

export default App
