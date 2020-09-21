const Mock = require('mockjs')
import * as Api from '@/unit/ApiInterface'
import * as MockHandle from './MockHandle'
const M = '999999999';
const AllSwitch = true;
const Switch = (s) => {
	if(s && AllSwitch) {
		return '';
	} else {
		return M;
	}
}


// 获取用户头像
Mock.mock(MockHandle.RegularApi(Api.GET_USER_HEAD_IMG('aaa') + Switch(false)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return {
		"code": 1001000,
		"msg": "请求成功",
		"data": "http://thirdwx.qlogo.cn/mmopen/vi_32/4au9VL4WgPaMyuHumhZMtGZlYQHnAlf9LLOPZ2pp4wdPrq5ClQdlZIiaq6VZgcn8ViasRozibGTu7QnIpXj1oBhyg/132"
	};
});
// 绑定用户
Mock.mock(MockHandle.RegularApi(Api.LOGIN_BIND_STUDENT + Switch(false)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return {
		"code": 1001004,
		"msg": "用户绑定成功"
	};
});
// 解除绑定
Mock.mock(MockHandle.RegularApi(Api.UNBIND_USER + Switch(false)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return {
		"code": 1001005,
		"msg": "用户解绑成功"
	};
});
// 查询营业中的食堂列表
Mock.mock(MockHandle.RegularApi(Api.GET_CANTEEN_LIST + Switch(false)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return Mock.mock({
		"code": 2001000,
		"mag": "成功",
		"data|10": [{
			"restaurant_id|1000-9999": 9999,
			"name|1": ["第一食堂一楼第一食堂第一食堂第一食堂一楼", "第一食堂二楼", "第二食堂"],
			"avatar|1": [
				"https://hrst.oss-cn-shenzhen.aliyuncs.com/canteen/B18.jpg?x-oss-process=image/resize,m_mfit,h_100,w_100",
				"https://hrst.oss-cn-shenzhen.aliyuncs.com/canteen/C33.jpg?x-oss-process=image/resize,m_mfit,h_100,w_100"],
			"distributionFee|0.2": 1,
			"rating|5-10": 10,
			"sellCount|400-1000": 1000,
			"administratorInfoVO": {
				"phone": /^1[3458][0-9]\d{8}$/
			}
		}]
	})
});
// 通过食堂id获取该食堂的详细菜品信息返回学生端
Mock.mock(MockHandle.RegularApi(Api.GET_CANTEEN_PRODUCT_LIST + Switch(false)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return Mock.mock({
		"code": "0",
		"mag": "成功",
		"data": {
			"name": "第一食堂二楼",
			"restaurant_id": req.body.canteenId,
			"goods|8": [{
				"name|+1": ["套餐类", "油炸类", "清汤类", "小吃", "水果", "香蕉", "句子", "很好"],
				"type|1000-9999": 9999,
				"foods|2-7": [{
					"food_id|10000-99999": 99999,
					"name|1": ["荷塘月（荷塘藕遇)", "汉堡包汉堡包汉堡包汉堡包汉堡包汉堡包汉堡包汉堡包", "手撕鸡", "东波肉饭", "滑稽饭", "冬菇焖鸭", "奥尔良鸡腿"],
					"description|1": ["鲜香酿藕夹、蒜蓉炒藕片、蒜蓉油麦菜、靓米饭", "辣堡+辣翅+小可套餐", "哈哈哈哈"],
					"sellCount": null,
					"rating|5-10": 10,
					"icon|1": [
						"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20180823034118526.jpg?x-oss-process=image/resize,m_mfit,h_100,w_100"],
					"image|1": [
						"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20180823034118526.jpg",
						"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/2018082303415969.jpg"],
					"buyStatus": 0,
					"specs|1-3": [{
						"id|10000-99999": 99999,
						"specName|+1": ["标配", "加菜", "加饭"],
						"price|1-15": 15,
						"sellCount|30-50": 50,
						"boxFee": 1.00
					}]
				}]
			}]
		}
	})
});
// 新增收货地址
Mock.mock(MockHandle.RegularApi(Api.ADD_ADDRESS + Switch(true)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return {
		"code": 1001000,
		"msg": "添加成功"
	};
});
// 订单评价
Mock.mock(MockHandle.RegularApi(Api.ORDER_COMMENT_ADD + Switch(true)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return {
		"code": 9001403,
		"msg": "订单评价成功"
	};
});
// 获取订单评价
Mock.mock(MockHandle.RegularApi(Api.ORDER_COMMENT_FINDONEBYID + Switch(true)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return {
		"code": 9001406,
		"msg": "获取订单评价成功",
		"data": {
			"ocId": 1,
			"ocOrderSn": "1534594859543275382",
			"ocClNumber": "3838",
			"ocServiceAssessment": 4,
			"ocDescription": null,
			"ocAnonymousStatus": 0,
			"ocAuditStatus": 0,
			"ocCreateTime": "2018-08-21T08:56:29.000+0000",
			"ocModifyTime": "2018-08-21T08:56:29.000+0000",
		}
	}

});

// 获取自选套餐列表
Mock.mock(MockHandle.RegularApi(Api.GET_CANTEEN_PRODUCTSELFT_LIST + Switch(true)), (req, res) => {
	req = MockHandle.SplitOption(req);

	return Mock.mock({
		"code": 9999999,
		"msg": "获取自选列表成功",
		"data": {
			"restaurant_id": 1,
			"taocan":[{
				id: '1',
				name: '大众班组',
				type: [{
					id: '1-1',
					name: '肉类',
					goods: [{
						id: '1-1-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '牛肉'
					}, {
						id: '1-1-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '猪肉'
					}, {
						id: '1-1-3',
						name: '鸡肉',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
					}]
				}, {
					id: '1-2',
					name: '蔬菜类',
					goods: [{
						id: '1-2-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '青菜'
					}, {
						id: '1-2-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '白菜'
					}, {
						id: '1-2-3',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '大白菜'
					}]
				}]
			}, {
				id: '2',
				name: '大众班组2',
				type: [{
					id: '2-1',
					name: '饭类',
					goods: [{
						id: '2-1-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '泰国米'
					}, {
						id: '2-1-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '中国香米'
					}, {
						id: '2-1-3',
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						rating:100,
						price:0.1,
						name: '美国香米'
					}]
				}, {
					id: '2-2',
					name: '蔬菜类',
					goods: [{
						id: '2-2-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '青菜'
					}, {
						id: '2-2-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '白菜'
					}, {
						id: '2-2-3',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '大白菜'
					}]
				}, {
					id: '2-3',
					name: '肉类',
					goods: [{
						id: '2-2-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '鸡肉'
					}, {
						id: '2-2-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '牛肉'
					}, {
						id: '2-2-3',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '人肉'
					}]
				}]
			}, {
				id: '3',
				name: '大众班组3',
				type: [{
					id: '3-1',
					name: '饭类',
					goods: [{
						id: '3-1-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '泰国香米米'
					}, {
						id: '3-1-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '中国香米'
					}, {
						id: '3-1-3',
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						rating:100,
						price:0.1,
						name: '美国香米'
					}]
				}, {
					id: '3-2',
					name: '蔬菜类',
					goods: [{
						id: '3-2-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '青菜'
					}, {
						id: '3-2-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '白菜'
					}, {
						id: '3-2-3',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '大白菜'
					}]
				}, {
					id: '3-3',
					name: '肉类',
					goods: [{
						id: '3-2-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '鸡肉'
					}, {
						id: '3-2-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '牛肉'
					}, {
						id: '3-2-3',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '人肉'
					}]
				}, {
					id: '3-4',
					name: '肉类2',
					goods: [{
						id: '3-2-1',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '牛排'
					}, {
						id: '3-2-2',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '牛肉'
					}, {
						id: '3-2-3',
						img:"http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/product/20181203173656152.jpg",
						desc:"大鸡腿、鸡蛋、青菜、米饭、送小菜",
						rating:100,
						price:0.1,
						name: '人肉'
					}]
				}]
			}]
		}
	})

});

// 找回二维码
Mock.mock(MockHandle.RegularApi(Api.GET_RECPVERY_CODE + Switch(true)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return {
		"code": 0,
		"msg": "success",
		"data": {
			"riQrcode": "555555444444",
			"riRecoveryNum": 0,
			"riRecoveryEd": 2
		}
	}
});

// 获取归还列表
Mock.mock(MockHandle.RegularApi(Api.GET_RECOVERY_LIST + Switch(true)), (req, res) => {
	req = MockHandle.SplitOption(req);
	return {
		"code": 0,
		"msg": "success",
		"data": [{
			omOrderSn: '1545707078211952448', // 订单编号
			canteenName: '一食堂一楼', // 食堂名称
			canteenPicture: 'http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/canteen/20181115135059576.JPG', // 食堂图片
			omCreateTime: '2018-12-25T03:04:38.000+0000', // 下单时间
			omReceiveTime: '2018-12-25T03:04:38.000+0000', // 取餐时间
			recoveryStatus: 0, // 归还状态（0-未归还，1-已归还）
			recoveryAll: 4, // 需归还数量（需返回数量=未归还数量+已归还数量）
			recoveryEd: 3, // 已归还数量
			recoveryNot: 1 // 未归还数量
		}, {
			omOrderSn: '1545707078211952447',
			canteenName: '一食堂一楼',
			canteenPicture: 'http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/canteen/20181115135059576.JPG',
			omCreateTime: '2018-12-25T03:04:38.000+0000',
			omReceiveTime: '2018-12-25T03:04:38.000+0000',
			recoveryStatus: 1,
			recoveryAll: 4,
			recoveryEd: 3,
			recoveryNot: 1
		}, {
			omOrderSn: '1545707078211952446',
			canteenName: '一食堂一楼',
			canteenPicture: 'http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/canteen/20181115135059576.JPG',
			omCreateTime: '2018-12-25T03:04:38.000+0000',
			omReceiveTime: '2018-12-25T03:04:38.000+0000',
			recoveryStatus: 0,
			recoveryAll: 4,
			recoveryEd: 3,
			recoveryNot: 1
		}, {
			omOrderSn: '1545707078211952445',
			canteenName: '一食堂一楼',
			canteenPicture: 'http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/canteen/20181115135059576.JPG',
			omCreateTime: '2018-12-25T03:04:38.000+0000',
			omReceiveTime: '2018-12-25T03:04:38.000+0000',
			recoveryStatus: 0,
			recoveryAll: 4,
			recoveryEd: 3,
			recoveryNot: 1
		}, {
			omOrderSn: '1545707078211952444',
			canteenName: '一食堂一楼',
			canteenPicture: 'http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/canteen/20181115135059576.JPG',
			omCreateTime: '2018-12-25T03:04:38.000+0000',
			omReceiveTime: '2018-12-25T03:04:38.000+0000',
			recoveryStatus: 0,
			recoveryAll: 4,
			recoveryEd: 3,
			recoveryNot: 1
		}, {
			omOrderSn: '1545707078211952443',
			canteenName: '一食堂一楼',
			canteenPicture: 'http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/canteen/20181115135059576.JPG',
			omCreateTime: '2018-12-25T03:04:38.000+0000',
			omReceiveTime: '2018-12-25T03:04:38.000+0000',
			recoveryStatus: 0,
			recoveryAll: 4,
			recoveryEd: 3,
			recoveryNot: 1
		}, {
			omOrderSn: '1545707078211952442',
			canteenName: '一食堂一楼',
			canteenPicture: 'http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/canteen/20181115135059576.JPG',
			omCreateTime: '2018-12-25T03:04:38.000+0000',
			omReceiveTime: '2018-12-25T03:04:38.000+0000',
			recoveryStatus: 0,
			recoveryAll: 4,
			recoveryEd: 3,
			recoveryNot: 1
		}, {
			omOrderSn: '1545707078211952441',
			canteenName: '一食堂一楼',
			canteenPicture: 'http://hrzhxy.oss-cn-shenzhen.aliyuncs.com/canteen/20181115135059576.JPG',
			omCreateTime: '2018-12-25T03:04:38.000+0000',
			omReceiveTime: '2018-12-25T03:04:38.000+0000',
			recoveryStatus: 0,
			recoveryAll: 4,
			recoveryEd: 3,
			recoveryNot: 1
		}]
	}
});