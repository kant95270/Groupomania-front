<script>
import Card from "../../components/ui/Card/Card.vue"
import PostForm from "./PostForm.vue"
import { getUrlAndHeaders } from "./../../services/fetchOptions"
export default {
    name: "WallPage",
    components: {
      Card,
      PostForm
    },
    methods: {
      redirectToLoginIfNoToken() {
        const token = localStorage.getItem("token")
        if (token == null) {
          this.$router.push("/login")
        }
      }
    },  
    mounted() {
      this.redirectToLoginIfNoToken
      const {url, headers} = getUrlAndHeaders()
      const options = {
        headers: {...headers }
      }
      fetch(url + "posts/", options)
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
        this.currentUser = email
      })
      .catch((err) => console.log("err", err))
    },
    data() {
      return {
        post: [],
        currentUser: null
      }
    }
}
</script>
<template>
<div v-if="currentUser" class="container-sm">
  <div class="col-sm-12">
    <h1 class="text-center">Welcome, {{ currentUser}}</h1>
  </div>
</div>
  <PostForm></PostForm>
  <div v-if="posts.length === 0"> No posts to display. Start chatting !</div> 
  <div v-for="post in posts">
      <Card 
      :currentUser="email"
      :email="post.user.email"
       :title="post.tittle"
        :content="post.content"
         :url="post.url"
          :comments="post.comments"
           :id="post.id"
           >
        </Card>
</div>
</template>
<style scoped>
h1 {
  font-size: 12px;
  font-weight: bold;
  margin-block: 8px;
}
</style>