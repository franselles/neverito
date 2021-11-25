<template>
  <div class="p-2">
    <h2>HOLA {{ users.user.name }}</h2>
  </div>
  <div class="p-2">
    <h4>LISTA DE COMPRA ACTUAL</h4>
  </div>

  <div class="p-2">
    <ul class="list-group">
      <li
        v-for="(order, index) in orders.orders"
        :key="index"
        class="
          list-group-item
          d-flex
          justify-content-between
          align-items-center
        "
      >
        <input
          v-model="order.buyed"
          class="btn-check"
          type="checkbox"
          :disabled="active"
        />

        <input
          :id="order._id"
          v-model="order.buyed"
          type="checkbox"
          class="btn-check"
          autocomplete="off"
          :disabled="active"
        />
        <label class="btn btn-outline-primary" :for="order._id"
          >{{ order.itemId.name }} - {{ order.model }} -
          {{ order.quantity }}</label
        >

        <span class="badge badge-primary badge-pill"
          ><button class="btn btn-info" @click="onEdit(order._id)">
            EDITAR
          </button></span
        >
      </li>
    </ul>
  </div>
  <div class="btn-toolbar justify-content-between p-2">
    <button class="btn btn-success" @click="onInsert">AÑADIR</button>
    <button class="btn btn-warning" @click="onActive">{{ textButton }}</button>
  </div>
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
      await carga();
    };

    const onEdit = function (id) {
      orders.id = id;
      router.push({ name: 'Editorder' });
    };

    const onExit = function () {
      users.statusLogin.logded = false;
      router.push({ name: 'Login' });
    };

    return {
      onExit,
      onInsert,
      onActive,
      onEdit,
      orders,
      users,
      active,
      textButton,
    };
  },
};
</script>

<style></style>
