import './App.css';
import { useState } from 'react'

const App = () => {
  const colors =  ["red", "green", "blue", "yellow", "purple"];
  const [index, setIndex] = useState(0);

  const changeBackground = () => {
    setIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };  

  return (
    <div className="content" 
    style={{ backgroundColor: colors[index] }}>
        <button onClick= {changeBackground}>Change Background</button>
    </div>
  );
};

export default App;
