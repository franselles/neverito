<template>
  <div class="p-2">
    <h3>BIENVENIDO A NEVERITO</h3>
  </div>
  <div class="p-2">0.1.15</div>
  <div class="p-2">
    <form @submit.prevent="onSubmit">
      <div>
        <label class="form-label" for="pin">PIN</label>
        <input v-model="pin" type="text" maxlength="4" class="form-control" />
      </div>
      <div class="p-2">
        <input type="submit" class="btn btn-primary" />
      </div>
    </form>
  </div>
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
