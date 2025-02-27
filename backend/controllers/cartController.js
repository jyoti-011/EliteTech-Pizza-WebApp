import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData || {};
        const { itemId, customization } = req.body; // Destructure customization from request body

        if (!cartData[itemId]) {
            cartData[itemId] = { quantity: 1, customization }; // Store customization
        } else {
            cartData[itemId].quantity += 1; // Increment quantity
            // Keep the same customization (or you can choose to update it if needed)
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

//remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData || {};
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
    
}

export {addToCart, removeFromCart, getCart}