import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddInventory.css';

const AddInventory = ({ url }) => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [threshold, setThreshold] = useState(0);

    const handleAddInventory = async () => {
        // Check if the item is one of the predefined items
        const predefinedItems = ['Pizza Base', 'Sauce', 'Cheese', 'Veggies', 'Meat', 'Tomato', 'BBQ', 'Pesto', 'Garlic', 'Alfredo', 'Bell Peppers', 'Onions', 'Mushrooms','Olives', 'Spinach','Mozzarella','Cheddar','Parmesan','Feta','Vegan Cheese'];
        if (!predefinedItems.includes(itemName)) {
            toast.error("Please add a valid pizza ingredient.");
            return;
        }

        const response = await axios.post(`${url}/api/inventory/add`, { itemName, quantity, threshold });
        if (response.data.success) {
            toast.success("Item added successfully");
            setItemName('');
            setQuantity(0);
            setThreshold(0);
        } else {
            toast.error("Error adding item");
        }
    };

    return (
        <div className="add-inventory">
            <h3>Add Inventory Item</h3>
            <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input type="number" placeholder="Threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
            <button onClick={handleAddInventory}>Add Item</button>
        </div>
    );
};

export default AddInventory;