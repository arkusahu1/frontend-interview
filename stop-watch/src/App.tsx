import './App.css'
import useStopWatch from './hooks/useStopWatch'

function App() {

	const { seconds, isRunning, start, stop, reset } = useStopWatch();

  return (
    <div>
			<div>
				<h1>Stop Watch</h1>
				<div>{seconds}</div>
				<div>{isRunning ? "Stop watch is running..." : "Stop watch is stoped" }</div>
				<button onClick={start}>Start</button>
				<button onClick={stop}>Stop</button>
				<button onClick={reset}>Reset</button>
			</div>
    </div>
      
  )
}

export default App
