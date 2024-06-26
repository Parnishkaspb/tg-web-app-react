import { useEffect } from 'react';
import './App.css';

function App() {
  const { tg, onToggleButton } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, [])



  return (
    <div className="App">
      start
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  );
}

export default App;
