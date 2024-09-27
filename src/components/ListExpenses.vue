<template>
  <div class = "center-div"  v-if="user.sub !== undefined">

    <input v-model="searchQuery"  class=" width-custom input is-link is-small" placeholder="Search categories">
    <input  class="width-custom input is-link is-small" type="date" v-model="startDate" placeholder="Start Date">
    <input class="width-custom input is-link is-small" type="date" v-model="endDate" placeholder="End Date">

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in filteredExpenses" :key="expense.id">
          <td v-if="shouldShowExpense(expense)">
            <router-link :to="{ name: 'expense-details', params: { id: expense.id } }">
              {{ index + 1 }}
            </router-link>
          </td>
          <td v-if="shouldShowExpense(expense)">{{ expense.amount }} EUR </td>
          <td v-if="shouldShowExpense(expense)">{{ expense.date }}</td>
          <td v-if="shouldShowExpense(expense)">{{ expense.category }}</td>
        </tr>
      </tbody>
    </table>

    

    <div>
      <p>Sum of Expenses: {{ totalExpense }} EUR</p>
    </div>



  </div>
</template>
  
  <script setup>
  import { ref, onMounted, computed,watch  } from 'vue';
  import { collection, onSnapshot} from "firebase/firestore";
  import {db} from '@/firebase'
  // Composition API
  import { useAuth0 } from '@auth0/auth0-vue';
  const auth0 = useAuth0();
  const user = auth0.user
  /*         user: auth0.user,
        isAuthenticated: auth0.isAuthenticated,
        isLoading: auth0.isLoading, */

  const shouldShowExpense = (expense) => {
    //console.log('1:',expense.userInfo);
    //console.log('2:',user.value.sub);
    return auth0.user && expense.userInfo === user.value.sub;
  };

  
  const expenses = ref([]);
  const searchQuery = ref('');
  const startDate = ref('');
  const endDate = ref('');

 
  onMounted( () => {
    
      onSnapshot(collection(db, 'expenses'), (querySnapshot) => {
        const dbexpenses = [];
        querySnapshot.forEach((doc) => {
          const e = {
          id: doc.id,
          description: doc.data().description,
          amount: doc.data().amount,
          date: doc.data().date,
          category: doc.data().category,
          userInfo: doc.data().userInfo
        };
        dbexpenses.push(e);
        });
        
        expenses.value = dbexpenses;
      });
      
  });

  const filteredExpenses = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const start = startDate.value;
  const end = endDate.value;
  
  return expenses.value.filter((expense) => {
    return (
      expense.category.toLowerCase().includes(query) &&
      (expense.date >= start || !start) &&
      (expense.date <= end || !end)
    );
  });
});

const totalExpense = computed(() => {
  return filteredExpenses.value.reduce((sum, expense) => {
    return shouldShowExpense(expense) ? sum + expense.amount : sum;
  }, 0);
});
  
const totalExpensesCount = computed(() => {
  return filteredExpenses.value.filter(expense => shouldShowExpense(expense)).length;
});

  </script>
  
  <style >
  .center-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }

  .total-expenses-circle {
    width: 40px;
    height: 40px;
    background-color: red;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin: 5px 0;

  }
  .width-custom{
    width: 120px;
    margin: 10px;
    margin-bottom: 20px;
  }


  </style>
  