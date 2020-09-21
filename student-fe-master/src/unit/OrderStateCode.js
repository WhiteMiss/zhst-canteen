const OrderState = [{
	code: 0,
	value: '待付款'
}, {
	code: 10,
	value: '已付款'
}, {
	code: 20,
	value: '已接单'
}, {
	code: 30,
	value: '待配送'
}, {
	code: 40,
	value: '配送完成'
}, {
	code: 50,
	value: '交易成功'
}, {
	code: 60,
	value: '交易取消'
}, {
	code: 70,
	value: '正在退款'
}, {
	code: 80,
	value: '已退款'
}];

export const GetOrderState = code => {
	return OrderState.filter(item => item.code == code)[0].value;
}