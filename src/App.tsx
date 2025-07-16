import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import EditorPage from "./components/EditorPage";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import K from "./components/K";
import TemplatePage from "./components/TemplatePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/editor"
            element={
              <ErrorBoundary>
                <EditorPage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/template"
            element={
              <ErrorBoundary>
                <TemplatePage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/k"
            element={
              <ErrorBoundary>
                <K />
              </ErrorBoundary>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
