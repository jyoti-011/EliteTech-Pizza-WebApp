import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './CustomizePizza.css';

const CustomizePizza = ({ itemId, onClose }) => {
    const { addToCart } = useContext(StoreContext);
    const [base, setBase] = useState('');
    const [sauce, setSauce] = useState('');
    const [cheese, setCheese] = useState('');
    const [veggies, setVeggies] = useState([]);

    const bases = ['Thin Crust', 'Thick Crust', 'Cheese Burst', 'Stuffed Crust', 'Gluten Free'];
    const sauces = ['Tomato', 'BBQ', 'Pesto', 'Alfredo', 'Garlic'];
    const cheeses = ['Mozzarella', 'Cheddar', 'Parmesan', 'Feta', 'Vegan Cheese'];
    const veggiesOptions = ['Bell Peppers', 'Onions', 'Mushrooms', 'Olives', 'Spinach'];

    const handleAddToCart = () => {
        const customization = { base, sauce, cheese, veggies };
        addToCart(itemId, customization);
        onClose();
    };

    return (
        <div className="customize-pizza-modal">
            <h2>Customize Your Pizza</h2>
            <div>
                <h3>Base</h3>
                {bases.map((b) => (
                    <label key={b}>
                        <input type="radio" value={b} checked={base === b} onChange={() => setBase(b)} />
                        {b}
                    </label>
                ))}
            </div>
            <div>
                <h3>Sauce</h3>
                {sauces.map((s) => (
                    <label key={s}>
                        <input type="radio" value={s} checked={sauce === s} onChange={() => setSauce(s)} />
                        {s}
                    </label>
                ))}
            </div>
            <div>
                <h3>Cheese</h3>
                <select value={cheese} onChange={(e) => setCheese(e.target.value)}>
                    <option value="">Select Cheese</option>
                    {cheeses.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Veggies</h3>
                {veggiesOptions.map((v) => (
                    <label key={v}>
                        <input type="checkbox" value={v} checked={veggies.includes(v)} onChange={() => {
                            if (veggies.includes(v)) {
                                setVeggies(veggies.filter(veg => veg !== v));
                            } else {
                                setVeggies([...veggies, v]);
                            }
                        }} />
                        {v}
                    </label>
                ))}
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CustomizePizza;