// admin/src/pages/Inventory/PizzaInventory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import './PizzaInventory.css';

const PizzaInventory = ({ url }) => {
    const [pizzaInventory, setPizzaInventory] = useState([]);

    const fetchPizzaInventory = async () => {
        const response = await axios.get(`${url}/api/inventory/list`);
        if (response.data.success) {
            setPizzaInventory(response.data.data);
        } else {
            toast.error("Error fetching pizza inventory");
        }
    };

    useEffect(() => {
        fetchPizzaInventory();
    }, []);

    return (
        <div className="pizza-inventory">
            <h3>Pizza Inventory</h3>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Item Name</b>
                    <b>Quantity</b>
                    <b>Threshold</b>
                </div>
                {pizzaInventory.map((item) => (
                    <div className="list-table-format" key={item.itemName}>
                        <p>{item.itemName}</p>
                        <p>{item.quantity}</p>
                        <p>{item.threshold}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PizzaInventory;