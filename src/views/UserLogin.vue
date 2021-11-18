<template>
  <h3>BIENVENIDO A NEVERITO</h3>
  0.1.3
  <form @submit.prevent="onSubmit">
    <div>
      <label for="pin">PIN</label>
      <input v-model="pin" type="text" maxlength="4" />
    </div>
    <div>
      <input type="submit" />
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '../store/userStore';

export default {
  setup() {
    const router = useRouter();
    const store = userStore();

    const pin = ref('');
    async function onSubmit() {
      await store.loginUser(pin.value);
      if (store.statusLogin.logded) {
        router.push({ name: 'CurrentOrder' });
      }
    }

    return {
      onSubmit,
      pin,
      store,
    };
  },
};
</script>

<style></style>
