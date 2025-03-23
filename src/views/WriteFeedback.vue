<template>
    <div class="container-sm text-center">
        <h1>Skriv ett omdöme om restaurangen</h1>
        <p ref="message" id="message"></p>
        <img class="logo" alt="logo" v-bind:src="require('../assets/images/pen.gif')">      
        <br />
        <h2>Sätt Ditt betyg för restaurangen</h2>
        <br />
        <div id="rating">
            <div class="card">
                <span @click="gfg(1)" class="star">★</span>
                <span @click="gfg(2)" class="star">★</span>
                <span @click="gfg(3)" class="star">★</span>
                <span @click="gfg(4)" class="star">★</span>
                <span @click="gfg(5)" class="star">★</span>
                <h3 ref="output" id="output">
                    Ditt betyg är: 0/5
                </h3>
            </div>
        </div>
        <br />
        <br />
        <div class="row justify-content-center">
            <form class="col-lg-6" v-on:submit.prevent="postForm" autocomplete="off">
                <div class="w-100 mb-3">
                    <label for="date" class="form-label">Dagens datum:</label><br/>
                    <input type="text" id="date" v-model="date" required class="form-control readonly" readonly="readonly">
                </div>
                <div class="w-100 mb-3">
                    <label for="name" class="form-label">Ditt namn: </label><br/>  
                    <input type="text" id="name" v-model="name" placeholder="Anonym" class="form-control" required>  
                </div>
                <div class="w-100 mb-3">
                    <label for="email" class="form-label">Din e-post:</label><br/>
                    <input type="text" id="email" v-model="email" required class="form-control">
                </div>
                <div class="w-100 mb-3">
                    <label for="feedback" class="form-label">Ditt omdöme:</label><br/>
                    <textarea v-model="feedback" id="feedback" name="feedback" rows="4" cols="75" required class="form-control" ></textarea>
                </div>
                <br/>
                <button class="btn btn-success" type="submit"> <b>SKICKA</b> </button>
            </form> 
        </div>
        <br/> 
    </div>
    <br/> 
</template>
<script>
    export default {
        name: 'WriteFeedback',
        data() {
            return {
                name: '',
                email: '',
                feedback: '',
                rating: 0,
                date: ''
            };
        },
        created() {
            this.getDate();
        },
        methods: {
            async postForm() {
                const url = "http://localhost:3000/open/guestbook";
                if (this.name.value === "" || this.email.value === "" || this.feedback.value === "")
                {
                    this.$refs.message.innerHTML = "Fyll i Dina uppgifter!";
                    return;
                } else {
                    const formdata = {
                        name: this.name,
                        email: this.email,
                        feedback: this.feedback,
                        rating: this.rating,
                        date: this.date
                    };
                    // Make a POST request using the Fetch API
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formdata)
                    })
                            .then(response => {
                                if (!response.ok)
                                {
                                    throw new Error(response.message);
                                    return false;
                                }
                                return response.json();
                            })
                            .then(response => {
                                if (response.ok) {
                                    let message = "Omdömet har sparats i databasen";
                                    this.$refs.message.innerHTML = message;
                                    this.name = '';
                                    this.email = '';
                                    this.feedback = '';
                                    this.rating = 0;
                                    return true;
                                }
                                return response.json();
                            })
                            .catch(error => {
                                this.$refs.message.innerHTML = error;
                                return false;
                            });
                }
            },
            getDate() {
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                this.date = today.toLocaleDateString();
            },
            gfg(n) {
                this.remove();
                var cls = '';
                let stars = document.getElementsByClassName("star");
                for (let i = 0; i < n; i++) {
                    if (n === 1)
                        cls = "one";
                    else if (n === 2)
                        cls = "two";
                    else if (n === 3)
                        cls = "three";
                    else if (n === 4)
                        cls = "four";
                    else if (n === 5)
                        cls = "five";
                    stars[i].className = "star " + cls;
                }
                this.$refs.output.innerText = "Ditt betyg är: " + n + "/5";
                this.rating = n;
            },
            remove() {
                let stars = document.getElementsByClassName("star");
                let i = 0;
                while (i < 5) {
                    stars[i].className = "star";
                    i++;
                }
            }
        }
    }
</script>

<style scoped>
    .readonly{
        background-color: rgb(240, 250, 255);
    }

    #rating{
        padding:2px;
        background: hsl(137, 46%, 24%);
        width:50%;
        margin:auto;
    }
    .card {
        max-width: 40rem;
        background: #fff;
        margin: 0 0.1rem;
        padding: 0.1rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        width: 100%;
        border-radius: 0.3rem;
        display: inline-block;
    }

    .star {
        font-size: 10vh;
        cursor: pointer;
        padding-left:5px;
        padding-right:10px;
    }

    .one {
        color: rgb(255, 0, 0);
    }

    .two {
        color: rgb(255, 106, 0);
    }

    .three {
        color: rgb(251, 255, 120);
    }

    .four {
        color: rgb(255, 255, 0);
    }

    .five {
        color: rgb(24, 159, 14);
    }
</style>