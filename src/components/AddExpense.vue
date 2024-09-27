<template>
  <div class="addclass">
  <form @submit.prevent="addExpense" class="custom-form center-div">
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <input v-model="newContent.description" class="input widthbigger" type="text" placeholder="" />
      </div>
    </div>

    <div class="field">
      <label class="label ">Amount</label>
      <div class="control">
        <input v-model="newContent.amount" class="input widthbigger" type="number" placeholder="" />
      </div>
    </div>

    <div class="field">
      <label class="label">Date</label>
      <div class="control">
        <input v-model="newContent.date" class="input widthbigger" type="date" placeholder="" />
      </div>
    </div>

    <div class="field">
      <label class="label">Store/Firm/Sth</label>
      <div class="control">
        <input v-model="newContent.store" class="input widthbigger" type="string" placeholder="" />
      </div>
    </div>

    <div class="field">
      <label class="label">Category</label>
      <div class="control">
        <div class="select">
          <select v-model="newContent.category">
            <option>Housing</option>
            <option>Transportation</option>
            <option>Food</option>
            <option>Utilities</option>
            <option>Clothing</option>
            <option>Healthcare</option>
            <option>Insurance</option>
            <option>Supplies</option>
            <option>Personal</option>
            <option>Savings</option>
            <option>Dept</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Notes</label>
      <div class="control">
        <textarea v-model="newContent.notes" class="textarea widthbigger" placeholder=""></textarea>
      </div>
    </div>

    <div v-if="!newContent.description" class="help is-danger form-buttons">
      Description is required.
    </div>
    <div v-if="!newContent.category" class="help is-danger form-buttons">
      Category is required.
    </div>
    <div v-if="!newContent.date" class="help is-danger form-buttons">
      Date is required.
    </div>
    <div v-if="!newContent.amount" class="help is-danger form-buttons">
      Amount is required.
    </div>

    <div class="control form-buttons">
      <button :disabled="!isValidForm" class="button is-info lowerButton" @click="$emit('dataAdded')">
        Save expense
      </button>
    </div>
  </form>
</div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

const expenses = ref([]);

/*   onMounted( () => {
    
  
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
          notes: doc.data().notes
        };
        dbexpenses.push(e);
        });
        
        expenses.value = dbexpenses;
      });
      
  }); */

  
  // Composition API
  import { useAuth0 } from '@auth0/auth0-vue';
  const auth0 = useAuth0();
  const user = auth0.user
/*         user: auth0.user,
        isAuthenticated: auth0.isAuthenticated,
        isLoading: auth0.isLoading, */


const newContent = ref({
  description: "",
  amount: null,
  date: "",
  category: "",
  store: "",
  notes: "",
  userInfo: ""
});

const addExpense = async () => {
  if (isValidForm) {
    const doc = addDoc(collection(db, "expenses"), {
      description: newContent.value.description,
      amount: newContent.value.amount,
      date: newContent.value.date,
      category: newContent.value.category,
      store: newContent.value.store || null,
      notes: newContent.value.notes || null,
      userInfo: user.value.sub
    });

    newContent.value = {
      description: "",
      amount: null,
      date: "",
      category: "",
      store: "",
      notes: "",
      userInfo: ""
    };
  }
};

const isValidForm = computed(() => {
  return (
    newContent.value.description &&
    newContent.value.category &&
    newContent.value.date &&
    newContent.value.amount
  );
});
</script>

<style scoped>


.center-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }
  .custom-form {
    display: flex;
    flex-direction: column;
  }

  .field {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .label {
    flex-basis: 150px; 
    margin-right: 10px;
    text-align: right;
  }

  .control {
    flex-grow: 1;
  }

  .textarea,
  .input,
  .select {
    width: 100%;
  }

  .lowerButton {
    margin-top: 20px;
  }

  .topproblem {
    margin-top: 20px;
  }

  .form-buttons {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end; 
  }


  button {
    background-color: red !important;
  }

  .widthbigger{
    width: 220px;
  }

</style>