import { Login } from "../components/auth/Login";

export const LoginPage = () => {
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
      <Login />
    </div>
  );
};
