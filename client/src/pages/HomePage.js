import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LibraryImg from "../assets/undraw_Bibliophile_re_xarc.png";

export default function HomePage() {
  const name = localStorage.getItem("name");

  return (
    <Container className="my-5">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <h1 className="display-4 mb-4">Welcome, {name}!</h1>
          <p className="lead mb-5">
            The library awaits you, full of treasures to be discovered. Take
            your time and enjoy your reading to the fullest!
          </p>
          <Button variant="primary" as={Link} to="/book-lists">
            View Book List
          </Button>
        </Col>
        <Col md={6} className="text-center">
          <Image
            src={LibraryImg}
            alt="Library"
            fluid
            rounded
            style={{ maxWidth: "70%" }}
          />
        </Col>
      </Row>
    </Container>
  );
}
