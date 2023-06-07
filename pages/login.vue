<script setup lang="ts">
const client = useSupabaseAuthClient();
const loginMode = ref<boolean>(false);
const email = ref<string>("");
const password = ref<string>("");

const login = async () => {
  let { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    alert("Error!");
    return;
  }
  alert("OK");
  useRouter().push("/dashboard");
};

const register = async () => {
  let { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    alert("Error!");
    return;
  }
  alert("OK");
  useRouter().push("/dashboard");
};

const auth = () => {
  loginMode.value ? login() : register();
};
</script>
<template>
  <div class="card">
    <div class="form-control">
      <label for="">E-mail</label>
      <input type="email" v-model="email" placeholder="test@test.com" />
    </div>
    <div class="form-control">
      <label for="">Password</label>
      <input type="password" v-model="password" placeholder="*****" />
    </div>
    <div>
      <button class="w-full mt-8 btn" @click="auth">
        <template v-if="loginMode"> Login! </template>
        <template v-else> Register </template>
      </button>
    </div>
    <div class="cursor-pointer" @click="loginMode = !loginMode">
      <template v-if="loginMode">
        If you want to register? Please Click..
      </template>
      <template v-else> If you want to login? Please Click.. </template>
    </div>
  </div>
</template>