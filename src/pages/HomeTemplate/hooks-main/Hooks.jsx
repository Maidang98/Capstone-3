import { useState, useEffect, useCallback, useMemo } from "react";
import Child from "./Child";
import Fruit from "./Fruit";
import Square from "./Square";
import Circle from "./Circle";

export default function Hooks() {
  console.log("Hooks page rendered");

  const [count, setCount] = useState(1);

  const [fruits, setFruits] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
  ]);

  // stable delete function (prevents re-render)
  const handleDelete = useCallback((id) => {
    setFruits((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // expensive computation (demo useMemo)
  const computedValue = useMemo(() => {
    let i = 0;
    while (i < 1000) i++;
    return i;
  }, []);

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  const handleReceiveData = useCallback(() => {
    console.log("Receive data from child");
  }, []);

  return (
    <div>
      <h1>React Hooks Demo</h1>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <hr />

      <p>Computed Value: {computedValue}</p>

      <Child onReceive={handleReceiveData} />

      {fruits.map((fruit) => (
        <Fruit
          key={fruit.id}
          fruit={fruit}
          onDelete={handleDelete}
        />
      ))}

      <Square />
      <Circle />
    </div>
  );
}