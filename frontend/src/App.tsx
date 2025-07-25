import React, { useEffect, useState, type JSX } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import TemplatePage from "./components/TemplatePage";
import Navigation from "./components/layout/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "./services/user.api";
import { setCredentials } from "./store/slices/authSlice";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import type { RootState } from "./store";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await verifyToken();
        setIsLoading(false);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsLoading(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return null;
  }

  return user ? children : null;
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyToken();
        dispatch(setCredentials({ user: response.user }));
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/register"
        ) {
          navigate("/");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        // if (
        //   window.location.pathname !== "/login" &&
        //   window.location.pathname !== "/register"
        // ) {
        //   navigate("/login");
        // }
      } finally {
        setIsAuthChecked(true);
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
              <HomePage />
          }
        />
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <ErrorBoundary>
                <EditorPage />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/template"
          element={
            <ProtectedRoute>
              <ErrorBoundary>
                <TemplatePage />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
