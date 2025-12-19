import './App.css'
import useToast from './hooks/useToast';

function App() {

  const { ToastComponent, triggerToast } = useToast('top-right');
  
  return (
    <div className='app'>
      {ToastComponent}
      <h1>Toast Component</h1>
      <div className='button-container'>
        <button onClick={() => triggerToast({
          type: 'success',
          message: 'File Sent Successfully',
          duration: 3000,
          animation: "slide"
        })}>
          Trigger Success
        </button>
        <button onClick={() => triggerToast({
          type: 'info',
          message: 'File Sent info',
          duration: 3000,
          animation: "fade"
        })}>
          Trigger Info
        </button>
        <button onClick={() => triggerToast({
          type: 'warning',
          message: 'File sent warning',
          duration: 3000,
          animation: "pop"
        })}>
          Trigger Warning
        </button>
        <button onClick={() => triggerToast({
          type: 'error',
          message: 'File Sent error',
          duration: 3000
        })}>
          Trigger Error
        </button>
      </div>
    </div>
  )
}

export default App
