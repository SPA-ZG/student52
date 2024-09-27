<template>
  <div>
    <div v-for="expense in expenses" :key="expense.id" class="expense-details">
      <h1 v-if="shouldShowExpense(expense)">Expense Details</h1>
      <p v-if="shouldShowExpense(expense)">Description: {{ expense.description }}</p>
      <p v-if="shouldShowExpense(expense)">Amount: {{ expense.amount }} EUR</p>
      <p v-if="shouldShowExpense(expense)">Date: {{ expense.date }}</p>
      <p v-if="shouldShowExpense(expense)">Category: {{ expense.category }}</p>
      <p v-if="shouldShowExpense(expense)">Store: {{ expense.store }}</p>
      <p v-if="shouldShowExpense(expense)">Notes: {{ expense.notes }}</p>
      <button v-if="shouldShowExpense(expense)" class="button is-primary lowerButton" @click="() => deleteAndReturn(expense.id)">
        Delete expense
      </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
  import { db } from '@/firebase';
  import { useRouter } from 'vue-router';

  const $router = useRouter();

  const props = defineProps(['id']);
  const expenses = ref([]);
  

  const deleteAndReturn = async (id) => {
  await deleteExpense(id);
  $router.push('/list');
};


  const deleteExpense = (id) => {
    deleteDoc(doc(collection(db, 'expenses'), id));
  };

  
  // Composition API
  import { useAuth0 } from '@auth0/auth0-vue';
  const auth0 = useAuth0();
  const user = auth0.user

/*         user: auth0.user,
        isAuthenticated: auth0.isAuthenticated,
        isLoading: auth0.isLoading, */

  const shouldShowExpense = (expense) => {
    return expense.id === props.id && auth0.user && expense.userInfo === user.value.sub;
  };
  
  onMounted(() => {
    onSnapshot(collection(db, 'expenses'), (querySnapshot) => {
      const dbexpenses = [];
      querySnapshot.forEach((doc) => {
        const e = {
          id: doc.id,
          description: doc.data().description,
          amount: doc.data().amount,
          date: doc.data().date,
          category: doc.data().category,
          store: doc.data().store,
          notes: doc.data().notes,
          userInfo: doc.data().userInfo
        };
        dbexpenses.push(e);
      });
  
      expenses.value = dbexpenses;
    });
  });
  </script>
  <style scoped>
  .expense-details p{
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    margin: 20px;
  }

</style>