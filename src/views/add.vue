<template>
  <div>
    <header>
      <Navigation />
    </header>
    <body>

      

      <div>
        <addExpense @dataAdded="handleDataAdded" />
      </div>

      <div v-if="expenseAddedMessage" class="success-message">
        {{ expenseAddedMessage }}
      </div>

    </body>
  </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
import addExpense from '@/components/AddExpense.vue';
import { ref } from 'vue';

const expenseAddedMessage = ref('');

const handleDataAdded = () => {
  expenseAddedMessage.value = 'Expense successfully added!';
  console.log('expenseAddedMessage:', expenseAddedMessage.value);
  setTimeout(() => {
    expenseAddedMessage.value = '';
  }, 1000);
};
</script>

<style scoped>
.success-message {
  position: fixed;
  bottom: 0; /* Set to bottom instead of top */
  left: 0;
  width: 100%;
  background-color: rgba(0, 128, 0, 0.4);
  color: white;
  padding: 10px;
  text-align: center;
  transition: opacity 0.5s;
}
</style>