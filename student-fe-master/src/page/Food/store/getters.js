export default {
	ProductGoodList: state => {
		return state.CanteenProduct.goods;
	},
	ScrollDom: state => {
		let DomTop = state.HeightInfo.banner;
		let ScrollDom = [];
		state.CanteenProduct.goods.map((item, index) => {
			if(index != 0) {
				DomTop += state.CanteenProduct.goods[index-1].foods.length*state.HeightInfo.content + state.HeightInfo.title;
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
		let height = 50
		if(state.CanteenProduct.goods.length == 0 || state.HeightInfo.page == 0) {
			return height;
		}
		let goods = state.CanteenProduct.goods;
		let { content, page, tabbar, title } = state.HeightInfo;
		let length = goods[goods.length-1].foods.length*content;
		if(length < (page-tabbar-title)) {
			height = page-tabbar-title-length
			return height;
		} else {
			return height;
		}
	}
}