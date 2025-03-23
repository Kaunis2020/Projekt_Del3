import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NonVeganView from '../views/NonVeganView.vue'
import VeganView from '../views/VeganView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import ColdDrinkView from '../views/ColdDrinkView.vue'
import HotDrinkView from '../views/HotDrinkView.vue'
import SearchView from '../views/SearchView.vue'
import ContactView from '../views/ContactView.vue'
import OrderView from '../views/OrderView.vue'
import ShoppingCart from "../components/ShoppingCart";
import CateringOrder from "../components/CateringOrder";
import GuestOrder from "../components/GuestOrder";
import TableOrder from "../components/TableOrder";
import OrderItem from "../components/OrderItem";
import OrderSummary from "../components/OrderSummary";
import ReadFeedback from "../views/ReadFeedback";
import WriteFeedback from "../views/WriteFeedback";
import InfoView from "../views/InfoView";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/emp',
        name: 'emp',
        component: EmployeeView
    },
    {
        path: '/nonvegan',
        name: 'nonvegan',
        component: NonVeganView
    },
    {
        path: '/vegan',
        name: 'vegan',
        component: VeganView
    },
    {
        path: '/cold',
        name: 'cold',
        component: ColdDrinkView
    },
    {
        path: '/hot',
        name: 'hot',
        component: HotDrinkView
    },
    {
        path: '/search',
        name: 'search',
        component: SearchView
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactView
    },
    {
        path: '/order',
        name: 'order',
        component: OrderView
    },
    {
        path: '/cart',
        name: 'cart',
        component: ShoppingCart
    },
    {
        path: '/catering/:type',
        name: 'catering',
        params: true,
        component: CateringOrder
    },
    {
        path: '/guest/:type',
        name: 'guest',
        params: true,
        component: GuestOrder
    },
    {
        path: '/table/:type',
        name: 'table',
        params: true,
        component: TableOrder
    },
    {
        path: '/orderitem',
        name: 'orderitem',
        component: OrderItem
    },
    {
        path: '/summary',
        name: 'summary',
        component: OrderSummary
    },
    {
        path: '/read',
        name: 'read',
        component: ReadFeedback
    },
    {
        path: '/write',
        name: 'write',
        component: WriteFeedback
    },
     {
        path: '/info',
        name: 'info',
        component: InfoView
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
