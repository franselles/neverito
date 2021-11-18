<template>
  <h4>AÑADIR ITEM A LA LISTA PARA COMPRAR (add item order)</h4>
  <br />
  <button @click="onBack">REGRESAR</button>
  <br />
  <br />
  <div>
    <input
      v-model="textSearch"
      type="text"
      placeholder="Busca elemento"
      autocomplete="off"
      @keyup="filterOptions"
    />
    <br />
    <br />
    <div v-for="(item, index) in options" :key="index" :value="item">
      <input v-model="selected" :value="item" type="radio" />
      <label>{{ item.name }}</label>
    </div>
  </div>
  <br />
  <br />
  <div>
    <label for="model">Modelo</label>
    <input v-model="newItem.model" type="text" />
  </div>
  <br />
  <div>
    <label for="quantiy">Cantidad</label>
    <input v-model="newItem.quantity" type="number" />
  </div>
  <br />
  <br />
  <div>
    <input type="button" value="ACEPTAR" @click="onSubmit" />
  </div>
  <br />
  <br />
  <div>
    <input type="button" value="NUEVO ITEM" @click="createItem" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { itemStore } from '../store/itemStore';
import { userStore } from '../store/userStore';
import { orderStore } from '../store/orderStore';

export default {
  setup() {
    const item = itemStore();
    const user = userStore();
    const order = orderStore();

    const router = useRouter();

    let itemsList = [];

    const newItem = ref({
      familyId: user.user.familyId,
      itemId: '',
      userId: user.user._id,
      model: '',
      quantity: 1,
      buyed: false,
    });
    const options = ref([]);
    const textSearch = ref('');
    const selected = ref({});

    const getItemsLocal = async function () {
      await item.getItems();
      itemsList = item.items;
      options.value = itemsList;
    };

    getItemsLocal();

    const findMatches = function (search, options) {
      return options.filter((option) => {
        const regex = new RegExp(search, 'gi');
        return option.name.match(regex);
      });
    };

    const filterOptions = function () {
      options.value = itemsList;

      const matchArray = findMatches(textSearch.value, options.value);
      options.value = [...matchArray];
    };

    const onSubmit = async function () {
      if (selected.value._id != null && newItem.value.quantity > 0) {
        newItem.value.itemId = selected.value._id;
        await order.postOrder(newItem.value);
        router.push({ name: 'CurrentOrder' });
      }
    };

    const createItem = function () {
      router.push({ name: 'ListItems' });
    };

    const onBack = async function () {
      router.push({ name: 'CurrentOrder' });
    };

    return {
      options,
      filterOptions,
      textSearch,
      selected,
      newItem,
      onSubmit,
      createItem,
      onBack,
    };
  },
};
</script>

<style></style>
