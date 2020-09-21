/**
 * 图片路径提取宽度和高度
 * @param	{string} path 图片路径
 * @return {object}			{ path: 图片路径, width: 图片宽度, height: 图片高度}
 */
export const LeaveImgWidthHeight = (path) => {
	let pathArray = path.split(',');
	let re = { path };
	const wh = {'w': 'width', 'h': 'height'};
	for (let i = pathArray.length - 1; i >= pathArray.length -2; i--) {
		re[wh[pathArray[i].split('_')[0]]] = pathArray[i].split('_')[1];
	}
	return re;
}
/**
 * 获取Token
 * @return {string} token
 */
export const GetToken = () => {
	// return 'a420140af4a5268a0b18fadbc8029d82';
	var url = window.location.href;
	if (!url) {
		return ;
	}
	if(url.indexOf("?") == -1) {
		return 1
	} else {
		var arrUrl = url.split("?");
		var para = arrUrl[1];
		var param = para.split("#");
		var token = param[0].match(/=(\S*)/)[1];
		return token;
	}
}
/**
 * 处理js的浮点数计算精度丢失的问题
 * @param  {done know} f         处理的表达式
 * @param  {number}    digit     留小数点后几位
 * @return {number}              修复后的结果
 */
export const SolveAccuracy = (f, digit) => {
	var m = Math.pow(10, digit);
	return 	Math.round(f * m , 10) / m;
}
/**
 * 判断当前时间是否取餐时间
 * @param  {[type]} beginTime [description]
 * @param  {[type]} endTime   [description]
 * @return {[type]}           [description]
 */
export const GetTime = (beginTime, endTime) => {

	let NowDate = new Date();
	let nowTime = NowDate.getHours() + ':' + NowDate.getMinutes()

	let strb = beginTime.split (":");
	let stre = endTime.split (":");
	let strn = nowTime.split (":");

	let b = new Date ();
	let e = new Date ();
	let n = new Date ();

	b.setHours (strb[0]);
	b.setMinutes (strb[1]);
	e.setHours (stre[0]);
	e.setMinutes (stre[1]);
	n.setHours (strn[0]);
	n.setMinutes (strn[1]);

	if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
		return true;
	} else {
		return false;
	}
}
export const FormatNumber = n => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
/**
 * 获取当天日期
 * @return {[type]} [description]
 */
export const GetNowDate = () => {
	let nowDate = new Date();
	return nowDate.getFullYear() + '-' + FormatNumber(nowDate.getMonth() + 1) + '-' + FormatNumber(nowDate.getDate());
}