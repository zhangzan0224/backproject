<template>
  <div class="home">
    Home组件
    <p>aaaa</p>
  </div>
</template>

<script>
import { reqGetUsers } from '@/apis/users.js'
export default {
  name: 'Home',
  mounted () {
    reqGetUsers()
      .then((result) => {
        console.log(result)
      })
      .catch()
  }
}
</script>

<style lang="scss" scoped>
p {
  color: $RED;
}
</style>
