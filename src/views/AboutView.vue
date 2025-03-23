<template>
    <div class="container-sm text-center">
        <img v-bind:src="require('../assets/images/stars.png')" alt="stars" />
        <br/>
        <br/>
        <h1>Om företaget</h1>
        <br/>
        <div id="slidshowdiv">
            <figure>
                <img :src="require('../assets/images/wellington.jpg')" width="170" height="170" id="slidshow" alt="mat" />
                <figcaption>Bonzi's Luxury Food</figcaption>
            </figure>
            <br/>
        </div>
        <p class="blockquote">Företaget Bonzi's Luxury Food AB är världens finaste restaurang med utsökt och läcker mat.<br/>
            Företaget Bonzi's Luxury Food AB har under året 2024 tilldelats tre Michelinstjärnor.
        </p>
        <p class="blockquote"> Företagets majoritetsägare och VD är apan Bonzi, som äger 80% av företagets aktiekapital.<br/>
            Företagets minoritetsägare är Gordon Ramsay, som äger 20% av företagets aktiekapital.<br/>
            &copy; 2025 &nbsp; Webbplatsen har skapats personligen av apan Bonzi.</p>
    </div>
    <br/>
    <p id="message"></p>
    <br/> 
</template>
<script>
    export default {
        name: 'AboutView',
        created() {
            this.getData();
        },
        beforeUnmount() {
            clearInterval(this.interval);
        },
        data() {
            return {
                posts: [],
                speed: 3000,
                slider: [],
                a: 0,
                b: 0,
                loadedimg: [],
                interval: 0
            };
        },
        methods: {
            async getData() {
                const url = "http://localhost:3000/api/slider";
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
                            this.b = this.posts.length;
                            this.createImages();
                            this.interval = setInterval(this.startSlider, this.speed);
                            return true;
                        })
                        .catch(error => {
                            var elem = document.getElementById("message");
                            elem.innerHTML = error;
                            return false;
                        });
            },
            createImages() {
                for (var i = 0; i < this.b; i++)
                {
                    this.slider[i] = require("@/assets/images/" + this.posts[i].photo);
                }
                for (var i = 0; i < this.b; i++) {
                    this.loadedimg[i] = new Image(170, 170);
                    this.loadedimg[i].src = this.slider[i];
                }
            },
            startSlider()
            {
                document.images.slidshow.src = this.loadedimg[this.a].src;
                this.a = this.a + 1;
                if (this.a > (this.b - 1))
                    this.a = 0;
            }
        }
    }
</script>

<style scoped>
    figcaption{
        margin-top:10px;
    }
</style>