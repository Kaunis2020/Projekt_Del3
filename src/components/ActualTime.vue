<template>
    <div class="hello">
        <h1 v-if="hours >=0 && hours < 5">God Natt!</h1>
        <h1 v-if="hours >=5 && hours < 12">God Morgon!</h1>
        <h1 v-if="hours >= 12 && hours < 17">God Dag!</h1>
        <h1 v-if="hours >= 17 && hours <= 23">God Kväll!</h1>
    </div>
</template>
<script>
    export default {
        name: 'ActualTime',
        data() {
            return {
                hours: new Date().getHours()
            };
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        margin: 5px 0 0;
        color:red;
        font-style: italic;
        font-weight: bolder;
        font-family: "Brush Script MT";
        font-size: 50px;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
