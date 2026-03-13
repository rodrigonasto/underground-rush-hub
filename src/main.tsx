import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { warmupAnalyticsScripts } from "./lib/analytics";
import "./index.css";

warmupAnalyticsScripts();

createRoot(document.getElementById("root")!).render(<App />);
