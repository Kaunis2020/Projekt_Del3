<template>
    <div class="container align-content-center text-center" >
       <img class="logo" alt="logo" v-bind:src="require('../assets/images/bonzi.png')">     
        <br/>
        <br/>
        <ActualTime />
        <br/>
        <HelloWorld msg="Bonzi's Luxury Food"/>
        <div class="container text-center">
            <h3>Välkommen!</h3>
            <p class="blockquote">Du är hjärtligt välkommen till Bonzi's Luxury Food.</p>
            <p class="blockquote">Du kan inhämta och se restaurangens utbud av maträtter<br/>samt söka, sortera och filtrera uppgifter avseende våra menyer.</p>
            <h3>Vår värdegrund</h3>
            <p class="blockquote">Vår värdegrund bygger på principen "Utsökt mat till ett rimligt pris".</p>
            <h3>Bordsbokning</h3>
            <p class="blockquote">På vår kontaktsida finns information om catering, take away,<br/>bordsbokning samt restaurangens öppettider.</p>
            <h3>Stöd restaurangen</h3>
            <p class="blockquote">För att stödja restaurangen Bonzi's Luxury Food<br/>kan Du lämna en donation eller ge en finansiell gåva.</p>
            <p class="blockquote">Du kan även bli sponsor och prenumerera på tidningen "Bonzi's värld": <br/>
                Livets visdom utifrån en gorillas perspektiv.</p>
            <p class="blockquote"><a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener"><b>Bli sponsor av Bonzi's Luxury Food</b></a></p>
            <br/>
            <br/>
        </div>   
    </div>
</template>

<script>
// @ is an alias to /src
    import ActualTime from '@/components/ActualTime.vue'
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'HomeView',
        components: {
            HelloWorld,
            ActualTime
        }
    }
</script>
