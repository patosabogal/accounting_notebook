<template>
  <div is="sui-segment">
    <h1 is="sui-header">Transactions</h1>
    <sui-accordion v-for="transaction in transactions" :key="transaction.id">
      <sui-accordion-title>
        <sui-icon name="dropdown" />
        {{ transaction.id }}
      </sui-accordion-title>
      <sui-accordion-content>
        <sui-list bulleted>
          <sui-list-item> Amount: {{ transaction.amount }} </sui-list-item>
          <sui-list-item
            :style="{ color: transaction.type === 'debit' ? 'red' : 'green' }"
          >
            Type: {{ transaction.type }}
          </sui-list-item>
          <sui-list-item> Date: {{ transaction.effectiveDate }} </sui-list-item>
        </sui-list>
      </sui-accordion-content>
    </sui-accordion>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      transactions: [],
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3000/transactions")
        .then(({ data: transactions }) => {
          this.transactions = transactions;
        });
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
