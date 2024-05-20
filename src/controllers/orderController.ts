import { Request, Response, NextFunction } from 'express';
import { PendingOrders } from '../models/order';
import { CompletedOrders } from '../models/completeOrders';
import { getRepository } from 'typeorm';

class orderClass {
    async addOrder(req: Request, res: Response, next: NextFunction) {
        const { buyerQty, buyerPrice, sellerQty, sellerPrice } = req.body;
        const pendingOrders = getRepository(PendingOrders);
        const completeOrders = getRepository(CompletedOrders);
        const completedOrdersData = new CompletedOrders();
        const pendingOrdersData = new PendingOrders()
        const getPendingOrders = await pendingOrders.find();
        try {
            //  When buyer and seller price and qyt is same
            if (buyerQty == sellerQty && buyerPrice == sellerPrice) {
                completedOrdersData.price = sellerPrice
                completedOrdersData.qty = sellerQty
                await completeOrders.save(completedOrdersData);
                
            }
            //  When buyer and seller price and qyt is same , find matches in existing data
            else {
                let orderMatched = false;
    
                for (const list of getPendingOrders) {
                    if (list.sellerPrice === buyerPrice && list.sellerQty === buyerQty) {
                        completedOrdersData.price = list.sellerPrice;
                        completedOrdersData.qty = list.sellerQty;
                        await completeOrders.save(completedOrdersData);
    
                        await pendingOrders
                            .createQueryBuilder()
                            .update(PendingOrders)
                            .set({
                                sellerPrice: sellerPrice,
                                sellerQty: sellerQty
                            })
                            .where({ id: list.id })
                            .execute();
    
                        orderMatched = true;
                        break; // Exit loop after finding a match
                    }
                    else if (list.buyerPrice === sellerPrice && list.buyerQty === sellerQty) {
                        completedOrdersData.price = sellerPrice;
                        completedOrdersData.qty =sellerQty;
                        await completeOrders.save(completedOrdersData);
    
                        await pendingOrders
                            .createQueryBuilder()
                            .update(PendingOrders)
                            .set({
                                buyerPrice: buyerPrice,
                                buyerQty: buyerQty
                            })
                            .where({ id: list.id })
                            .execute();
                        orderMatched = true;
                        break; // Exit loop after finding a match
                    }
                }
                // When no match found
                    if(!orderMatched){
                        pendingOrdersData.buyerPrice = buyerPrice
                        pendingOrdersData.buyerQty = buyerQty
                        pendingOrdersData.sellerPrice = sellerPrice
                        pendingOrdersData.sellerQty = sellerQty
                        await pendingOrders.save(pendingOrdersData)
                    }
                
            }

            res.status(200).json({ status: 'success', data: req.body });
        } catch (error: any) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    };

    async getPendingOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const pendingOrders = getRepository(PendingOrders);
            const orders = await pendingOrders.find();
            return res.status(200).json({ status: 'success', data: orders });
        } catch (e: any) {
            res.status(500).json({ status: 'error', message: e.message });
        }
    };

    async getCompletedOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const completeOrders = getRepository(CompletedOrders);
            const orders = await completeOrders.find();
            res.status(200).json({ status: 'success', data: orders });
        } catch (e: any) {
            res.status(500).json({ status: 'error', message: e.message });
        }
    };
}


export default new orderClass;