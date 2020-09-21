export default {
	GetType: state => {
		if(state.ActiveTaocan) {
			return state.ProductSelft.find(item => item.id == state.ActiveTaocan ).type
		} else {
			return [];
		}
	},
	FillBlankHeight: state => {
		let height = 0
		if(state.ProductSelft == 0 || state.HeightInfo.page == 0) {
			return height;
		}
		let type = state.ProductSelft.find(item => item.id == state.ActiveTaocan ).type;
		let { content, page, title, selft } = state.HeightInfo;
		let length = type[type.length-1].goods.length*content;
		if(length < (page-title-selft)) {
			height = page-title-length-selft
			return height;
		} else {
			return height;
		}
	},
	GetBscrollTop: state => name =>{
		let Top=0
		let type=state.ProductSelft.find(item => item.id == state.ActiveTaocan ).type;
		 	for (let i = 0; i <= type.length; i++) {
		 		if(type[i].name==name){
		 			return Top
		 		}
		 		Top += 36 + type[i].goods.length*110;
		 		console.log(Top)
		 	}
	},
	ScrollDom: state =>{
		let Top=0
		let ScrollDom = [];
		let type=state.ProductSelft.find(item => item.id == state.ActiveTaocan ).type;
		type.map((item,index) =>{
			if(index != 0) {
				Top += 36 + type[index-1].goods.length*110;
			}
			ScrollDom = [...ScrollDom, {
				name: item.name,
				top: Top
			}]
		});
		return ScrollDom
	}

}