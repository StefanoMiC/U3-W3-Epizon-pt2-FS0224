import { useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../redux/actions";

const BookStore = () => {
  // const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

  const hasError = useSelector(state => state.books.hasError);
  const errorMessage = useSelector(state => state.books.errorMessage);

  useEffect(() => {
    // getBooks();

    dispatch(getBooksAction());
  }, []);

  // const getBooks = async () => {
  //   try {
  //     let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
  //     if (resp.ok) {
  //       let fetchedBooks = await resp.json();
  //       setBooks(fetchedBooks);
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Row className="center-row">
      {hasError ? (
        <Col>
          <Alert variant="danger">{errorMessage}</Alert>
        </Col>
      ) : (
        <>
          <Col lg={4}>
            {/* <BookList books={books} /> */}
            <BookList />
          </Col>
          <Col lg={8}>
            <BookDetail />
          </Col>
        </>
      )}
    </Row>
  );
};

export default BookStore;
