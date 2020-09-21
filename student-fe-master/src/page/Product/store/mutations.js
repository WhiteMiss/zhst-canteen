export default {
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
	ChangeHave(state, bool) {
		state.have = bool
	},
	SaveHeightInfo(state, info) {
		state.HeightInfo = info
	},
}