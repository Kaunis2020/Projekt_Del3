<template>
    <div>
        <h4>{{product.name }}</h4>
        <img :src="require('@/assets/images/' + product.photo)" />
        <p>{{product.description}}</p>
    </div>
    <br/>
</template>

<script>
    export default {
        name: 'FoodComp',
        props: {
            product: {
               type: Object,
               required:false
            }
        }    
    }

</script>

<style scoped>
    div {
        background-color: lightgreen;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        flex-basis: 150px;
        border-radius: 10px;
        border: solid black 2px;
        margin: 10px;
        padding: 20px 10px 0 10px;
    }

    p{
        margin-top:10px;
    }
    h4{
        font-weight: bolder;
    }

    div:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
</style>            
