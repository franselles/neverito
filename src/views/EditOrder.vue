<template>
  <div class="p-2">
    <h4>EDITAR LA LISTA PARA COMPRAR</h4>
  </div>
  <div class="p-2">
    <button class="btn btn-info" @click="onBack">REGRESAR</button>
  </div>
  <div class="p-2">
    <form @submit.prevent="onSubmit">
      <div>
        <label class="form-label" for="model">Modelo</label>
        <input v-model="currentOrder.model" type="text" class="form-control" />
      </div>
      <div>
        <label class="form-label" for="quantiy">Cantidad</label>
        <input
          v-model="currentOrder.quantity"
          type="number"
          class="form-control"
        />
      </div>
      <div
        class="p-2 d-flex justify-content-between"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <input class="btn btn-success" type="submit" value="CAMBIAR" />
        <button class="btn btn-danger" @click="onDelete">BORRAR</button>
      </div>
    </form>
  </div>
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
