<script>
import { url, headers } from "./../../services/fetchOptions"
export default {
    name: "PostForm",
    data() {
      return {
        content: "", 
        selectedImage : null    
      }
    },
    methods: {
      handleNewFile(e) {
        this.selectedImage = e.target.files[0]
      },
      handleClick() {
        const formData = new FormData()
        formData.append("content", this.content)
        formData.append("image" , this.selectedImage)
        const options = {
          headers, 
          method: "POST",
          body: formData
        }
        fetch(url, options)
        .then((res) => {
          if(res.status === 200) {
            return res.json()
          } else {
            throw new Error("Failed to fetch posts")
          }
          })
          .then((res) => {
           this.$router.go()
          })
          .catch((err) => console.log("err", err))
        }
    }
}    
</script>

<template>
<p>hello</p>
  <div class="form-floating mt-4">
    <input class="form-control py-3" v-model="content" />    
    </div>
  
<div class="d-flex">
<label for="file-input" class="btn btn-secondary mt-1">Add Image</label>
<span v-if="selectedImage">{{ selectedImage.name }}</span>
<input  id="file-input" type="file" @change="handleNewFile" />
<button @click="handleClick" type="button" class="btn btn-primary mt-1 ms-auto">Post</button>
</div>

{{ content }}

  <hr class="dropdown-divider mt-4" />
</template>

<style scoped>

#file-input {
    display: none;
}
div span {
  font-size: 8 px;
  margin: 0 16 px;
}

body {
  background-color: #5f5f5f1a !important;
}
.form-floating > div.form-control {
  height: auto;
  min-height: 80px;
}

.form-floating > div.form-control:empty:not(:focus)::before {
  content: "Leave a comment here";
  color :#a0a0a0;
  display: block;
  position: absolute;
  top:50%;
  left: 16px;
  transform: translateY(-50%);
}
</style>