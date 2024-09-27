<template>
    <div>
      <header><Navigation /></header>
      <body>
        <div>
            <ExpenseDetails :id="$route.params.id" />
        </div>
      </body>
    </div>
  </template>
  
  <script setup>
  import Navigation from '@/components/Navigation.vue';
  import ExpenseDetails from '@/components/ExpenseDetails.vue';
    </script>
  