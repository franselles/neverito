<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link :to="{ name: 'CurrentOrder' }" class="nav-link"
        >Compra Actual</router-link
      >
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'ListItems' }" class="nav-link"
        >Nuevos Elementos</router-link
      >
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'ViewBuyed' }" class="nav-link"
        >Compras Realizadas</router-link
      >
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="onExit">Salir</a>
    </li>
  </ul>
  <router-view />
</template>

<script>
import { useRouter } from 'vue-router';
import { userStore } from '../store/userStore';

export default {
  setup() {
    const router = useRouter();
    const users = userStore();

    const onExit = function () {
      users.statusLogin.logded = false;
      router.push({ name: 'Login' });
    };

    return {
      onExit,
    };
  },
};
</script>

<style></style>
