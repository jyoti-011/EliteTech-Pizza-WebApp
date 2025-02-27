// backend/routes/inventoryRoute.js
import express from 'express';
import { addInventory, listInventory, updateInventory, removeInventory } from '../controllers/inventoryController.js';

const inventoryRouter = express.Router();

inventoryRouter.post('/add', addInventory);
inventoryRouter.get('/list', listInventory);
inventoryRouter.post('/update', updateInventory);
// inventoryRouter.post('/order/update', updateInventoryAfterOrder);
inventoryRouter.delete('/remove', removeInventory); // New route for removing an item

export default inventoryRouter;