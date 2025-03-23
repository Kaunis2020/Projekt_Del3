<template>
    <div class="container align-content-center text-center" >    
        <h1 class="green">Bonzi's Luxury Food</h1>
        <img alt="bild" v-bind:src="require('../assets/images/ostrakajen.jpg')">     
        <br/>
        <div class="container text-center">
            <br/>
            <h2>Våra öppettider</h2>
            <br/>
            <p class="blockquote">Varje dag 09.00 - 04.00</p>
            <br/>
            <h2>Vår adress</h2>
            <p class="blockquote">Östra Kajen 25, Östermalm, Stockholm</p>
            <p class="blockquote">E-postadress</p>
            <p class="blockquote email">contact@bonzis.se</p>
            <p class="blockquote">Telefonnummer</p>
            <p class="blockquote">08-951 23 82</p>
            <br/>
            <br/>
        </div>   
    </div>
</template>

<script>
    export default {
        name: 'InfoView'
    }
</script>

<style scoped>
    .green {
        text-decoration: none;
        color: hsla(160, 100%, 37%, 1);
        transition: 0.4s;
        padding: 3px;
        font-weight:bolder;
        padding-top:0;
        padding-bottom:15px;
    }
    .email{
        font-weight: bolder;
        color:blue;
        text-decoration: underline blue;
    }
</style>