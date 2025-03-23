<template>
    <div class="rating">
        <span class="rating__result"></span> 
        <i class="rating__star far fa-star"></i>
        <i class="rating__star far fa-star"></i>
        <i class="rating__star far fa-star"></i>
        <i class="rating__star far fa-star"></i>
        <i class="rating__star far fa-star"></i>
    </div>
</template>
<script>
    export default {
        name: 'RatingComp',
        props: {
            rating: {
                type: Number,
                required: false
            }
        },
        mounted() {
            this.drawStars();
        },
        methods: {
            drawStars() {
                const starClassActive = "rating__star fas fa-star";
                const starClassUnactive = "rating__star far fa-star";
                const stars = document.getElementsByClassName("rating__star");
                for (var i = 0; i < this.rating; i++)
                {
                    stars[i].className = starClassActive;
                }
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-weight: 500;
        font-size: 2.6rem;
        position: relative;
        top: -10px;
    }

    h3 {
        font-size: 1.2rem;
    }

    .rating {
        margin-left:50px;
        position: relative;
        width: 180px;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .3em;
        padding: 5px;
        overflow: hidden;
        border-radius: 20px;
        box-shadow: 0 0 2px #b3acac;
    }

    .rating__result {
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-10px) translateX(-5px);
        z-index: -9;
        font: 3em Arial, Helvetica, sans-serif;
        color: #ebebeb8e;
        pointer-events: none;
    }

    .rating__star {
        font-size: 1.3em;
        color: #dabd18b2;
        transition: filter linear .3s;
    }

    .rating__star:hover {
        filter: drop-shadow(1px 1px 4px gold);
    }
</style>
