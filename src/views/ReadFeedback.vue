<template>
    <div class="container-sm text-center">
        <h1>Omdömen från våra kunder</h1>
        <img class="logo" alt="logo" v-bind:src="require('../assets/images/openbok.gif')">    
        <p ref="message" id="message"></p>
        <br/> 
        <table v-if="posts.length>0" id="feedbacktable" class="table table-hover">
            <thead>
                <tr><th>Nr</th><th>Namn</th><th>E-post</th><th>Omdöme</th><th>Datum </th><th>Betyg</th></tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" v-bind:key="post"> 
                    <td>{{ post.id }}</td>  
                    <td>{{ post.name }}</td>
                    <td>{{ post.email }}</td>
                    <td id="feedback">{{ post.feedback }}</td>
                    <td>{{ post.date }}</td>
                    <td id="ratingstars"><RatingComp :rating="post.rating" /></td>           
            </tr>
            </tbody>
        </table>
        <p v-else>
            Inga omdömen finns att visa
        </p>
        <br/>
    </div>
</template>

<script>
    // Visar alla recentioner från kunderna
    import RatingComp from '@/components/RatingComp.vue'
    export default {
        name: 'ReadFeedback',
        components: {
            RatingComp
        },
        created() {
            this.getData();
        },
        data() {
            return {
                posts: []
            };
        },
        methods: {
            async getData() {
                const url = "http://localhost:3000/api/guestbook";
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
                            this.$refs.message.innerHTML = error;
                            return false;
                        });
            }
        }
    }
</script>

<style scoped>
    #feedbacktable{
        width:100%;
    }

    #feedback{
        width:40%;
    }

    #ratingstars{
        padding-top:17px;
    }
</style>