<script setup>
import cryptoRandomString from "crypto-random-string";
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Dashboard",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const { data } = await useAsyncData("links", async function () {
  const links = await client
    .from("links")
    .select("*")
    .eq("user_id", user.value.id)
    .order("id", {
      ascending: false,
    });

  return { links };
});

// const { data, error } = await client.from("links").select("*").single();

const deleteLink = async (id) => {
  const { data, error } = await client.from("links").delete().eq("id", id);
  if (error) {
    alert(error.message);
    return;
  }
  refreshNuxtData();
  alert("DELETED!");
};

const long_link = ref("https://www.google.com");
const short = async () => {
  const result = await client.from("links").insert({
    long_link: long_link.value,
    code: cryptoRandomString({ length: 8, type: "alphanumeric" }),
    user_id: user.value.id,
  });
  if (result.error) {
    alert(result.error.message);
    return;
  }
  alert("Success!");
  refreshNuxtData();
};

const copy = (code) => {
  let link = `${location.origin}/${code}`;
  navigator.clipboard.writeText(link);
  alert("Copied!");
};
</script>

<template>
  <div class="py-24 space-y-6 w-full items-start justify-start h-full">
    <form
      @submit.prevent="short"
      class="bg-transparent border border-gray-400 w-full px-10 py-4 flex space-x-4"
    >
      <input
        v-model="long_link"
        type="text"
        placeholder="https://google.com"
        class="rounded-lg border-blue-600"
      />
      <button class="btn">Short!</button>
    </form>
    <div
      v-for="link in data.links.data"
      :key="link.id"
      class="flex items-center justify-between border-2 bg-gradient-to-l from-orange-600 border-orange-400 p-6 rounded-lg w-full"
    >
      <div class="flex flex-col space-y-2">
        <span>{{ link.long_link }}</span>
        <span
          class="w-24 bg-orange-600 rounded-full p-4 items-center flex justify-center"
        >
          {{ link.code }}
        </span>
      </div>
      <div class="flex space-x-2">
        <div class="cursor-pointer" @click="copy(link.code)">Copy</div>
        <div class="cursor-pointer" @click="deleteLink(link.id)">Delete</div>
      </div>
    </div>
  </div>
</template>