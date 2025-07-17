import { Register } from "../components/auth/Register";

export const RegisterPage = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        overflow: "auto",
      }}
    >
      <Register />
    </div>
  );
};
