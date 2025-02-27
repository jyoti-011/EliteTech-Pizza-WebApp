// admin/src/pages/Inventory/ListInventory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ListInventory.css';

const ListInventory = ({ url }) => {
    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        const response = await axios.get(`${url}/api/inventory/list`);
        if (response.data.success) {
            setInventory(response.data.data);
            checkInventoryThreshold(response.data.data); // Check thresholds after fetching
        } else {
            toast.error("Error fetching inventory");
        }
    };

    const checkInventoryThreshold = (inventoryItems) => {
        inventoryItems.forEach(item => {
            if (item.quantity < item.threshold) {
                toast.warn(`Inventory Alert: ${item.itemName} stock is below the threshold! Current quantity: ${item.quantity}`);
            }
        });
    };

    const handleIncreaseQuantity = async (item) => {
        const newQuantity = item.quantity + 1; // Increase by 1
        const response = await axios.post(`${url}/api/inventory/update`, { itemName: item.itemName, quantity: newQuantity });
        if (response.data.success) {
            toast.success("Quantity increased successfully");
            fetchInventory();
        } else {
            toast.error("Error updating inventory");
        }
    };

    const handleDecreaseQuantity = async (item) => {
        if (item.quantity > 0) {
            const newQuantity = item.quantity - 1; // Decrease by 1
            const response = await axios.post(`${url}/api/inventory/update`, { itemName: item.itemName, quantity: newQuantity });
            if (response.data.success) {
                toast.success("Quantity decreased successfully");
                fetchInventory();
            } else {
                toast.error("Error updating inventory");
            }
        } else {
            toast.warn(`Cannot decrease quantity for ${item.itemName}. Current quantity is 0.`);
        }
    };

    const handleRemoveItem = async (item) => {
        const response = await axios.delete(`${url}/api/inventory/remove`, { data: { itemName: item.itemName } });
        if (response.data.success) {
            toast.success("Item removed successfully");
            fetchInventory();
        } else {
            toast.error("Error removing item");
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <div className="list-inventory">
            <h3>Inventory List</h3>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Item Name</b>
                    <b>Quantity</b>
                    <b>Threshold</b>
                    <b>Actions</b>
                </div>
                {inventory.map((item) => (
                    <div className="list-table-format" key={item.itemName}>
                        <p>{item.itemName}</p>
                        <p>{item.quantity}</p>
                        <p>{item.threshold}</p>
                        <p className='cursor'>
                            <span className="action-button" onClick={() => handleIncreaseQuantity(item)}>+</span>
                            <span className="action-button" onClick={() => handleDecreaseQuantity(item)}>-</span>
                            <span className="action-button" onClick={() => handleRemoveItem(item)}>x</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListInventory;