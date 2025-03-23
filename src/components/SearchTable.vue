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
            <tr v-for="post in posts" v-bind:key="post" @click="onClick(post)"> 
                <td>{{ post.id }}</td>
                <td>{{ post.name }}</td>
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
                item: {
                    name: '',
                    photo: "default.jpg",
                    description: ''
                }
            };
        },
        methods: {
            onClick(obj) {
                this.item = obj;
                document.getElementById("wrapper").style.display = "flex";
            },
            close() {
                document.getElementById('wrapper').style.display = "none";
            }
        }
    }
</script>

<style scoped>
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
</style>

