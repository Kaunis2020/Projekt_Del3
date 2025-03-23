import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            user: {},
            customer_id: 0,
            orderedfood: [],
            orderdate: '',
            ordertotal: 0,
            order_id: 0
        };
    },
    getters: {
        allfood(state) {
            return state.orderedfood;
        },
        user(state) {
            // state variable contains our state data
            return state.user;
        },
        customerid(state) {
            return state.customer_id;
        },
        orderid(state) {
            return state.order_id;
        },
        visitdate(state) {
            return state.user.visitdate;
        },
        persons(state) {
            return state.user.persons;
        },
        address(state) {
            return state.user.address;
        },
        fullName(state) {
            return state.user.fname + " " + state.user.lname;
        },
        servicetype(state) {
            return state.user.servicetype;
        },
        tabletype(state) {
            return state.user.tabletype;
        },
        orderdate(state) {
            return state.orderdate;
        },
        ordertotal(state) {
            return state.ordertotal;
        }
    },
    mutations: {
        addUser(state, newUser) {
            if (typeof newUser.fname === 'string' && typeof newUser.lname === 'string' && typeof newUser.email === 'string')
            {
                state.user = newUser;
            }
        },
        addCustomer_id(state, _id) {
            state.customer_id = _id;
        },
        addOrder_id(state, _id) {
            state.order_id = _id;
        },
        addOrderDate(state, ordate)
        {
            state.orderdate = ordate;
        },
        addOrderTotal(state, ordtot)
        {
            state.ordertotal = ordtot;
        },
        addFood(state, food) {
            state.orderedfood = food;
        },
        loadStore() {
            if (localStorage.getItem('store')) {
                try {
                    this.replaceState(JSON.parse(localStorage.getItem('store')));
                } catch (e) {
                    console.log('Could not initialize store', e);
                }
            }
        },
        clearStorage() {
            localStorage.clear();
        }
    },
    actions: {

    },
    modules: {

    }
})
