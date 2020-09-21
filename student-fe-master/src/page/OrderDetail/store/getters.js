export default {
	BoxDetail: state => id => {
		return state.BoxList.filter(item => item.odbId == id)[0]
	}
}