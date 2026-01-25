import { useState } from 'react'
import './App.css';

const config = [
  [1,1,1],
  [1,0,1],
  [1,1,1]
]

function App() {
  const [order, setOrder] = useState([]);
  const [isDeativating, setIsDeactivating] = useState(false);

  const deactivateCell = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
    setOrder((prev) => {
      const list = [...prev];
      list.pop();
      if (list.length === 0) {
        clearInterval(timer);
        setIsDeactivating(false);
      }
      return list;
    });
    }, 300);
  }


  const handleClick = (index) => {
    const list = [...order, index];
    setOrder(list);
    if (list.length === config.flat(1).filter(Boolean).length) {
      deactivateCell();
    }
  }


  return (
    <div className='app'>
      {config.flat(1).map((item, index) => {
        return item ? (
          <button key={index} onClick={() => handleClick(index)} className={order.includes(index) ? "cell cell-active" : "cell"} disabled={order.includes(index) || isDeativating}/>
        ) : <span key={index} />
      })}
    </div>
  )
}

export default App
