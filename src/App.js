import './App.css';
import FindPair from './exercises/1';
import {Find0SumSubarray} from './exercises/2';
import { BubbleSort } from './exercises/bubbleSort';

const Title = () => (
  <h1>500 exercises</h1>
)

function App() {

  return (
    <div className="App">
      <Title />
      <Find0SumSubarray />
      <FindPair />
      <BubbleSort />
    </div>
  );
}

export default App;
