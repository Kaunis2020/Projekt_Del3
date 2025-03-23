<template>
    <h1>Beställ bord och maträtter</h1>
    <p id="message"></p>  
    <br/>
    <p>På denna sida kan Du göra bordsbokning, beställning av catering samt take-away.</p>
    <p>Take-away innebär att maten tas med sig.<br/>Take-away kan beställas för en eller flera personer.</p>
    <p>Catering innebär att maten beställs i förväg för sådana högtider,<br/> såsom bröllop, födelsedag, barndop, studentfirande, julbord m.m.<br/>
        Minsta beställning för catering är maten för fem eller flera personer.<br/>
        Gratis hemkörning av beställda maträtter till kundens adress.<br/>
    </p>
    <h3>Beställ här:</h3>
    <FormSelector />
    <br/>    
    <br/>
</template>

<script>
    import FormSelector from '@/components/FormSelector.vue'
    export default {
        name: 'OrderTable',
        components: {
            FormSelector
        }
    }
</script>

<style scoped>

</style>

