export default {
	SaveCanteenInfo(state, info) {
		state.CanteenInfo = info;
	},
	SelectTabBarActive(state, number) {
		state.TabBarActive = number;
	},
	ClearProductList(state) {
		state.have = true
		state.CanteenProduct = {
			"name": "",
			"restaurant_id": 0,
			"goods": []
		};
	},
	ChangeProductList(state, list) {
		state.CanteenProduct = list;
		const item = { name: list.goods[0].name, type: list.goods[0].type };
		state.TypeActive = item;
	},
	SetTypeActive(state, item) {
		state.TypeActive = item
	},
	SaveHeightInfo(state, info) {
		state.HeightInfo = info
	},
	ChangeHave(state, bool) {
		state.have = bool
	}
}