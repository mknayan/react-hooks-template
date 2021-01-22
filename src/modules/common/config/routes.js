import Home from '../pages/home';
import Products from '../pages/products';
import ProductsDetails from '../pages/productDetails';

export default [
    //route props
    { path: '', component: Home },
    { path: 'products', component: Products },
    { path: 'products/:slug', component: ProductsDetails }
]