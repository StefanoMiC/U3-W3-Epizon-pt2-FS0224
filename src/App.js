import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CartIndicator from "./components/CartIndicator";
import BookStore from "./components/BookStore";
import Cart from "./components/Cart";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const App = () => {
  const bookSelected = useSelector(state => state.bookSelected.content);
  const isLoading = useSelector(state => state.books.isLoading);
  return (
    <BrowserRouter>
      <Container className="epizon-container">
        <Row>
          <Col sm={12} className="text-center background-div">
            <Link to="/">
              <h1 className="d-inline-block me-3">Epizon Book Store {isLoading ? "..." : ""}</h1>
              {bookSelected && <img src={bookSelected.imageUrl} alt={bookSelected.title} height="100" />}
            </Link>
          </Col>
          <CartIndicator />
        </Row>
        <Routes>
          <Route path="/" element={<BookStore />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer className="mt-5" />
      </Container>
    </BrowserRouter>
  );
};

export default App;
