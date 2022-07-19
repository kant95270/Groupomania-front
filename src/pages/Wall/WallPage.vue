<script>
import Card from "../../components/ui/Card/Card.vue"
import PostForm from "./PostForm.vue"
export default {
    name: "WallPage",
    components: {
      Card,
      PostForm
    },
    beforeCreated() {
      const token = localStorage.getItem("token")
      if (token == null ) {
        this.$router.push("/login")
      }
    },
    mounted() {
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
      const url = `https://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

      const options = {
        Headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
      }
      fetch(url, options)
       .then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        throw new Error("Failed to fetch posts")
      }
      })
      .then((res) => {
        const { email , posts } = res
        this.posts = posts
        this.email = email
      })
      .catch((err) => console.log("err", err))
    },
    data() {
      return {
        post: [],
        email: null
      }
    }
}
</script>
<template>
<div v-if="email" class="container-sm">
  <PostForm></PostForm>
  <div v-if="posts.length === 0"> No posts to display. Start chatting !</div> 
  <div v-for="post in posts">
      <card :email="post.user" :title="post.tittle" :content="post.content" :url="post.url" :comments="post.comments" :id="post.id"> </card>
</div>
</div>
</template>
<style module ></style>