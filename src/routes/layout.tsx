import { useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { JSXElement, Suspense } from "solid-js";
import Nav from "~/components/Nav";
import AdminNav from "~/components/AdminNav";
import Footer from "~/components/Footer";

interface LayoutProps {
  children: JSXElement;
}

export default function Layout(props: LayoutProps) {
  const location = useLocation();
  const isAdminRoute = () =>
    location.pathname.includes("/edit") ||
    location.pathname.includes("/dashboard");

  return (
    <div class="cursor-default">
      {isAdminRoute() ? <AdminNav /> : <Nav />}
        <Suspense>{props.children}</Suspense>
      {!isAdminRoute() && <Footer />}
    </div>
  );
}
