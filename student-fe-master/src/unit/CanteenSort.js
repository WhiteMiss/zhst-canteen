// 食堂页面排序
const compare = (property) => {
	return function(obj1,obj2){
		let value1 = obj1[property]
		let value2 = obj2[property]
		return value1 - value2
	}
}
// des: false为升序，true为降序
export const CanteenSort = (list, index, des = false) => {
	let sortObj = list.sort(compare(index));
	if(des) {
		sortObj.reverse();
	}
	return sortObj;
}
