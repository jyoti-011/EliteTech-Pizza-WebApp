import React, { useContext } from 'react';
import { StoreContext } from "../../context/StoreContext"; 
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const subtotal = getTotalCartAmount(); // Calculate subtotal
    const deliveryFee = subtotal === 0 ? 0 : 2; // Delivery fee
    const total = subtotal + deliveryFee; // Total amount

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    const itemId = item._id; // Get the item ID
                    if (cartItems[itemId]) {
                        const { quantity, customization } = cartItems[itemId]; // Destructure quantity and customization
                        return (
                            <div key={itemId}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url + "/images/" + item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{quantity}</p>
                                    <p>${item.price * quantity}</p>
                                    <p onClick={() => removeFromCart(itemId)} className='cross'>x</p>
                                </div>
                                <div className='customization-details'>
                                    {customization && (
                                        <p>
                                            Customization: Base - {customization.base}, Sauce - {customization.sauce}, 
                                            Cheese - {customization.cheese}, Veggies - {customization.veggies.join(', ')}
                                        </p>
                                    )}
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null; // Ensure to return null if the item is not in the cart
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${subtotal}</p> {/* Display subtotal */}
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${deliveryFee}</p> {/* Display delivery fee */}
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${total}</b> {/* Display total */}
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;