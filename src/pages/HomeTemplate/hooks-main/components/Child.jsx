import { memo } from "react";

function Child({ onReceive }) {
  console.log("Child rendered");

  return (
    <div>
      <h1>Child Component</h1>
    </div>
  );
}

export default memo(Child);