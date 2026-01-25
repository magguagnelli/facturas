import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import './App.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ApiResponse {
  message: string
}

function App() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch both hello message and chart data
    Promise.all([
      fetch('/api/hello').then(response => response.json()),
      //fetch('/api/data').then(response => response.json())
    ])
      .then(([helloData, dataResponse]) => {
        setApiData(helloData)
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
        <div className="content"></div>
      </header>
    </div>
  )
}

export default App 