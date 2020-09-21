export default {
	ProductTypeList: state => {
		let type = [];
		state.CanteenProduct.goods.map(item => {
			type = [...type, { name: item.name, type: item.type }];
		});

		return type;
	},
	ProductGoodList: state => {
		return state.CanteenProduct.goods;
	},
	ScrollDom: state => {
		let DomTop = 125;
		let ScrollDom = [];
		state.CanteenProduct.goods.map((item, index) => {
			if(index != 0) {
				DomTop += 30 + state.CanteenProduct.goods[index-1].foods.length*115;
			}
			ScrollDom = [...ScrollDom, {
				name: item.name,
				type: item.type,
				top: DomTop
			}]
		});
		return ScrollDom;
	},
	FillBlankHeight: state => {
		let height = 0
		if(state.CanteenProduct.goods.length == 0 || state.HeightInfo.page == 0) {
			return height;
		}
		let goods = state.CanteenProduct.goods;
		let { content, page, tabbar, title, shopcar } = state.HeightInfo;
		let length = goods[goods.length-1].foods.length*content;
		if(length < (page-tabbar-title)) {
			height = page-tabbar-title-length
			return height;
		} else {
			return height;
		}
	}
}