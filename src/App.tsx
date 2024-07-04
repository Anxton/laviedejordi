import React, { Suspense, lazy, useState } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import Loading from "./components/loading/Loading.tsx";
import { UserContext } from "./context/UserContext.tsx";

const Root = lazy(() => import("./components/root/Root.tsx"));

export const App = () => {
  const [name, setName] = useState("");
  const nameState = { name, setName };

  return (
    <Suspense fallback={<Loading />}>
      <UserContext.Provider value={nameState}>
        <Root />
      </UserContext.Provider>
    </Suspense>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
