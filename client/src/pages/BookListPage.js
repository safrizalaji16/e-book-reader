import { useEffect, useState } from "react";
import { Container, Row, Button, Modal, Form } from "react-bootstrap";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import { addBook, fetchBooks } from "../store/actions/actionBooks";
import { useDispatch, useSelector } from "react-redux";

export default function BookListPage() {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const handleAddBookClick = () => setShowAddBookModal(true);
  const handleAddBookClose = () => setShowAddBookModal(false);
  const books = useSelector((state) => state.booksReducer.books);

  useEffect(() => {
    dispatch(fetchBooks()).then((_) => {
      setLoading(false);
    });
  }, [dispatch]);

  const [formBook, setFormBook] = useState({
    title: "",
    cover: "",
    author: "",
    files: null,
  });

  function handleOnChange(e) {
    if (e.target.type === "file") {
      setFormBook({
        ...formBook,
        files: e.target.files[0],
      });
    } else {
      setFormBook({
        ...formBook,
        [e.target.name]: e.target.value,
      });
    }
  }

  async function handleBook(e) {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", formBook.title);
      form.append("author", formBook.author);
      form.append("cover", formBook.cover);
      form.append("files", formBook.files);
      await dispatch(addBook(form));
      setFormBook({
        title: "",
        author: "",
        cover: "",
        files: null,
      });
      handleAddBookClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Your Book List</h1>
      <div className="d-flex justify-content-end mb-4">
        <Button variant="success" onClick={handleAddBookClick}>
          Add Book
        </Button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Row xs={2} md={3} lg={4} className="g-4">
          {books?.map((book, i) => {
            return <BookCard key={i} book={book} />;
          })}
        </Row>
      )}
      <Modal show={showAddBookModal} onHide={handleAddBookClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleBook} enctype="multipart/form-data">
          <Modal.Body>
            <Form.Group controlId="formBookTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                onChange={handleOnChange}
                type="text"
                placeholder="Enter book title"
              />
            </Form.Group>
            <Form.Group controlId="formBookAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                name="author"
                onChange={handleOnChange}
                type="text"
                placeholder="Enter book author"
              />
            </Form.Group>
            <Form.Group controlId="formBookCover">
              <Form.Label>Cover</Form.Label>
              <Form.Control
                name="cover"
                onChange={handleOnChange}
                type="url"
                placeholder="Enter book cover link"
              />
            </Form.Group>
            <Form.Group controlId="formBookEBook">
              <Form.Label>E-Book</Form.Label>
              <Form.Control
                name="file"
                onChange={handleOnChange}
                type="file"
                accept="application/pdf"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddBookClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleAddBookClose}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
