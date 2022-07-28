<script>
export default {
    name: "Avatar"
}
</script>

<template>
  <img src="https://picsum.photos/50" class="card-img-top rounded-circle shadow-4" alt="...">
  <i v-if="currentUser === email" class="bi bi-hand-thumbs-up"></i>
  <i class="bi bi-hand-thumbs-down"></i>
 
</template>

<style scoped>
img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>