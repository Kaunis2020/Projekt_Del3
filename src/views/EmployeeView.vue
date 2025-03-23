<template>
    <div class="container-sm text-center">
        <h1>Våra medarbetare</h1>
        <br/>
        <p id="message"></p>
        <div id="info"></div>
        <br/>
        <p>Tack vare våra duktiga medarbetare har vår restaurang erhållit tre Michelin stjärnor under det gångna året.</p>
        <img v-bind:src="require('../assets/images/stars.png')" alt="stars" /><br/>
        <br/>
        <p>Nedan presenteras våra trevliga medarbetare.</p>   
        <br/>
        <table v-if="posts.length>0" id="showtable">
            <thead>
                <tr><th class="pe-auto" role="button" @click="sortId()">Nr &nbsp; <i class="fa fa-sort-numeric-asc" aria-hidden="true"></i></th>
                    <th>Foto</th>
                    <th @click="sortFirstName()" class="pe-auto" role="button">Förnamn &nbsp; <i class="fa fa-sort-alpha-asc" aria-hidden="true"></i></th>
                    <th @click="sortLastName()" class="pe-auto" role="button">Efternamn &nbsp; <i class="fa fa-sort-alpha-asc" aria-hidden="true"></i></th>
                    <th @click="sortPosition()" class="pe-auto" role="button">Befattning &nbsp; <i class="fa fa-sort-alpha-asc" aria-hidden="true"></i></th>
                    <th>Telefon</th><th>E-post</th><th>Månadslön</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="post in paginated" v-bind:key="post"> 
                    <td>{{ post.id }}</td>
                    <td><img v-bind:src="require('@/assets/images/' + post.photo)" @mouseover="change(post)" 
                             @click="enlarge(post)" @mouseout="reset(post)" :id="'img' + post.id"></td>
                    <td>{{ post.fname }}</td> 
                    <td>{{ post.lname }}</td>
                    <td>{{ post.position }}</td>
                    <td>{{ post.jobphone }}</td>
                    <td class="email">{{ post.jobmail }}</td>
                    <td>{{ currency(post.salary) }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>
            Inga anställda finns att visa
        </p>         
    </div>
    <br/>
    <br/>
    <div class="d-flex justify-content-center">
        <div class="d-flex justify-content-center">
            <nav aria-label="...">
                <ul class="pagination" role="button">
                    <li class="page-item" :class="{'disabled': current === 1}">
                        <a class="page-link pe-auto" @click="prev()">Previous</a>
                    </li>
                    <li v-for="page in pagesTotal" :key="page" @click="goToPage(page)" class="page-item" 
                        :class="{'active': page === current}"><a class="page-link">{{page}}</a></li>
                    <li class="page-item" :class="{'disabled': current === pagesTotal}">
                        <a class="page-link" @click="next()" v-bind:class="{'disabled': current === pagesTotal}">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <br/>
    <br/> 
</template>
<script>
    export default {
        name: 'EmployeeView',

        created() {
            this.getData();
        },
        data() {
            return {
                current: 1,
                pageSize: 3,
                posts: []
            };
        },
        computed: {
            indexStart() {
                return (this.current - 1) * this.pageSize;
            },
            indexEnd() {
                return this.indexStart + this.pageSize;
            },
            pagesTotal() {
                return Math.ceil(this.posts.length / this.pageSize);
            },
            paginated() {
                return this.posts.slice(this.indexStart, this.indexEnd);
            }
        },
        methods: {
            // Skriver ut SEK samt mellanrum 30 000;
            currency(value) {
                return new Intl.NumberFormat('sv-SE', {
                    style: 'currency',
                    currency: 'SEK',
                    minimumFractionDigits: 2
                }).format(value);
            },
            async getData() {
                const url = "http://localhost:3000/api/employees";
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
            prev() {
                if (this.current !== 1)
                    this.current--;
            },
            next() {
                if (this.current !== this.pagesTotal) {
                    this.current++;
                }
            },
            goToPage(numPage) {
                this.current = numPage;
            },
            change(empl) {
                var img = document.getElementById("img" + empl.id);
                var info = document.getElementById("info");
                info.innerHTML = empl.info;
                img.style.cursor = "-webkit-zoom-in";
                img.style.cursor = "zoom-in";
                info.style.display = "inline-block";
            },
            enlarge(empl) {
                var img = document.getElementById("img" + empl.id);
                img.style.transform = "scale(1.5)";
                img.style.cursor = "-webkit-zoom-out";
                img.style.cursor = "zoom-out";
            },
            reset(empl) {
                var img = document.getElementById("img" + empl.id);
                img.style.transform = "scale(1.0)";
                var info = document.getElementById("info");
                info.style.display = "none";
            },
            sortId() {
                this.posts.sort((a, b) => {
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                });
            },
            sortFirstName() {
                this.posts.sort((a, b) => {
                    if (a.fname < b.fname) {
                        return -1;
                    } else if (a.fname > b.fname) {
                        return 1;
                    } else
                        return 0;
                });
            },
            sortLastName() {
                this.posts.sort((a, b) => {
                    if (a.lname < b.lname) {
                        return -1;
                    } else if (a.lname > b.lname) {
                        return 1;
                    } else
                        return 0;
                });
            },
            sortPosition() {
                this.posts.sort((a, b) => {
                    if (a.position < b.position) {
                        return -1;
                    } else if (a.position > b.position) {
                        return 1;
                    } else
                        return 0;
                });
            }
        }
    }
</script>


<style scoped>
    .email{
        color:blue;
        text-decoration: underline blue;
    }

    .pagination > li > a,
    .pagination > li > span {
        color: green;
        font-weight: bolder;
    }

    .pagination > .active > a,
    .pagination > .active > a:focus,
    .pagination > .active > a:hover,
    .pagination > .active > span,
    .pagination > .active > span:focus,
    .pagination > .active > span:hover {
        background-color: green;
        border-color: green;
        color:white;
        font-weight: bolder;
    }

    #info {
        position: absolute;
        top: 360px;
        left: 450px;
        z-index: 1000;
        width:200px;
        text-wrap: wrap;
        word-wrap: break-word;
        padding:10px;
        border: solid 3px green;
        display: none;
    }
</style>