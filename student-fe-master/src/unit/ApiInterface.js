// 总域名
//const baseUrl = "http://jiaog.hrzhst.com";
//const baseUrl = "http://zhst.hrzhst.com";
//const baseUrl = "http://test.hrzhst.com";
const baseUrl = "";


//------------------用户模块------------------//
// 获取用户头像
export const GET_USER_HEAD_IMG = (token) => {
	return `${baseUrl}/shopping/api/v1.1/login/getheadimgurl?Token=${token}`;
}
// 检查用户绑定状态
export const LOGIN_BIND_CHECK = baseUrl + '/shopping/api/v1.1/login/bindInfo';
// 绑定用户接口
export const LOGIN_BIND_STUDENT = baseUrl + '/shopping/api/v1.1/login/bind';
// 检查用户合法性,暂时还没用到！！！！！！！！！！！！
export const CHECK_TOKEN = baseUrl + '/shopping/api/v1.1/login/checkbytoken';
// 获取用户信息
export const GET_USER_INFO = baseUrl + '/shopping/api/v1.1/login/showInfo';
// 解除绑定
export const UNBIND_USER = baseUrl + '/shopping/api/v1.1/login/unbind';
// 获取用户的收货地址
export const GET_ADDRESS_LIST = baseUrl + '/shopping/api/v1.1/customeaddress/list';
// （用户地址）获取可用区域信息
export const GET_USEABLE_ADDRESS_LIST = baseUrl + '/shopping/api/v1.1/customeaddress/showAllArea';
// 新增收货地址
export const ADD_ADDRESS = baseUrl + '/shopping/api/v1.1/customeaddress/add';
// 修改收货地址
export const UPDATA_ADDRESS = baseUrl + '/shopping/api/v1.1/customeaddress/update';
// 删除收货地址
export const DELETE_ADDRESS = baseUrl + '/shopping/api/v1.1/customeaddress/delete';
// 修改密码
export const CHANGE_PASSWORD = baseUrl + '/shopping/api/v1.1/login/updatepwd'
//------------------用户模块------------------//

//------------------订单模块------------------//
// 获取订单是否评价完
export const ORDER_COMMENT_FINDONEBYID = baseUrl + '/shopping/api/v1.1/ordercomment/findonebyid';
// 用户订单评价
export const ORDER_COMMENT_ADD = baseUrl + '/shopping/api/v1.1/ordercomment/add';
// 用户下单进行扣库存和分配保温箱
export const ORDER_ADD = baseUrl + '/shopping/api/v1.1/orders/add';
// 获取用户订单列表
export const GET_ORDER_LIST = baseUrl + '/shopping/api/v1.1/orders/lists';
// 获取服务器时间
export const GET_SEVER_TIME = baseUrl + '/shopping/api/v1.1/server/getServerTime';
// 根据订单微信支付单号查询订单分箱链
export const GET_ORDER_BINNING = baseUrl + '/shopping/api/v1.1/orders/binning';
// 检验用户是否存在待支付订单
export const CHECK_PAY_STATE = baseUrl + '/shopping/api/v1.1/orders/waitpaids';
//------------------订单模块------------------//

//------------------食堂模块------------------//
// 查询营业中的食堂列表
export const GET_CANTEEN_LIST = baseUrl + '/shopping/api/v1.1/canteen/list';
// 获取模式时间
export const GET_MODE_TIME = baseUrl + '/shopping/api/v1.1/mode/listMode';
//------------------食堂模块------------------//

//------------------菜品模块------------------//
// 通过食堂id获取该食堂的详细菜品信息返回学生端
export const GET_CANTEEN_PRODUCT_LIST = baseUrl + '/shopping/api/productInfo/list';
// 在提交订单时对库存和商品状态进行检测
export const CHECK_PRODUCT_STATE = baseUrl + '/shopping/api/v1.1/products/check';
// 获取菜品的剩余库存
export const PRODUCTS_GETSTOCK = baseUrl + '/shopping/api/v1.1/products/getStock';
//------------------菜品模块------------------//

//------------------支付模块------------------//
// 根据微信支付单号生成微信支付信息
// export const GET_PAYMENT_INFO = baseUrl + '/shopping/api/v1.2/pay/unifiedOrder';
export const GET_PAYMENT_INFO = baseUrl + '/shopping/api/v1.1/pay/unifiedOrder';
// 订单支付完成后通知后端更新订单状态    去除！！！！！！！！！！！！！！
export const EMIT_BACKSTAGE_PAYSUCCESS = baseUrl + '/shopping/api/v1.1/pay/notifyTemp';
// 支付后接单前的退款
// export const REFUND_MONEY = baseUrl + '/shopping/api/v1.2/pay/refund';
export const REFUND_MONEY = baseUrl + '/shopping/api/v1.1/pay/refund';
// 下单后支付前的取消订单
export const CLOSE_ORDER = baseUrl + '/shopping/api/v1.1/pay/closeOrder';
//------------------支付模块------------------//

//------------------开锁模块------------------//
export const OPEN_UNLOCK = baseUrl + '/shopping/unlock/unlocking';
//------------------开锁模块------------------//

// export const recoverUrl = 'http://zhst.hrzhst.com'
//------------------回收模块------------------//
// 找回二维码
export const GET_RECPVERY_CODE = baseUrl + '/recycling/retrieveCode';
export const stockUrl = 'ws://' + window.location.host;
export const WEBSTOCKET_URL = stockUrl + '/recycling/ws/myWebSocket/';

export const GET_RECOVERY_LIST = baseUrl + '/recycling/lists';

export const CHUANGJIE = baseUrl + '/recycling/addRecoveryInfo'
//------------------开锁模块------------------//

//自选套餐//
export const GET_CANTEEN_PRODUCTSELFT_LIST = baseUrl + '/shopping/api/productSelftInfo/list';
