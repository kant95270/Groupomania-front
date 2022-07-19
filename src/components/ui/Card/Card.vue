<script>
import Comment from "./Comment.vue"
import Avatar from "../Avatar.vue"
import { url , headers} from "./../../../services/fetchOptions"
export default {
    name: "Card",
    components: {
        Comment,
        Avatar
    },
    props: ["email", "title", "content", "url", "comments", "id"], 
    data() {
        return {
            currentComment: null
        }
    }, 
   mounted() {},
   methods: {
    addComment(e) {
        console.log(this.currentComment)
        console.log(this.$props.id)
        const options = {
            headers: { ...headers, "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                Comment: this.currentComment
            })
        }
        console.log("options:", options)
        fetch(url + "/" + this.$props.id, options)  
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                throw new Error("Failed to fetch posts")
            }
        })   
         .then((res) => {
            console.log("res:",res)
           this.$router.go()
           // this.currentComment = null
        }) 
        .catch((err) => console.log("err", err))   
        },
        deletePost(e) {
            console.log("id of the post to delete:", this.$props.id)
            fetch(url + "/" + this.$props.id, {
                headers: { ...headers, "Content-Type": "application/json"},
                method: "DELETE"
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error("Failed to delete post")
                }
                })
                .then((res) => {
                    console.log("res:", res)
                    // this.$router.go()
                })
                .catch((err) => console.log("err:", err))
                // fetch(url + "/" + this.$props.id)
            }
        }    
    }   
</script>

<template>
<div class="card mb-3 m-auto">
    <div class="card-header">
        <img 
        src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" 
        class="rounded-circle shadow-4"
        alt="Avatar" 
        />

        <span>{{ email }}</span>
        <i class="bi bi-trash" @click="deletePost"></i>
        </div>

  <img v-if="url" :src="url" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
        {{ content }}
        </p>
        <div v-for="comment in comments">
    <Comment :email="comment.user" :content="comment.content"></Comment>
    </div>
    
    <div class="d-flex gap-1">
        <Avatar></Avatar>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="currentComment" />
        <button type="button" class="btn-primary  ms-auto rounded-pill" @click="addComment">Post</button>
    </div>
  </div>
</div>
</template>

<style>
@media (min-width : 768px) {      
   .card {
    width: 70%;
}
}
.card-header {
    display: flex;
    align-items: center;
    gap: 16px;
}

.card-header img {
    width: 50px;
}
.bi-trash {
    margin-left: auto;
}

.bi-trash:hover {
    cursor: pointer;
    color:rgb(193, 57, 57);
    transform: scale(1.1);
}
.bi-trash::before {
    font-size: 20px;
}
</style>