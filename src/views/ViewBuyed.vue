<template>
  <div class="p-2">
    <h4>LISTA DE COMPRADA (view buyed)</h4>
  </div>
  <div class="p-2">
    <button class="btn btn-info" @click="onBack">REGRESAR</button>
  </div>
  <div class="p-2">
    <label>FECHA COMPRA</label>
  </div>
  <div class="p-2">
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersDate"
        :key="index"
        class="list-group-item"
      >
        <a href="#" @click="setDate(order._id)">{{ order._id }}</a>
      </li>
    </ul>
    <div class="p-2">
      <input
        v-model="datePurchased"
        class="form-control"
        type="date"
        @change="carga"
      />
    </div>
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersBuyed"
        :key="index"
        class="list-group-item"
      >
        {{ order.itemId.name }} - {{ order.model }} - {{ order.quantity }}
      </li>
    </ul>
  </div>
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
    const ordersDate = ref([]);
    let datePurchased = ref('');

    function newToday() {
      const todayDate = new Date();
      return todayDate.toISOString().split('T')[0];
    }

    datePurchased.value = newToday();

    const carga = async function () {
      await orders.getOrderBuyed(datePurchased.value);
      ordersBuyed.value = orders.orders;
      await orders.getOrderDate();
      ordersDate.value = orders.dates;
    };

    carga();

    const setDate = function (params) {
      datePurchased.value = params;
      carga();
    };

    const onBack = function () {
      router.push({ name: 'CurrentOrder' });
    };

    return {
      onBack,
      carga,
      setDate,
      ordersBuyed,
      datePurchased,
      ordersDate,
    };
  },
};
</script>
<style></style>
