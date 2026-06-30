import { memo } from "react";

function Fruit({ fruit, onDelete }) {
  const { id, name } = fruit;

  console.log("Fruit rendered:", id);

  return (
    <div className="border p-2 mb-2 d-flex justify-content-between align-items-center">
      <span>
        {id} - {name}
      </span>

      <button
        onClick={() => onDelete(id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    </div>
  );
}

export default memo(Fruit);