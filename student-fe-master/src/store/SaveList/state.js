// 食堂列表
let defaultCanteenList = [];
if(sessionStorage.getItem("CanteenList")) {
	defaultCanteenList = JSON.parse(sessionStorage.getItem("CanteenList"))
}
// 购物车列表
let defaultCarList = [];
if(sessionStorage.getItem("CarList")) {
	defaultCarList = JSON.parse(sessionStorage.getItem("CarList"))
}
// 用户信息
let defaultUserInfo = { uickname: '', usernum: '', headimgurl: '', sex: '' };
if(sessionStorage.getItem("UserInfo")) {
	defaultUserInfo = JSON.parse(sessionStorage.getItem("UserInfo"))
}
// 收货地址列表
let defaultAddressList = [];
if(sessionStorage.getItem("AddressList")) {
	defaultAddressList = JSON.parse(sessionStorage.getItem("AddressList"))
}
// 订单列表
let defaultOrderList = [];
if(sessionStorage.getItem("OrderList")) {
	defaultOrderList = JSON.parse(sessionStorage.getItem("OrderList"))
}
export default {
	CanteenList: defaultCanteenList,
	CarList: defaultCarList,
	AddressList: defaultAddressList,
	UserInfo: defaultUserInfo,
	OrderList: defaultOrderList,
	TypeOrderList:[],
	ModelTime: [
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'},
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'},
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'},
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'},
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'},
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'},
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'},
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'},
		{ modeName: '', startTime: '1969-12-31T16:00:00.000+0000', endTime: '1969-12-31T16:00:00.000+0000'}
	],
}