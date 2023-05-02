import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  // Form,
  // FormControl,
  // Button,
  Image,
  Dropdown,
} from "react-bootstrap";
import logo from "../assets/undraw_education_f8ru.png";
import Swal from "sweetalert2";

export default function NavbarTop() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
    Swal.fire({
      icon: "success",
      title: "Congrats...",
      text: `See u, ${name}!`,
    });
  }

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Image src={logo} alt="logo" width="50" height="50" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="d-flex justify-content-center align-items-center"
        ></Navbar.Collapse>
        <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
          <Nav.Link as={Link} to={"/"}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={"/book-lists"}>
            Book Lists
          </Nav.Link>
          <Dropdown className="ms-3">
            <Dropdown.Toggle
              variant="outline-primary"
              style={{ border: "0" }}
              id="dropdown-basic"
            >
              Hi, <strong>{name}</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
