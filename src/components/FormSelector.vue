<template>
    <div class="text-center">
        <form>
            <fieldset class="fieldset"> 
                <legend>Typ av service:</legend><br>
                <input type="radio" required value="Bord" v-model="servicetype" name="servicetype" v-on:change="onChange($event)">  <span> Ett bord  | </span>
                <input type="radio" required value="Catering" v-model="servicetype" name="servicetype" v-on:change="onChange($event)"> <span> Catering  | </span>
                <input type="radio" required value="Take-away" v-model="servicetype" name="servicetype" v-on:change="onChange($event)"> <span> Take-away  | </span>
            </fieldset>
        </form>
        <br/>
        <br/>
    </div>
</template>

<script>
    export default {
        name: 'FormSelector',
        data() {
            return{
                servicetype: ''
            };
        },
        methods: {
            onChange(event) {
                if (this.servicetype === "Catering")
                {
                    this.$router.push({name: 'catering', params: {type: 'Catering'}});
                } else if (this.servicetype === "Bord")
                {
                    this.$router.push({name: 'table', params: {type: 'Ett bord'}});
                } else if (this.servicetype === "Take-away")
                {
                    this.$router.push({name: 'guest', params: {type: 'Take-away'}});
                }
            }
        }
    }
</script>
<style scoped>
    span{
        padding-left:5px;
        padding-right:15px;
    }   
    .fieldset{
        border-color:green;
        border:2px solid;
        width:30%;
        padding-bottom:10px;
        margin:auto;
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
