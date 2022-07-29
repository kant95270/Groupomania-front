<script>
import Comment from "./Comment.vue"
import Avatar from "../Avatar.vue"
import { getUrlAndHeaders } from "./../../../services/fetchOptions"
export default {
    name: "Card",
    components: {
        Comment,
        Avatar
    },
    props: ["email",  "content", "url", "comments", "id", "currentUser"], 
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
        const { url, headers}= getUrlAndHeaders()
        const options = {
            headers: { ...headers, "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                comment: this.currentComment
            })
        }
        fetch(url + "posts/" + this.$props.id, options)  
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
        .catch((err) => console.log("err:", err))   
        },
        deletePost(e) {
            console.log("id of the post to delete:", this.$props.id)
            const { url, headers } = getUrlAndHeaders()
            fetch(url + "posts/" + this.$props.id, {
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
                    this.$router.go()
                })
                .catch((err) => console.log("err:", err))
            },
        handleLike(value) {
            const { url, headers}= getUrlAndHeaders()
            const options = {
                headers: { ...headers, "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    like: value
                })
            }
            fetch(url + "posts/" + this.$props.id + "/like", options)  
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error("Failed to fetch posts")
                }
            })   
            .then((res) => {
                console.log("res:",res)
            }) 
            .catch((err) => console.log("err:", err)) 
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
        <i v-if="currentUser === email" class="bi bi-trash" @click="deletePost"></i>
        </div>

  <img v-if="url" :src="url" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
        {{ content }}
        <i @click="handleLike(1)" class="bi bi-hand-thumbs-up"></i>
        <i @click="handleLike(-1)" class="bi bi-hand-thumbs-down"></i>
        </p>
        <div v-for="comment in comments">
        <i v-if="currentUser === email" class=""></i>
    <Comment :email="comment.user.email" :content="comment.content"></Comment>
    </div>
    
    <div class="d-flex gap-1">
        <Avatar></Avatar>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="currentComment"
         />
        
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

.bi-hand-thumbs-up {
    margin-right: auto;
}
.bi-hand-thumbs-up:hover {
    cursor:pointer;
    color:blue;
    transform: scale(1.1);
}

.bi-hand-thumbs-down {
    margin-right: auto;
}

.bi-hand-thumbs-down:hover {
     cursor: pointer;
    color:brown;
    transform: scale(1.1);
}
</style>