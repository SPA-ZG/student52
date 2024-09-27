<template>
  <div>
    <header><Navigation /></header>
    <body>
      <div class="center-div">
        <img src="/404.jpg">
      </div>
    </body>
  </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
</script>

<style >
.center-div {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
</style>
