// 菜品详细页面点击左侧类别，右侧菜品列表跳到对应的类别位置
// emit:page/Product/components/LeftType
// on:page/Product/components/ProductList
export const GoToBscroll = 'GoToBscroll'

// 菜品详细页面点击菜品的+打开规格选择组件
// emit:page/Product/components/ProductList
// on:page/Product/components/SpecsContainer
export const OpenSpecsContainer = 'OpenSpecsContainer'

// 确认订单页面点击选择收货地址，路由跳转至收货地址页面，点击地址后返回确认订单页面并通知页面地址已选择并返回选择地址
// emit:page/Address
// on:page/ConfirmOrder/components/ConfirmBottom
//    page/ConfirmOrder/components/ChooseAddress
export const ChooseAddress = 'ChooseAddress';

// 发送全局通知，在点击购物车确认订单按钮后让确认订单页面重置地址选择信息
// emit:page/Login
// on:page/ConfirmOrder/components/ConfirmBottom
//    page/ConfirmOrder/components/ChooseAddress
export const ResetAddress = 'ResetAddress';

// 通知订单列表页面进行重新请求接口刷新订单列表
// emit:page/ConfirmOrder/components/ConfirmBottom   --提交订单后刷新订单列表
//      page/Payment/components/PayBottom   --支付成功后刷新订单列表
//      page/OrderList/components/OrderButtom   --退款成功后刷新订单列表
//      page/OpenBox/compontens/ToolBar   --开箱成功后刷新订单列表
// on:page/OrderList/OrderList
export const RefreshOrderList = 'RefreshOrderList';

// 订单列表页面点击顶部列表置顶
// emit:page/OrderList/componets/HeadBar
// on:page/OrderList/componets/List
export const BscrollToTop = 'BscrollToTop';

// 菜品页面打开图片浏览
// emit:page/Product/componets/ProductList
// on:page/Product/Product
export const OpenImgLook = 'OpenImgLook';

//自选套餐，右侧菜品列表跳到对应的类别位置
export const skip = "skip"

// 自选菜品详细页面点击菜品的+打开规格选择组件
// emit:page/ProducSelft/components/ProductList
// on:page/ProducSelft/components/SpecsContainer
export const OpenSelftSpecs ='OpenSelftSpecs'

// 刷新归还列表
export const RefreshRecovery = 'RefreshRecovery';
