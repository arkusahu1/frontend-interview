import './App.css'
import NestedComments from './components/NestedComments.jsx';
import commentsData from "./data/comments.json";

function App() {

  return (
    <div className='main-container'>
      <h1>Nested Comments</h1>
      <NestedComments
        comments={commentsData}
      />
    </div>
  )
}

export default App
