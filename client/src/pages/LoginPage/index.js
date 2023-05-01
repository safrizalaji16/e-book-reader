import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/actions/actionUsers";
import { useState } from "react";
import "./index.css";
import LoginImg from "../../assets/undraw_Login_re_4vu2.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login(formLogin)).then((res) => {
      if (res.msg === "Success") {
        navigate("/");
      }
    });
  }

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  function handleOnChangeLogin(e) {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  }

  return (
    <Container className="login-container">
      <div className="login-header">
        <Image src={LoginImg} alt="Login" fluid rounded />
      </div>

      <Form className="login-form" onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Log in to your account</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleOnChangeLogin}
            className="login-input"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleOnChangeLogin}
            className="login-input"
          />
        </Form.Group>
        <Button className="login-button" variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </Container>
  );
}
