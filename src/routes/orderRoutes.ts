import { Router } from 'express';
import orderController from '../controllers/orderController';
const router = Router();

router.post('/add_order', orderController.addOrder);
router.get('/pending_orders', orderController.getPendingOrders);
router.get('/completed_orders', orderController.getCompletedOrders);

export default router;
