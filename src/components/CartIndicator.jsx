import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import { setUserAction } from "../redux/actions";

const CartIndicator = () => {
  // vogliamo collegarci allo Store Redux in lettura attraverso l'hook dedicato useSelector()
  const [inputValue, setInputValue] = useState("");

  const cartLength = useSelector(state => state.cart.content.length);
  const user = useSelector(state => state.user.content);

  const dispatch = useDispatch();

  return (
    <div className="text-end mt-3 mb-4 px-0">
      {user ? (
        <div className="d-flex justify-content-end align-items-center">
          <p className="mb-0 me-2">
            Benvenuto <strong style={{ textTransform: "capitalize" }}>{user}</strong>,
          </p>
          <Link to="/cart" className="btn btn-primary">
            <FaShoppingCart />
            <span className="ms-2">{cartLength}</span>
          </Link>
        </div>
      ) : (
        <div className="d-flex justify-content-end">
          <FormControl
            placeholder="Inserisci nome utente per vedere il carrello"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="w-50"
          />
          <Button
            variant="primary"
            onClick={() => {
              // dispatch({ type: "SET_USER", payload: inputValue })
              dispatch(setUserAction(inputValue));
            }}
          >
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartIndicator;
