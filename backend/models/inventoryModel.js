// backend/models/inventoryModel.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    threshold: { type: Number, required: true }
});

// Add predefined items for pizza management
const predefinedItems = [
    { itemName: 'Pizza Base', quantity: 100, threshold: 20 },
    { itemName: 'Sauce', quantity: 100, threshold: 20 },
    { itemName: 'Cheese', quantity: 100, threshold: 20 },
    { itemName: 'Veggies', quantity: 100, threshold: 20 },
    { itemName: 'Meat', quantity: 100, threshold: 20 }
];

const Inventory = mongoose.models.inventory || mongoose.model("inventory", inventorySchema);

// Seed the database with predefined items if empty
const seedInventory = async () => {
    const count = await Inventory.countDocuments();
    if (count === 0) {
        await Inventory.insertMany(predefinedItems);
    }
};

export default Inventory; // Default export