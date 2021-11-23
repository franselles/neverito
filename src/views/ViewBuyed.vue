<template>
  <h4>LISTA DE COMPRADA (view buyed)</h4>
  <br />
  <button @click="onBack">REGRESAR</button>
  <br />
  <br />
  <label>FECHA COMPRA</label>
  <input v-model="datePurchased" type="date" @change="carga" />
  <br />
  <br />
  <ul>
    <li v-for="(order, index) in ordersBuyed" :key="index">
      {{ order.itemId.name }} - {{ order.model }} - {{ order.quantity }}
    </li>
  </ul>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { orderStore } from '../store/orderStore';

export default {
  setup() {
    const orders = orderStore();
    const router = useRouter();

    const ordersBuyed = ref([]);
    let datePurchased = ref('');

    function newToday() {
      const todayDate = new Date();
      return todayDate.toISOString().split('T')[0];
    }

    datePurchased.value = newToday();

    const carga = async function () {
      await orders.getOrderBuyed(datePurchased.value);
      ordersBuyed.value = orders.orders;
    };

    carga();

    const onBack = function () {
      router.push({ name: 'CurrentOrder' });
    };

    return {
      onBack,
      ordersBuyed,
      datePurchased,
      carga,
    };
  },
};
</script>
<style></style>
