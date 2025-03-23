<template>
    <div class="text-center">
        <h1>Dina beställds maträtter</h1>
        <h3>Beställare: {{orderer}} </h3>
        <h3>Beställning: {{servicetype}} </h3>
        <h3>Att betala: {{ordertotal}} SEK</h3>
        <p>Du kan kontrollera och redigera antalet beställda maträtter.</p>
        <p>Klicka på knappen SKICKA för att skicka beställningen till restaurangen.</p>
        <br/>
        <button class="btn btn-success" type="button" @click="sendOrder"> <b>SKICKA</b> </button>
        <br/>
        <p ref="message" id="message"></p>
        <br/>
        <table v-if="ordereditems.length>0" id="ordertable" class="table table-hover">
            <thead>
                <tr><th>Nr</th><th>Namn</th><th>Kategori</th><th>Typ</th><th>Pris, SEK</th><th>Antal</th><th>Kostnad</th></tr>
            </thead>
            <tbody>
                <tr v-for="(post, index) in ordereditems" v-bind:key="post"> 
                    <td>{{ index+1 }}</td>
                    <td>{{ post.name }}</td>
                    <td>{{ post.category }}</td>
                    <td>{{ post.type }}</td>
                    <td>{{ post.price }}</td>
                    <td><input v-on:input="sendChanges($event, post)" v-bind:value="post.quantity" type="number" min="1" max="100" step="1" /></td>
                    <td><input v-model="post.subtotal" type="number" readonly="readonly" /></td>
                </tr>
            </tbody>
        </table>
    </div>
    <br/>
</template>

<script>
    export default {
        name: 'ShoppingCart',
        data() {
            return {
                ordereditems: [],
                orderdate: this.today(),
                order_total: 0,
                orderid: 0
            };
        },
        computed: {
            orderer()
            {
                return this.$store.getters.fullName;
            },
            servicetype() {
                return this.$store.getters.servicetype;
            },
            ordertotal()
            {
                this.order_total = this.ordereditems.reduce((a, b) => a + Number(b.subtotal), 0);
                return this.order_total;
            }
        },
        created() {
            this.getFood();
        },
        methods: {
            today() {
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                this.orderdate = today.toLocaleDateString();
                return this.orderdate;
            },
            getFood()
            {
                this.ordereditems = this.$store.getters.allfood;
            },
            sendChanges($event, item) {
                if ($event.target.value > 0) {
                    item.quantity = $event.target.value;
                    item.subtotal = item.quantity * item.price;
                } else {
                    item.quantity = 1;
                    $event.target.value = item.quantity;
                }
            },
            sendOrder() {
                this.$store.commit('addOrderDate', this.orderdate);
                this.$store.commit('addOrderTotal', this.order_total);
                let customerid = this.$store.getters.customerid;
                let visitdate = this.$store.getters.visitdate;
                let servicetype = this.$store.getters.servicetype;
                let tabletype = this.$store.getters.tabletype;
                let address = this.$store.getters.address;
                let persons = this.$store.getters.persons;

                const formdata = {
                    customer_id: customerid,
                    visitdate: visitdate,
                    servicetype: servicetype,
                    tabletype: tabletype,
                    address: address,
                    persons: persons,
                    orderdate: this.orderdate,
                    ordertotal: this.order_total
                };
                this.postForm(formdata);
            },
            async postForm(formdata) {
                const url = "http://localhost:3000/open/order";
                // Make a POST request using the Fetch API
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formdata)
                })
                        .then(response => {
                            if (!response.ok)
                            {
                                throw new Error(response.message);
                                return false;
                            }
                            return response.json();
                        })
                        .then(data => {
                            this.orderid = data;
                            for (let item of this.ordereditems) {
                                item.order_id = this.orderid;
                            }
                            this.$store.commit('addFood', this.ordereditems);
                            this.$store.commit('addOrder_id', this.orderid);
                            this.$router.push({path: '/summary', replace: true});
                            return true;
                        })
                        .catch(error => {
                            this.$refs.message.innerHTML = error;
                            return false;
                        });
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-weight: 500;
        font-size: 2.6rem;
        position: relative;
        top: -10px;
    }

    h3 {
        font-size: 1.2rem;
    }

    .greetings h1,
    .greetings h3 {
        text-align: center;
    }

    .green {
        text-decoration: none;
        color: hsla(160, 100%, 37%, 1);
        transition: 0.4s;
        padding: 3px;
        font-weight:bolder;
    }

    @media (min-width: 1024px) {
        .greetings h1,
        .greetings h3 {
            text-align: center;
        }
    }
</style>
