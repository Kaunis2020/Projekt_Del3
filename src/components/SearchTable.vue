<template>
    <div id="wrapper">  
        <FoodComp :product="item"> </FoodComp> 
        <br/>
        <span class="myclose" @click="close();">&times;</span>  
    </div> 
    <p>Nedan presenteras Dina {{msg}}: </p>  
    <br/>
    <table v-if="posts.length>0" id="showtable" class="table table-hover">
        <thead>
            <tr><th>Nr</th><th>Namn</th><th>Kategori</th><th>Typ</th><th>Pris, SEK</th><th>Innehåll</th></tr>
        </thead>
        <tbody>
            <tr v-for="post in paginated" v-bind:key="post" @click="onClick(post)"> 
                <td>{{ post.id }}</td>
                <td class="foodname">{{ post.name }}</td>
                <td>{{ post.category }}</td>
                <td>{{ post.type }}</td>
                <td>{{ post.price }}</td>
                <td>{{ post.ingredients }}</td>
            </tr>
        </tbody>
    </table>
    <p v-else>
        Inga {{msg}} finns att visa
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
    <br/> 
</template>

<script>
    import FoodComp from '@/components/FoodComp.vue'

    export default {
        name: 'SearchTable',
        components: {
            FoodComp
        },
        props: {
            msg: {
                type: String,
                required: true
            },
            posts: {
                type: Array,
                required: true
            }
        },
        data() {
            return{
                current: 1,
                pageSize: 5,
                item: {
                    name: '',
                    photo: "default.jpg",
                    description: ''
                }
            };
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
            }
        },
        methods: {
            onClick(obj) {
                this.item = obj;
                document.getElementById("wrapper").style.display = "flex";
            },
            close() {
                document.getElementById('wrapper').style.display = "none";
            },
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
            }
        }
    }
</script>

<style scoped>
    .foodname{
        text-wrap: wrap;
        width:20%;
        padding: 5px 20px;
    }
    #wrapper {
        display: none;
        flex-wrap: wrap;
        width: 60%;
        height:auto;
        margin:auto;
        padding:30px;
    }
    #wrapper img {
        display: block;
        margin: auto;
        width: 100%;
        margin-bottom:20px;
    }

    /* The Close Button */
    span.myclose {
        position: relative;
        top:0;
        right:0;
        margin-top:-30px;
        color: #000000;
        font-size: 50px;
        font-weight: bolder;
        transition: 0.3s;
    }

    .myclose:hover,
    .myclose:focus {
        color: #000000;
        text-decoration: none;
        cursor: pointer;
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
</style>

