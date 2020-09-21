import Vue from 'vue'
import Router from 'vue-router'
import { version } from '@/unit/Version'

const Address = r => {
  import('@/page/Address/Address').then(module => {
    r(module)
  })
}
const NewAddress = r => {
  import('@/page/NewAddress/NewAddress').then(module => {
    r(module)
  })
}
const ConfirmOrder = r => {
  import('@/page/ConfirmOrder/ConfirmOrder').then(module => {
    r(module)
  })
}
const ChangeAddress = r => {
  import('@/page/ChangeAddress/ChangeAddress').then(module => {
    r(module)
  })
}
const OrderList = r => {
  import('@/page/OrderList/OrderList').then(module => {
    r(module)
  })
}
const ChangePsw = r => {
  import('@/page/ChangePsw/ChangePsw').then(module => {
    r(module)
  })
}
const OpenBox = r => {
  import('@/page/OpenBox/OpenBox').then(module => {
    r(module)
  })
}
const OrderDetail = r => {
  import('@/page/OrderDetail/OrderDetail').then(module => {
    r(module)
  })
}
const Payment = r => {
  import('@/page/Payment/Payment').then(module => {
    r(module)
  })
}
const PaySuccess = r => {
  import('@/page/PaySuccess/PaySuccess').then(module => {
    r(module)
  })
}
const LawlessOpen = r => {
  import('@/page/LawlessOpen/LawlessOpen').then(module => {
    r(module)
  })
}
const Login = r => {
  import('@/page/Login/Login').then(module => {
    r(module)
  })
}
const Main = r => {
  import('@/page/Main/Main').then(module => {
    r(module)
  })
}
const Home = r => {
  import('@/page/Home/Home').then(module => {
    r(module)
  })
}
const User = r => {
  import('@/page/User/User').then(module => {
    r(module)
  })
}
const Product = r => {
  import('@/page/Product/Product').then(module => {
    r(module)
  })
}
const OrderTypeList = r => {
  import('@/page/OrderTypeList/OrderTypeList').then(module => {
    r(module)
  })
}
const ShopCar = r => {
  import('@/page/ShopCar/ShopCar').then(module => {
    r(module)
  })
}
const BlackUser = r => {
  import('@/page/BlackUser/BlackUser').then(module => {
    r(module)
  })
}
const ClearStore = r => {
  import('@/page/ClearStore').then(module => {
    r(module)
  })
}
const Evaluate = r => {
  import('@/page/Evaluate/Evaluate').then(module => {
    r(module)
  })
}
const TimeLook = r => {
  import('@/page/TimeLook/TimeLook').then(module => {
    r(module)
  })
}
const UserInfo = r => {
  import('@/page/UserInfo/UserInfo').then(module => {
    r(module)
  })
}
const Recovery = r => {
  import('@/page/Recovery/Recovery').then(module => {
    r(module)
  })
}
const RecoveryList = r => {
  import('@/page/RecoveryList/RecoveryList').then(module => {
    r(module)
  })
}
const UserHandleBook = r => {
  import('@/page/UserHandleBook/HandleBook').then(module => {
    r(module)
  })
}
const FetchHandleBook = r => {
  import('@/page/UserHandleBook/components/FetchHandleBook').then(module => {
    r(module)
  })
}
const Productselft = r => {
  import('@/page/Productselft/Productselft').then(module => {
    r(module)
  })
}
const ProductselftPay = r => {
  import('@/page/ProductselftPay/ProductselftPay').then(module => {
    r(module)
  })
}
//OrderHandleBook 下单教程路由
const OrderHandleBook = r => {
  import('@/page/UserHandleBook/components/OrderHandleBook').then(module => {
    r(module)
  })
}





import { GetToken } from '../unit/DealFun'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/business', redirect: '/main/home' },
    { path: '/address', name: 'Address', component: Address },
    { path: '/newaddress', name: 'NewAddress', component: NewAddress },
    { path: '/orderdetail/:orderid/:state?', name: 'OrderDetail', component: OrderDetail },
    { path: '/changeaddress/:id', name: 'ChangeAddress', component: ChangeAddress },
    { path: '/changepsw', name: 'ChangePsw', component: ChangePsw },
    { path: '/paysuccess', name: 'PaySuccess', component: PaySuccess },
    { path: '/openbox/:boxid', name: 'OpenBox', component: OpenBox },
    { path: '/payment/:orderid/:money/:time', name: 'Payment', component: Payment },
    { path: '/confirmorder/:id', name: 'ConfirmOrder', component: ConfirmOrder },
    { path: '/lawlessopen', name: 'LawlessOpen', component: LawlessOpen },
    { path: '/', name: 'Login', component: Login },
    { path: '/main', name: 'Main', component: Main, children: [
      { path: 'home', name: 'Home', component: Home },
      { path: 'user', name: 'User', component: User },
      { path: 'shopcar', name: 'ShopCar', component: ShopCar },
      { path: 'orderlist', name: 'OrderList', component: OrderList },
    ] },
    { path: '/product/:canteenid', name: 'Product', component: Product },
    { path: '/productselft/', name: 'Productselft', component: Productselft },//自选套餐路由
    { path: '/productselftPay/', name: 'ProductselftPay', component: ProductselftPay },//自选套餐路由
    { path: '/ordertypelist/:state', name: 'OrderTypeList', component: OrderTypeList },
    { path: '/recovery/:id', name: 'Recovery', component: Recovery },
    { path: '/recoverylist', name: 'RecoveryList', component: RecoveryList },
    { path: '/evaluate/:orderid', name: 'Evaluate', component: Evaluate },
    { path: '/blackuser', name: 'BlackUser', component: BlackUser },
    { path: '/clearstore', name: 'ClearStore', component: ClearStore },
    { path: '/timelook', name: 'TimeLook', component: TimeLook },
    { path: '/userinfo', name: 'UserInfo', component: UserInfo },
    { path: '/UserHandleBook', name: 'UserHandleBook', component: UserHandleBook },
    { path: '/FetchHandleBook', name: 'FetchHandleBook', component: FetchHandleBook },
    { path: '/OrderHandleBook', name: 'OrderHandleBook', component: OrderHandleBook },//下单教程路由
  ]
})

router.beforeEach((to, from, next) => {
  // 路由跳转验证各种情况防止恶意打开连接
  // var ua = navigator.userAgent.toLowerCase();
  // if(ua.match(/MicroMessenger/i)=="micromessenger") {

  // } else {
  //   alert("请使用置浏览器")
  //   return;
  // }

  if(to.fullPath == '/blackuser') {
    next();
    return;
  }
  if(to.fullPath == '/clearstore') {
    next();
    return;
  }
  if(to.fullPath == '/lawlessopen') {
    next();
    return;
  }
  if (GetToken() == 1) {
    next('/lawlessopen');
    return;
  }
  // let Check = ['Home', 'Product', 'Login']
  // if(Check.indexOf(to.name) == -1) {
  //   if(!localStorage.getItem(version)){
  //     next('/')
  //     return;
  //   }
  // }
  next()

})

export default router
