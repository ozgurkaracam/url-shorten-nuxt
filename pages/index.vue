<script setup >
useHead({
  title: "Shorten!",
});
</script>
<template>
  <div
    class="py-32 h-full flex flex-col space-y-24 justify-between items-center"
  >
    <section class="text-7xl">Shorten Your Links!</section>
    <div class="flex flex-col items-center space-y-8">
      <section class="text-4xl">Easiest Way!</section>
      <section>
        <NuxtLink to="/dashboard" class="btn">Let's Short Your Link!</NuxtLink>
      </section>
    </div>
  </div>
</template>