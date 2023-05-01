import { Button, Card, Col, Dropdown, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteBook,
  downloadBook,
  editBook,
  fetchOneBook,
} from "../store/actions/actionBooks";
import { useEffect, useState } from "react";
// import ViewSDKClient from "../configs/ViewSDKClient";

export default function BookCard({ book }) {
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const dispatch = useDispatch();
  const handleEditBookClick = () => setShowEditBookModal(true);
  const handleEditBookClose = () => setShowEditBookModal(false);

  function handleDeleteBook() {
    dispatch(deleteBook(book.id));
  }

  const [formBook, setFormBook] = useState({
    title: "",
    cover: "",
    author: "",
  });

  function handleOnChange(e) {
    setFormBook({
      ...formBook,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(fetchOneBook(book.id)).then((res) => {
      setFormBook({
        title: res.title,
        cover: res.cover,
        author: res.author,
      });
    });
  }, [dispatch, book.id]);

  function handleBook(e) {
    e.preventDefault();
    dispatch(editBook(formBook, book.id));
    setFormBook({
      title: "",
      cover: "",
      author: "",
    });
  }

  function handleDownload() {
    dispatch(downloadBook(book.id, book.filename));
  }

  // const viewSDKClient = new ViewSDKClient();
  // const isValidPDF = (file) => {
  //   if (file.type === "application/pdf") {
  //     return true;
  //   }
  //   if (file.type === "" && file.name) {
  //     const fileName = file.name;
  //     const lastDotIndex = fileName.lastIndexOf(".");
  //     if (
  //       lastDotIndex === -1 ||
  //       fileName.substr(lastDotIndex).toUpperCase() !== "PDF"
  //     )
  //       return false;
  //     return true;
  //   }
  //   return false;
  // };

  // const readFile = (event) => {
  //   event.persist();
  //   viewSDKClient.ready().then(() => {
  //     const files = book;
  //     console.log(files);
  //     if (files.length > 0 && isValidPDF(files[0])) {
  //       const fileName = files[0].name;
  //       const reader = new FileReader();
  //       reader.onloadend = (e) => {
  //         const filePromise = Promise.resolve(e.target.result);
  //         /* Helper function to render the file using PDF Embed API. */
  //         viewSDKClient.previewFileUsingFilePromise(
  //           "pdf-div",
  //           filePromise,
  //           fileName
  //         );
  //       };
  //       reader.readAsArrayBuffer(files[0]);
  //     }
  //   });
  // };

  return (
    <Col className="mb-4">
      <Card>
        {book.cover ? (
          <Card.Img
            variant="top"
            src={book.cover}
            alt="book cover"
            style={{ width: "298px", height: "400px" }}
          />
        ) : (
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/150x200.png?text=Book+Cover"
            alt="book cover"
            style={{ width: "298px", height: "400px" }}
          />
        )}
        <Card.Body>
          <Card.Title className="fw-bold">{book.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {book.author}
          </Card.Subtitle>
          <div className="d-flex justify-content-around align-items-center mt-3">
            <Button
              variant="primary"
              // onClick={readFile}
            >
              Read
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Action
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDownload}>Download</Dropdown.Item>
                <Dropdown.Item onClick={handleEditBookClick}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteBook}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showEditBookModal} onHide={handleEditBookClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book: {book.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleBook}>
          <Modal.Body>
            <Form.Group controlId="formBookTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={formBook.title}
                type="text"
                onChange={handleOnChange}
                name="title"
                placeholder="Enter book title"
              />
            </Form.Group>
            <Form.Group controlId="formBookAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                value={formBook.author}
                type="text"
                onChange={handleOnChange}
                name="author"
                placeholder="Enter book author"
              />
            </Form.Group>
            <Form.Group controlId="formBookCover">
              <Form.Label>Cover</Form.Label>
              <Form.Control
                value={formBook.cover}
                type="url"
                onChange={handleOnChange}
                name="cover"
                placeholder="Enter book cover link"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditBookClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleEditBookClose}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* <div
        id="pdf-div"
        className="full-window-div"
        style={{
          height: "100vh",
          overflow: "hidden",
        }}
      /> */}
    </Col>
  );
}
