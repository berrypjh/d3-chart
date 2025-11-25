import { useState } from 'react';
import { Chart } from '@my-chart/react';

export function App() {
  const [data, setData] = useState([10, 50, 30, 70, 20]);

  return (
    <div>
      <h1>My Chart Lib Demo</h1>

      {/* 선언적으로 차트 사용 가능 */}
      <Chart width={600} height={400} data={data} color="tomato" />

      <button onClick={() => setData(data.map((n) => Math.random() * 100))}>
        Randomize Data
      </button>
    </div>
  );
}

export default App;
