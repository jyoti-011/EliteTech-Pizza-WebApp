// backend/controllers/inventoryController.js
import Inventory from '../models/inventoryModel.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const addInventory = async (req, res) => {
    const { itemName, quantity, threshold } = req.body;
    const newItem = new Inventory({ itemName, quantity, threshold });
    await newItem.save();
    res.json({ success: true, message: "Item added successfully" });
};

const listInventory = async (req, res) => {
    const items = await Inventory.find({});
    res.json({ success: true, data: items });
};

const updateInventory = async (req, res) => {
    const { itemName, quantity } = req.body;
    const item = await Inventory.findOneAndUpdate(
        { itemName },
        { $set: { quantity } },
        { new: true }
    );

    // Check if the item exists and if the quantity is below the threshold
    if (item) {
        console.log(`Updated item: ${item.itemName}, New quantity: ${item.quantity}, Threshold: ${item.threshold}`);
        if (item.quantity < item.threshold) {
            console.log(`Quantity for ${item.itemName} is below threshold. Sending notification...`);
            sendEmailNotification(item);
        }
    } else {
        console.log(`Item ${itemName} not found.`);
    }

    res.json({ success: true, message: "Inventory updated successfully" });
};
const removeInventory = async (req, res) => {
    const { itemName } = req.body;
    const result = await Inventory.findOneAndDelete({ itemName });
    if (result) {
        res.json({ success: true, message: "Item removed successfully" });
    } else {
        res.json({ success: false, message: "Item not found" });
    }
};


// const updateInventoryAfterOrder = async (orderItems) => {
//     for (const item of orderItems) {
//         const { itemName, quantity } = item; // Assuming orderItems is an array of { itemName, quantity }
//         const updatedItem = await Inventory.findOneAndUpdate(
//             { itemName },
//             { $inc: { quantity: -quantity } },
//             { new: true }
//         );

//         if (updatedItem) {
//             console.log(`Updated item after order: ${updatedItem.itemName}, New quantity: ${updatedItem.quantity}, Threshold: ${updatedItem.threshold}`);
//             if (updatedItem.quantity < updatedItem.threshold) {
//                 console.log(`Quantity for ${updatedItem.itemName} is below threshold after order. Sending notification...`);
//                 sendEmailNotification(updatedItem);
//             }
//         } else {
//             console.log(`Item ${itemName} not found.`);
//         }
//     }
// };

const sendEmailNotification = (item) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'Inventory Alert',
        text: `The stock for ${item.itemName} is below the threshold. Current stock: ${item.quantity}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

export { addInventory, listInventory, updateInventory,removeInventory  };