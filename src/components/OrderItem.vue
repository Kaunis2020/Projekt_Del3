<template>
    <h1>Välj maträtter</h1>
    <h3>Beställare: {{orderer}} </h3>
    <p v-show="servicetype==='Catering'">Vid catering är minsta beställning för fem personer</p>
    <p ref="message" id="message"></p>
    <br/>
    <p>För att lägga till vald maträtt klicka på varukorgen.</p>
    <p>När Du är klar, klicka på knappen KLAR.</p>
    <br/>
    <button type="button" class="btn btn-success" @click="showSummary()"> <b>KLAR</b> </button>
    <br/>
    <br/>
    <table v-if="posts.length>0" id="ordertable" class="table table-hover">
        <thead>
            <tr><th>Nr</th><th>Namn</th><th>Kategori</th><th>Typ</th><th>Pris, SEK</th><th>Order</th></tr>
        </thead>
        <tbody>
            <tr v-for="(post, index) in paginated" v-bind:key="post"> 
                <td>{{ index+1 }}</td>
                <td>{{ post.name }}</td>
                <td>{{ post.category }}</td>
                <td>{{ post.type }}</td>
                <td>{{ post.price }}</td>
                <td @click="addFood(post, index)" class="push"><i class="fa-solid fa-basket-shopping" style='font-size:40px;color:red'></i></td>           
            </tr>
        </tbody>
    </table>
    <p v-else>
        Inga maträtter finns att visa
    </p>
    <br/>
    <div class="d-flex justify-content-center">
        <div class="d-flex justify-content-center">
            <nav aria-label="...">
                <ul class="pagination" role="button">
                    <li class="page-item" :class="{'disabled': current === 1}">
                        <a class="page-link pe-auto" @click="prev()">Previous</a>
                    </li>
                    <li v-for="page in pagesTotal" :key="page" @click="goToPage(page)" class="page-item" 
                        :class="{'active': page === current}"><a class="page-link">{{page}}</a></li>
                    <li class="page-item" :class="{'disabled': current === pagesTotal}">
                        <a class="page-link" @click="next()" v-bind:class="{'disabled': current === pagesTotal}">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <br/>
</template>

<script>
    export default {
        name: 'OrderItem',
        data() {
            return{
                current: 1,
                pageSize: 10,
                posts: [],
                quantity: 1,
                ordered: []
            };
        },
        created() {
            this.getData();
        },
        computed: {
            indexStart() {
                return (this.current - 1) * this.pageSize;
            },
            indexEnd() {
                return this.indexStart + this.pageSize;
            },
            pagesTotal() {
                return Math.ceil(this.posts.length / this.pageSize);
            },
            paginated() {
                return this.posts.slice(this.indexStart, this.indexEnd);
            },
            orderer()
            {
                return this.$store.getters.fullName;
            },
            servicetype() {
                return this.$store.getters.servicetype;
            }
        },
        methods: {
            prev() {
                if (this.current !== 1)
                    this.current--;
            },
            next() {
                if (this.current !== this.pagesTotal) {
                    this.current++;
                }
            },
            goToPage(numPage) {
                this.current = numPage;
            },
            async getData() {
                const url = "http://localhost:3000/open/order/";
                await fetch(url, {method: 'GET'})
                        .then(response => {
                            if (!response.ok)
                            {
                                throw new Error(response.message);
                                return false;
                            }
                            return response.json();
                        })
                        .then(data => {
                            this.posts = data;
                            return true;
                        })
                        .catch(error => {
                            var elem = document.getElementById("message");
                            elem.innerHTML = error;
                            return false;
                        });
            },
            addFood(item, index) {
                let customer_id = this.$store.getters.customerid;
                let itemcost = item.price * this.quantity;
                let ordereditem = {
                    order_id: 0,
                    customer_id: customer_id,
                    name: item.name,
                    category: item.category,
                    type: item.type,
                    price: item.price,
                    quantity: this.quantity,
                    subtotal: itemcost
                };
                this.ordered.push(ordereditem);
                var buttons = document.getElementsByClassName("push");
                buttons[index].style.backgroundColor = "lime";

            },
            showSummary() {
                if (this.ordered.length > 0)
                {
                    this.$store.commit('addFood', this.ordered);
                    this.$router.push({path: '/cart', replace: true});
                } else {
                    this.$refs.message.innerHTML = "Du har inte valt någon mat!";
                    return;
                }
            }
        }
    }
</script>

<style scoped>
    .push:hover, .push:focus{
        background-color:lime;
    }

    .pagination > li > a,
    .pagination > li > span {
        color: green;
        font-weight: bolder;
    }

    .pagination > .active > a,
    .pagination > .active > a:focus,
    .pagination > .active > a:hover,
    .pagination > .active > span,
    .pagination > .active > span:focus,
    .pagination > .active > span:hover {
        background-color: green;
        border-color: green;
        color:white;
        font-weight: bolder;
    }

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
