export default {
	SaveProductSelftList(state, list) {
		state.ProductSelft = list.taocan;

		state.ActiveTaocan = list.taocan[0].id;
	},

	SaveActiveTaocan(state, id) {
		state.ActiveTaocan = id
	},
	SaveHeightInfo(state, info) {
		state.HeightInfo = info
	},
	SetLeftType(state, item) {
		state.ActiveLeftType = item
	},
	ClearCar(state){
		state.ShopCar=[]
	},
	AddMinusCount(state, info){
		state.ShopCar.map((item,index)  =>{
			if(item.id== info.id){
				if(info.type == 'add')
				{
					item.count++
				}
				else if(item.count>0&&info.type == 'minus'){
					item.count--
					if (item.count == 0) {
						state.ShopCar.splice(index,1)
					}
				}
			}
		})
	},
	SaveShopCar(state, item){
		if(state.ShopCar.length>1){
			for (var i = 0; i < state.ShopCar.length; i++) {
				if (state.ShopCar[i].id == item.id) {
					console.log(item.count)
					state.ShopCar[i].count=state.ShopCar[i].count+item.count
					console.log(state.ShopCar[i].count)
					return
				}
			}
			state.ShopCar= [...state.ShopCar,{id:item.id, name:item.name, count:item.count, price:item.price, speceName:item.specName} ]
			return
		}
		state.ShopCar= [...state.ShopCar,{id:item.id, name:item.name, count:item.count, price:item.price, speceName:item.specName,boxFee:item.boxFee} ]
	},
	SaveFoodSelft(state, money) {
		let food=state.ShopCar
		state.FoodSelft=[...state.FoodSelft,{number:1, totalPrice:money,foodlist:food}]
		console.log(state.FoodSelft)
	},
	addNumberFoodSelft(state, index){
		state.FoodSelft[index].number++
	},
	minusNumberFoodSelft(state, index){
		if (state.FoodSelft[index].number>1) {
			state.FoodSelft[index].number--
		}
		else{
		state.FoodSelft.splice(index,1)
		}
	}
}