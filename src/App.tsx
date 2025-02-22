import Calculator from './components/Calculator'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Calculator</h1>
        <Calculator />
      </div>
    </ThemeProvider>
  )
}

export default App
