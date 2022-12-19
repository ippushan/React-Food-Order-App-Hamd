import { useContext } from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const totalAmount = `$${cartCxt.totalAmount.toFixed(2)}`;
  const hasItem = cartCxt.items.length > 0;

  const cartItemsRemoveHandler = (id) => {
    cartCxt.removeItem(id)
  };
  const cartItemsAddHandler = (item) => {
    cartCxt.addItem({...item,amount:1})
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemsRemoveHandler.bind(null,item.id)}
          onAdd={cartItemsAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
