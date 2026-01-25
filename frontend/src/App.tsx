import { useState, useEffect } from 'react'
import './App.css'

interface ApiResponse {
  message: string
}

function App() {
  const [apiLogin, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch both hello message and chart data
    Promise.all([
      fetch('/api/login').then(response => response.json()),
    ])
      .then(([loginData]) => {
        setApiData(loginData)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])
   return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Facturas</h1>
        <div className="content">
        { loading ? (<p>Cargando datos de la API...</p>) : 
          {  apiLogin ? ( <p>{apiData.title} </p>):( <p>Error al cargar los datos de la API.</p>)} 
        }
        </div>
      </header>
    </div>
  )
}

export default App 