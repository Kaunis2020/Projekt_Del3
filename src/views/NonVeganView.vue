<template>
    <div class="container-sm text-center">
        <h1>Icke-vegansk mat</h1>
        <p id="message"></p>
        <br/>
        <div class="row text-center justify-content-center">
            <h6 class="text-center"><b>Kategori</b></h6>
            <div class="col-md-3">
                <select class="form-select" v-model="selected" id="selected" @change="filterCategory($event)">
                    <option v-for="cat in cats" :value="cat" v-bind:key="cat">{{ cat }}</option>
                </select>
            </div>               
        </div>
        <br/>
        <div class="row text-center justify-content-center">
            <div class="col-2">
                <select v-model="optselected" class="form-select" id="pricefilter" name="pricefilter" @change="filterPrice($event)">
                    <option v-for="option in options" :value="option.value" v-bind:key="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <br/>
        </div>
        <br/>
        <br/>
        <FoodTable msg="icke-veganska maträtter"  negmsg="Inga maträtter finns att visa"  :posts="posts"></FoodTable>      
        <br/>
    </div>
    <br/>
    <br/>
    <br/>
</template>

<script>
    import {ref} from "vue"
    import FoodTable from '@/components/FoodTable.vue'
    export default {
        name: 'NonVeganView',
        components: {
            FoodTable
        },
        setup() {
            const selected = ref("Välj här:");
            const cats = ref([
                "Välj här:",
                "Alla rätter",
                "Bakverk",
                "Dessert",
                "Förrätt",
                "Glass",
                "Sallad",
                "Smoothie",
                "Smörgås",
                "Soppa",
                "Varmrätt"
            ]);
            const optselected = ref('');
            const options = ref([
                {text: "Filtrera priset", value: ''},
                {text: 'Högst 10 kr', value: 10},
                {text: 'Högst 20 kr', value: 20},
                {text: 'Högst 30 kr', value: 30},
                {text: 'Högst 40 kr', value: 40},
                {text: 'Högst 50 kr', value: 50},
                {text: 'Högst 60 kr', value: 60}
            ]);
            return {selected, cats, optselected, options};
        },
        created() {
            this.getData();
        },
        data() {
            return {
                cat: '',
                posts: []
            };
        },
        methods: {
            async getData() {
                const url = "http://localhost:3000/api/nonvegan";
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
            async filterCategory($event) {
                const url = "http://localhost:3000/open/nonvegan/";
                if ($event.target.value === "Välj här:") {
                    return;
                } else if ($event.target.value === "Alla rätter") {
                    this.getData();
                } else {
                    this.cat = $event.target.value;
                    await fetch(url + this.cat, {method: 'GET'})
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
                }
            },
            async filterPrice($event) {
                if ($event.target.value === '')
                    return;
                else
                {
                    let price = $event.target.value;
                    if (!isNaN(price)) {
                        const url = "http://localhost:3000/open/nonvegan/price/";
                        await fetch(url + price, {method: 'GET'})
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
                    }
                }
            }
        }
    }
</script>