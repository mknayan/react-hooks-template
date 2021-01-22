import MyAccount from '../pages/myaccount';

export default [
    //route props
    // ProtectedRoute(MyAccount, { path: '/' }),
    { path: '/', component: MyAccount, isProtected: true },
    { path: '/orders', component: MyAccount, isProtected: true }
]