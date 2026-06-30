import { useMagicColor } from "../hooks/useMagicColor";

export default function Circle() {
  const color = useMagicColor();

  return (
    <div className="d-flex justify-content-center mt-4">
      <div
        style={{
          backgroundColor: color,
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.3s ease",
        }}
      >
        <h1 className="text-white fw-bold m-0">Circle</h1>
      </div>
    </div>
  );
}