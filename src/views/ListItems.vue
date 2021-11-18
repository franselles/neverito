<template>
  <h4>LISTA DE ITEMS DISPONIBLE PARA COMPRAR (list items)</h4>
  <br />
  <button @click="onBack">REGRESAR</button>
  <br />
  <br />
  <input
    v-model="textSearch"
    type="text"
    placeholder="Busca elemento"
    autocomplete="off"
    @keyup="filterOptions"
  />
  <br />
  <br />
  <div v-for="(item, index) in itemList" :key="index" :value="item">
    <input v-model="selected" :value="item" type="radio" />
    <label>{{ item.name }}</label>
  </div>
  <br />
  <br />
  <button @click="onDelete">BORRAR</button>
  <br />
  <br />
  <label>NUEVO ELEMENTO</label>
  <input v-model="newItemName" type="text" />
  <br />
  <br />
  <br />
  <button @click="onAccept">AÑADIR ELEMENTO</button>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { itemStore } from '../store/itemStore';

export default {
  setup() {
    const item = itemStore();
    const router = useRouter();

    const itemList = ref([]);
    const selected = ref({});
    const textSearch = ref('');
    const newItemName = ref('');
    let itemFilter = [];

    const getItems = async function () {
      await item.getItems();
      itemList.value = item.items;
    };

    getItems();

    const findMatches = function (search, options) {
      return options.filter((option) => {
        const regex = new RegExp(search, 'gi');
        return option.name.match(regex);
      });
    };

    const filterOptions = function () {
      itemList.value = itemFilter;

      const matchArray = findMatches(textSearch.value, itemList.value);
      itemList.value = [...matchArray];
    };

    const onAccept = async function () {
      if (newItemName.value != '') {
        await item.postItem(newItemName.value);
      }
      getItems();
      newItemName.value = '';
    };

    const onDelete = async function () {
      if (selected.value._id != null) {
        await item.deleteItem(selected.value._id);
      }
      getItems();
    };

    const onBack = async function () {
      router.push({ name: 'AddItemOrder' });
    };

    return {
      filterOptions,
      onAccept,
      onBack,
      onDelete,
      itemList,
      selected,
      textSearch,
      newItemName,
    };
  },
};
</script>

<style></style>
