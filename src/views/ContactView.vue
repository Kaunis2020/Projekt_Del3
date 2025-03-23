<template>
    <div class="container-sm text-center">
        <h1>Skriv ett meddelande</h1>
        <img class="logo" alt="logo" v-bind:src="require('../assets/images/penliten.gif')">
        <p ref="message" id="message"></p>
        <p>Glöm inte att ange Din e-post för restaurangens återkoppling.</p>
        <div class="row justify-content-center">
            <form class="col-lg-6" v-on:submit.prevent="postForm" autocomplete="off">
                <div class="w-100 mb-3">
                    <label for="date" class="form-label">Dagens datum:</label><br/>
                    <input type="text" id="date" v-model="date" required class="form-control readonly" readonly="readonly">
                </div>
                <div class="w-100 mb-3">
                    <label for="fname" class="form-label">Förnamn: </label><br/>  
                    <input type="text" id="fname" v-model="fname" class="form-control" required>  
                </div>
                <div class="w-100 mb-3">
                    <label for="lname" class="form-label">Efternamn:</label><br/> 
                    <input type="text" id="lname" v-model="lname" class="form-control" required>  
                </div>
                <div class="w-100 mb-3">
                    <label for="phone" class="form-label">Telefon:</label><br/>
                    <input type="text" id="phone" v-model="phone" required class="form-control">
                    <span>* Obligatoriskt fält</span>
                </div>
                <div class="w-100 mb-3">
                    <label for="email" class="form-label">E-post:</label><br/>
                    <input type="text" id="email" v-model="email" required class="form-control">
                    <span>* Obligatoriskt fält</span>
                </div>
                <div class="w-100 mb-3">
                    <label for="heading" class="form-label">Rubrik:</label><br/>
                    <input type="text" id="heading" v-model="heading" required class="form-control">                    
                </div>
                <div class="w-100 mb-3">
                    <label for="letter" class="form-label">Meddelande:</label><br/>
                    <textarea v-model="letter" id="letter" name="letter" rows="4" cols="75" required class="form-control"></textarea>
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
        name: 'ContactView',
        data() {
            return {
                date: '',
                fname: '',
                lname: '',
                phone: '',
                email: '',
                heading: '', // Rubrik för meddelandet
                letter: ''
            };
        },
        created() {
            this.getDate();
        },
        methods: {
            getDate() {
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                this.date = today.toLocaleDateString();
            },
            async postForm() {
                const url = "http://localhost:3000/open/contacts";
                if (this.fname.value === "" || this.lname.value === "" ||
                        this.phone.value === "" || this.email.value === "" || this.letter.value === "")
                {
                    this.$refs.message.innerHTML = "Fyll i Dina uppgifter!";
                    return;
                } else {
                    const formdata = {
                        fname: this.fname,
                        lname: this.lname,
                        phone: this.phone,
                        email: this.email,
                        heading: this.heading, /* Rubrik för meddelandet */
                        letter: this.letter,
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
                                if (response.ok) {
                                    let message = "Ditt meddelande har sparats i databasen";
                                    this.$refs.message.innerHTML = message;
                                    this.fname = '';
                                    this.lname = '';
                                    this.phone = '';
                                    this.email = '';
                                    this.heading = '';
                                    this.letter = '';
                                    return true;
                                }
                                return response.json();
                            })
                            .catch(error => {
                                this.$refs.message.innerHTML = error;
                                return false;
                            });
                }
            }
        }
    }
</script>
<style scoped>
    span{
        color:red;
        font-weight:bolder;
    }
    .readonly{
        background-color: rgb(240, 250, 255);
    }
</style>