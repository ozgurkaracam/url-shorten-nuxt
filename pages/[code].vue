<script setup>
const { code } = useRoute().params;
// if (!link) return navigateTo("/");
const client = useSupabaseClient();
const { data } = await useAsyncData(async function () {
  let { data: link, error } = await client
    .from("links")
    .select("*")
    .eq("code", code)
    .single();
  return { link };
});
navigateTo(data.value.link.long_link, { external: true });
</script>

<template>{{ data.link }}</template>