import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.css";
import Layout from "./routes/layout";

export default function App() {
  return (
    <Router
      root={(props) => {
        return <Layout children={props.children} />;
      }}
    >
      <FileRoutes />
    </Router>
  );
}
