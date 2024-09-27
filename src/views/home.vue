<template>
  <div class="container-home">
    <Navigation />

    <div class="topproblem">
    <ListExpenses />
  </div>
  </div>
</template>

<script setup>
import Navigation from "@/components/Navigation.vue";
import ListExpenses from "@/components/ListExpenses.vue";
</script>
<style>
.container-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.topproblem {
    margin-top: 40px;
  }
</style>
