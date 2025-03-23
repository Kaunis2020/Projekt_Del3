<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg" id="foodnav">   
            <div class="container-fluid">
                <ul class="navbar-nav">
                    <li><RouterLink to="/" class="blockquote mx-3">Startsida</RouterLink>|</li>                
                    <li class="nav-item dropdown">
                        <a class="dropdown-toggle blockquote mx-3" data-bs-toggle="dropdown" aria-expanded="false">Maträtter</a>                        
                        <ul class="dropdown-menu">
                            <li class="blockquote mb-0"><RouterLink to="/nonvegan" class="dropdown-item">Icke-vegansk</RouterLink></li>
                    <li class="blockquote mb-0"><RouterLink to="/vegan" class="dropdown-item">Vegansk mat</RouterLink></li>
                    <li class="blockquote mb-0"><RouterLink to="/hot" class="dropdown-item">Varma drycker</RouterLink></li>
                    <li class="blockquote mb-0"><RouterLink to="/cold" class="dropdown-item">Kalla drycker</RouterLink></li>
                    <li class="blockquote mb-0"><RouterLink to="/search" class="dropdown-item">Sök maträtter</RouterLink></li>
                    <li class="blockquote mb-0"><RouterLink to="/order" class="dropdown-item">Beställ maträtt</RouterLink></li>
                </ul>
                </li>
                <li>|<RouterLink to="/emp" class="blockquote mx-3">Anställda</RouterLink>|</li>                
                <li class="nav-item dropdown">
                    <a class="dropdown-toggle blockquote mx-3" data-bs-toggle="dropdown" aria-expanded="false">Kontakt</a>                        
                    <ul class="dropdown-menu">                        
                        <li class="blockquote mb-0"><RouterLink to="/contact" class="dropdown-item">Kontakta oss</RouterLink></li>
                <li class="blockquote mb-0"><RouterLink to="/info" class="dropdown-item">Informationen</RouterLink></li>
                <li class="blockquote mb-0"><RouterLink to="/write" class="dropdown-item">Skriv omdöme</RouterLink></li>
                <li class="blockquote mb-0"><RouterLink to="/read" class="dropdown-item">Läs omdömen</RouterLink></li> 
                <li class="blockquote mb-0"><RouterLink to="/order" class="dropdown-item">Beställ maträtt</RouterLink></li>
                </ul>
                </li>
                <li>| <RouterLink to="/about" class="blockquote mx-3">Om oss</RouterLink> |</li>            
                </ul>
            </div>
        </nav>
    </div>
    <RouterView/>
</template>

<script>
    import { useStore } from 'vuex'
    export default {
        beforeCreate() {
            // Get our store
            const store = useStore();
            // use store.commit to run any mutation. Below we are running the loadStore mutation
            store.commit('loadStore');
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #foodnav{
        width: 60%;
        padding-top:20px;
        padding-bottom:30px;
        margin:auto;
    }

    nav {
        padding:30px;
    }

    nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    nav a.router-link-exact-active {
        color: #42b983;
    }

    a.dropdown-toggle{
        font-size:20px;
        color: #2c3e50;
        cursor:pointer;
    }

    ul.navbar-nav li {
        padding-right:20px;
    }
</style>
