<script>
import Card from "../../components/ui/Card/Card.vue"
import PostForm from "./PostForm.vue"
export default {
    name: "WallPage",
    components: {
      Card,
      PostForm
    }
}
</script>
<template>
<div class="container-sm">
  <PostForm></PostForm>  
  <Card></Card>
  <Card></Card>
  <card></card>
</div>
</template>
<style module ></style>