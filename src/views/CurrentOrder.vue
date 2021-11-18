<template>
  <h2>HOLA {{ users.user.name }} <button @click="onExit">SALIR</button></h2>
  <br />

  <button @click="onActive">{{ textButton }}</button>
  <br />
  <br />
  <h4>LISTA DE COMPRA ACTUAL (current order)</h4>
  <br />
  <ul>
    <li v-for="(order, index) in orders.orders" :key="index">
      <input v-model="order.buyed" type="checkbox" :disabled="active" />
      {{ order.itemId.name }} - {{ order.model }} - {{ order.quantity }}
      <button @click="edit(order._id)">EDITAR</button>
    </li>
  </ul>
  <br />
  <br />
  <button @click="onInsert">AÑADIR</button>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { orderStore } from '../store/orderStore';
import { userStore } from '../store/userStore';

export default {
  setup() {
    const router = useRouter();
    const orders = orderStore();
    const users = userStore();

    const active = ref(true);

    let textButton = ref('DESBLOQUEA COMPRA');

    const carga = async function () {
      await orders.getOrderOpen();
    };

    carga();

    const onInsert = function () {
      router.push({ name: 'AddItemOrder' });
    };

    const onActive = async function () {
      if (active.value) {
        active.value = false;
        textButton.value = 'COMPRAR';
      }

      await orders.putOrders();
      carga();
    };

    const edit = function (id) {
      orders.id = id;
      router.push({ name: 'Editorder' });
    };

    const onExit = function () {
      users.statusLogin.logded = false;
      router.push({ name: 'Login' });
    };

    return {
      orders,
      onExit,
      onInsert,
      onActive,
      users,
      active,
      edit,
      textButton,
    };
  },
};
</script>

<style></style>
