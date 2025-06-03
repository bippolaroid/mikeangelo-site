import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import Footer from "./components/Footer";
import AdminNav from "./components/AdminNav";
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
