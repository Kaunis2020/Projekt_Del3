<template>
    <div class="input-group-text">
        <input type="text" id="mediasearch" name="mediasearch" 
               placeholder="Sök på typ..." v-model="search" ref="search" @input="onChange"  
               @keydown.down="onArrowDown" @keydown.up="onArrowUp"  @keydown.enter="onEnter" class="form-control" />
    </div>
    <ul class="autocomplete-results" v-show="results.length > 0 && isOpen=== true">
        <li>
            <strong>Visar {{ results.length }} funna resultat</strong>
        </li>
        <li class="autocomplete-result" 
            v-for="(result, i) in results" :key="i" :class="{'is-active': i === arrowCounter}" @click="setResult(results[i].category)" >
            {{ results[i].category }}
        </li>
    </ul>
</template>

<script>
    import {ref} from "vue"

    export default {
        name: 'AutoComplete',
        emits: ["input", "selected"],
        data() {
            return {
                search: '',
                items: [],
                results: [],
                isOpen: false,
                isLoading: false,
                arrowCounter: -1
            };
        },
        mounted() {
            document.addEventListener('click', this.handleClickOutside);
        },
        unmounted() {
            document.removeEventListener('click', this.handleClickOutside);
        },
        methods: {
            async getData() {
                const url = "http://localhost:3000/open/categories/distinct";
                let response = await fetch(url);
                this.items = await response.json();
                return true;
            },
            setResult(result) {
                this.search = result;
                this.isOpen = false;
                this.$emit('selected', result);
            },
            filterResults() {
                this.results = this.items.filter(item => item.category.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
            },
            onChange() {
                this.$emit('input', this.search);
                this.filterResults();
                this.isOpen = true;
            },
            handleClickOutside(event) {
                if (!this.$el.contains(event.target)) {
                    this.isOpen = false;
                }
            },
            onArrowDown() {
                if (this.arrowCounter < this.results.length) {
                    this.arrowCounter = this.arrowCounter + 1;
                }
            },
            onArrowUp() {
                if (this.arrowCounter > 0) {
                    this.arrowCounter = this.arrowCounter - 1;
                }
            },
            onEnter() {
                this.search = this.results[this.arrowCounter];
                this.arrowCounter = -1;
                this.isOpen = false;
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .autocomplete-results {
        padding: 0;
        margin: 0;
        border: 1px solid #eeeeee;
        height: 140px;
        overflow: auto;
        width: 100%;
    }

    .autocomplete-result {
        list-style: none;
        text-align: left;
        padding: 4px 2px;
        cursor: pointer;
    }

    .autocomplete-result.is-active,
    .autocomplete-result:hover {
        background-color: #0d6efd;
        color: white;
    }
</style>
