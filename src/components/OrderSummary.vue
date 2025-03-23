<template>
    <div class="text-center">
        <h1>Sammanfattning</h1>
        <p>Vi bekräftar härmed att vi har tagit emot Din beställning på följande maträtter:</p>
        <p ref="message" class="h4 text-danger"></p>
        <br/>
        <p>Beställningen nummer: {{order_id }}</p>
        <p>Datum för beställningen: {{orderdate }}</p>
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
                    <td>{{ post.quantity }}</td>
                    <td>{{ post.subtotal }}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <p><b>Order totalt: {{order_total}} SEK</b></p>
        <br/>
    </div>
    <br/>
    <p class="h4 text-danger">Vi tackar Dig för visat förtroende!</p>
    <br/>
</template>

<script>
    export default {
        name: 'OrderSummary',
        data() {
            return {
                ordereditems: [],
                orderdate: '',
                order_total: 0,
                order_id: 0
            };
        },
        created() {
            this.getFood();
            this.getOrderInfo();
        },
        methods: {
            getFood()
            {
                this.ordereditems = this.$store.getters.allfood;
            },
            getOrderInfo() {
                this.orderdate = this.$store.getters.orderdate;
                this.order_total = this.$store.getters.ordertotal;
                this.order_id = this.$store.getters.orderid;
                const formdata = {
                    values: this.ordereditems
                };
                this.postData(formdata);
            },
            async postData(formdata) {
                const url = "http://localhost:3000/open/orderitems";
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
                            this.$refs.message.innerHTML = data.message;
                            this.$store.commit('clearStorage');
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
