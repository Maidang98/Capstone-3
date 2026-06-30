import { useMagicColor } from "../hooks-main/useMagicColor";

export default function Square() {
  const color = useMagicColor();

  return (
    <div className="d-flex justify-content-center mt-3">
      <div
        style={{
          backgroundColor: color,
          width: "160px",
          height: "160px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.3s ease",
        }}
      >
        <h1 className="text-white fw-bold m-0">Square</h1>
      </div>
    </div>
  );
}