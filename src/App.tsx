import React, { Suspense, lazy, useState } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import Loading from "./components/loading/Loading.tsx";
import { UserContext } from "./context/UserContext.tsx";

const Root = lazy(() => import("./components/root/Root.tsx"));

export const App = () => {
  const [username, setUsername] = useState("");
  const userState = {
    username,
    setUsername,
  };

  return (
    <Suspense fallback={<Loading />}>
      <UserContext.Provider value={userState}>
        <Root />
      </UserContext.Provider>
    </Suspense>
  );
};

const isDev = import.meta.env.DEV;
const root = createRoot(document.getElementById("root")!);

root.render(
  isDev ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
