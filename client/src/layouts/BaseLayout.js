import { Outlet } from "react-router-dom";
import NavbarTop from "../components/NavbarTop";

export default function BaseLayout() {
  return (
    <div>
      <NavbarTop />
      <Outlet />
    </div>
  );
}
