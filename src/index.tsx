import ReactDOM from "react-dom/client";
import "./styles/styles.css";
import { JournalApp } from "./components/JournalApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<JournalApp />);
