import { SolveAccuracy } from '@/unit/DealFun'
export default {
	// 传入食堂id获取食堂详细信息
	CanteenDetail: state => id => {
		return state.CanteenList.filter(item => item.restaurant_id == id )[0];
	},
	// 传入食堂id获取当前食堂的购物车信息
	ShopCarDetail: state => id => {
		let CarInfo = state.CarList.filter(item => item.restaurant_id == id );
		const { name, restaurant_id, distributionFee: distPrice } = state.CanteenList.filter(item => item.restaurant_id == id)[0];
		let returnInfo = { name, restaurant_id, distPrice, money: 0, good_count: 0, boxFee: { money: 0, count: 0 }, goods: [] };
		if(CarInfo.length != 0) {
			returnInfo.goods = CarInfo[0].goods;
			CarInfo[0].goods.map(item => {
				returnInfo.money = SolveAccuracy(returnInfo.money += (item.price + item.boxFee) * item.count, 2);
				returnInfo.good_count += item.count;
				returnInfo.boxFee.money = SolveAccuracy(returnInfo.boxFee.money += item.boxFee * item.count, 2);
				returnInfo.boxFee.count += item.count;
			});
		}
		return returnInfo;
	},
	// 传入食堂id获取当前食堂的购物车里的商品数量
	ShopCarCount: state => id => {
		let CarInfo = state.CarList.filter(item => item.restaurant_id == id );
		let count = 0;
		CarInfo[0].goods.map(item => {
			count += item.count
		});
		return count;
	},
	// 传入食堂id生成当前食堂的订单信息
	OrderDetail: state => id => {
		let car = state.CarList.filter(item => item.restaurant_id == id);
		if(car.length == 0) {
			return false;
		}
		car = [...car][0];
		let order = JSON.parse(JSON.stringify(car));
		let boxInfo = {
			money: 0,
			count: 0
		};
		let pay = order.distPrice;
		order.goods.map(item => {
			boxInfo.money = SolveAccuracy(boxInfo.money += item.boxFee*item.count, 2)
			boxInfo.count += item.count;
			pay = SolveAccuracy(pay += (item.price + item.boxFee)*item.count, 2)
		});
		order.boxInfo = boxInfo;
		order.realPay = pay;
		return order;
	},
	// 传入食堂id、收货地址、token生成订单表单
	CreateOrderForm: state => ({ canteenId, caId, token }) => {
		let orderForm = { canteenId, caId, token, cartItems:[] };
		const car = state.CarList.filter(item => item.restaurant_id == canteenId)[0];
		car.goods.map(item => {
			orderForm.cartItems = [...orderForm.cartItems, { psId: item.specs, amount: item.count }];
		});
		orderForm.cartItems = JSON.stringify(orderForm.cartItems);
		return orderForm;
	},
	// 根据订单号获取订单详细信息
	OrderInfoDetail: state => orderid => {
		return state.OrderList.filter(item => item.omOrderSn == orderid )[0]
	},
	//传入订单id获取待领取订单详细信息
	GetTypeOrderList: state => orderid =>{
		return state.TypeOrderList.filter(item => item.omOrderSn==orderid)[0]

	},
	// 根据收货地址ID获取详细信息
	GetAddressDetail: state => id => {
		return state.AddressList.filter(item => item.caId == id )[0]
	},
	// 传入菜品id获取该菜品在购物车里的数量
	GetProductCount: state => id => {
		let count = 0;
		state.CarList.map(item => {
			item.goods.map(item => {
				if(item.food_id == id) {
					count += item.count;
				}
			})
		});
		return count;
	}

}