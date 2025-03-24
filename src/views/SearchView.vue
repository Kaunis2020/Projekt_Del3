<template>
    <div class="container-sm text-center">
        <h1>Sök och filtrera maträtter</h1>
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
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                    <input type="text" id="search" name="search" ref="search" class="form-control" 
                           placeholder="Sök på valfria sökord..." aria-label="Input group example" aria-describedby="basic-addon1" @keyup.enter="searchWord">
                </div>
            </div>  
            <br/>
            <br/>
            <div class="col-md-3">
                <AutoComplete @selected="displaySelected" />
            </div>
        </div>
    </div>
    <br/>
    <p id="message"></p>
    <br/>            
    <SearchTable msg="sökresultat" :posts="posts"></SearchTable>
    <br/>
    <br/>
</template>
<script>
    import {ref} from "vue"
    import AutoComplete from '@/components/AutoComplete.vue'
    import SearchTable from '@/components/SearchTable.vue'
    export default {
        name: 'SearchView',
        components: {
            AutoComplete,
            SearchTable
        },
        setup() {
            const baseurl = "http://localhost:3000/open/";
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
                "Varmrätt",
                "Övrigt"
            ]);
            return {selected, cats, baseurl};
        },
        data() {
            return {
                posts: [],
                word: '',
                cat: '',
                msg: "Sök i rutan. Använd Enter för inmatning.",
                item: {
                    name: '',
                    photo: "default.jpg",
                    description: ''
                }
            };
        },
        methods: {
            async getData() {
                const url = "http://localhost:3000/api/allfood";
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
            async searchWord(e) {
                if (e.keyCode === 13 || e.key === "Enter") {
                    this.word = this.$refs.search.value;
                    this.$refs.search.value = "";
                    let response = await fetch(this.baseurl + "freesearch/" + this.word);
                    this.posts = await response.json();
                    if (this.posts.length === 0) {
                        this.msg = "Inga passande sökresultat har hittats.";
                    }
                }
            },
            async filterCategory($event) {
                if ($event.target.value === "Välj här:") {
                    return;
                } else if ($event.target.value === "Alla rätter") {
                    this.getData();
                    return true;
                } else {
                    this.cat = $event.target.value;
                    await fetch(this.baseurl + "/search/" + this.cat, {method: 'GET'})
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
                                if (this.posts.length === 0) {
                                    this.msg = "Inga passande sökresultat har hittats.";
                                }
                                return true;
                            })
                            .catch(error => {
                                var elem = document.getElementById("message");
                                elem.innerHTML = error;
                                return false;
                            });
                }
            },
            mouseClick: function (obj) {
                this.item = obj;
                document.getElementById("wrapper").style.display = "flex";
            },
            close() {
                document.getElementById('wrapper').style.display = "none";
            },
            async displaySelected(value) {
                if (value === "")
                    return;
                else {
                    this.word = value;
                    let response = await fetch(this.baseurl + "search/" + this.word);
                    this.posts = await response.json();
                    if (this.posts.length === 0) {
                        this.msg = "Inga passande sökresultat har hittats.";
                    }
                }
            }
        }
    }
</script>