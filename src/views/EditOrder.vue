<template>
  <h4>EDITAR LA LISTA PARA COMPRAR (edit order)</h4>
  <br />
  <button @click="onBack">REGRESAR</button>
  <br />
  <br />
  <form @submit.prevent="onSubmit">
    <div>
      <label for="model">Modelo</label>
      <input v-model="currentOrder.model" type="text" />
    </div>
    <div>
      <label for="quantiy">Cantidad</label>
      <input v-model="currentOrder.quantity" type="number" />
    </div>
    <br />
    <br />
    <input type="submit" value="CAMBIAR" />
  </form>
  <br />
  <br />
  <button @click="onDelete">BORRAR</button>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { orderStore } from '../store/orderStore';

export default {
  setup() {
    const router = useRouter();
    const order = orderStore();

    const currentOrder = ref({});

    const find = async function () {
      await order.findOrder();
      currentOrder.value = order.currentOrder;
    };

    find();

    const onSubmit = async function () {
      order.currentOrder = currentOrder.value;
      await order.putOrders();
      router.push({ name: 'CurrentOrder' });
    };

    const onDelete = async function () {
      if (currentOrder.value._id != null) {
        await order.deleteOrder(currentOrder.value);
      }
      router.push({ name: 'CurrentOrder' });
    };

    const onBack = async function () {
      router.push({ name: 'CurrentOrder' });
    };

    return {
      currentOrder,
      onSubmit,
      onDelete,
      onBack,
    };
  },
};
</script>

<style></style>
