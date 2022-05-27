import './App.css';
import FindPair from './exercises/1';
import { BubbleSort } from './exercises/bubbleSort';

const Title = () => (
  <h1>500 exercises</h1>
)

function App() {

  return (
    <div className="App">
      <Title />
      <BubbleSort />
      <FindPair />
    </div>
  );
}

export default App;
