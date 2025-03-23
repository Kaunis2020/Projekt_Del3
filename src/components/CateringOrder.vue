<template>
    <div class="container text-center">
        <div class="row justify-content-center">
            <h1> Typ: {{ servicetype }}</h1>            
            <p ref="message" id="message"></p>
            <br/>
            <p class="blockquote"> För catering krävs en minsta beställning för fem personer.</p>
            <p><i class="fa-solid fa-cart-shopping" id="shopping"></i></p>
            <form class="col-lg-6" v-on:submit.prevent="addUser">
                <div class="w-100 mb-3">
                    <label for="fname" class="form-label">Förnamn: </label><br/>  
                    <input type="text" id="fname" v-model="fname" class="form-control" required>  
                </div>
                <div class="w-100 mb-3">
                    <label for="lname" class="form-label">Efternamn:</label><br/> 
                    <input type="text" id="lname" v-model="lname" class="form-control" required>  
                </div>
                <div class="w-100 mb-3">
                    <label for="visitdate" class="form-label">Datum för matleveransen:</label><br/> 
                    <input type="datetime-local" id="visitdate" v-model="visitdate" min="2025-03-01" max="2025-12-31" required class="form-control" />
                    <span>* Obligatoriskt fält för matleveransen</span>
                </div>
                <div class="w-100 mb-3">
                    <label for="phone" class="form-label">Telefon:</label><br/>
                    <input type="text" id="phone" v-model="phone" required class="form-control">
                </div>
                <div class="w-100 mb-3">
                    <label for="email" class="form-label">E-post:</label><br/>
                    <input type="text" id="email" v-model="email" required class="form-control">
                </div>
                <div class="w-100 mb-3">
                    <label for="address" class="form-label">Adress för matleveransen:</label><br/>
                    <input type="text" id="address" v-model="address" required class="form-control">
                    <span>* Obligatoriskt fält för matleveransen</span>
                </div>
                <div class="w-100 mb-3">
                    <label for="persons" class="form-label">Antal personer:</label><br/>
                    <input type="number" v-model="persons" min='persons' max='100' step='1' value='persons' required class="form-control">
                </div>
                <br/>
                <button class="btn btn-success" type="submit"> <b>SPARA</b> </button>
            </form> 
        </div>
        <br/>
        <br/>
        <br/>
    </div>
</template>

<script>
    export default {
        name: 'CateringOrder',
        data() {
            return {
                fname: '',
                lname: '',
                visitdate: '2025-05-22T12:00',
                servicetype: this.$route.params.type,
                phone: '',
                email: '',
                address: '',
                persons: 5,
                customerid: 0
            };
        },
        methods: {
            addUser() {
                if (!this.fname && !this.name && !this.phone && !this.email) {
                    this.$refs.message.innerHTML = "Fyll i Dina uppgifter!";
                    return;
                }
                if (this.address === null || this.address === undefined || this.address === '')
                {
                    var elem = document.getElementById("message");
                    elem.innerHTML = "Adressen för matleveransen skall anges";
                    return;
                } else
                {
                    var newUser = {
                        fname: this.fname,
                        lname: this.lname,
                        visitdate: this.visitdate,
                        servicetype: this.servicetype,
                        tabletype: "",
                        phone: this.phone,
                        email: this.email,
                        address: this.address,
                        persons: this.persons
                    };
                    this.$store.commit('addUser', newUser);

                    const formdata = {
                        fname: this.fname,
                        lname: this.lname,
                        phone: this.phone,
                        email: this.email,
                        address: this.address
                    };
                    this.postForm(formdata);
                }
            },
            async postForm(formdata) {
                const url = "http://localhost:3000/open/customer";
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
                        .then(data => {
                            this.customerid = data;
                            this.$store.commit('addCustomer_id', this.customerid);
                            this.$router.push({path: '/orderitem', replace: true});
                            return true;
                        })
                        .catch(error => {
                            this.$refs.message.innerHTML = error;
                            return false;
                        });
            }
        }
    }
</script>

<style scoped>
    span{
        color:red;
        font-weight:bolder;
    }
    h1 {
        font-weight: 500;
        font-size: 2.6rem;
        position: relative;
        top: -10px;
    }

    h3 {
        font-size: 1.2rem;
    }

    .greetings h1,
    .greetings h3 {
        text-align: center;
    }

    .green {
        text-decoration: none;
        color: hsla(160, 100%, 37%, 1);
        transition: 0.4s;
        padding: 3px;
        font-weight:bolder;
    }

    @media (min-width: 1024px) {
        .greetings h1,
        .greetings h3 {
            text-align: center;
        }
    }
</style>
