<template>
  <div class="container-home">
    <First />
    <h1 class="title">
      Register if you don't have
      an account or sign in.
    </h1>
    <LoginButton />
  </div>
</template>

<script setup>
import First from '@/components/First.vue';
import LoginButton from '@/components/LoginButton.vue';

</script>

<style scoped>

.title{
  font-size: 1.5rem;
  color: grey;
  margin-top: 20px;
  font-weight: 400;
}

.topproblem {
  margin-top: 40px;
}
</style>
