import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";

export default function BaseLayout() {
  return (
    <Container>
      <NavbarTop />
      <Outlet />
    </Container>
  );
}
