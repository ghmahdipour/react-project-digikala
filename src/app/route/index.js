import ProductsList from '../screens/ProductsList'
import ProductDetails from '../screens/ProductDetails'
import ShoppingCart from '../screens/ShoppingCart'

export const childRoutes = [
  {
    'path':'/search',
    'component': ProductsList,
    'exactly': true,
  },
  {
    'path':'/product',
    'component': ProductDetails
  },
  {
    'path':'/cart',
    'component': ShoppingCart
  }
];

