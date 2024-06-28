import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const Root = lazy(() => import("./components/root/Root.tsx"));

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Root />
    </Suspense>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
