<script setup lang="ts">
  import { Link } from 'win7-vue'
</script>

<template>
  <div>
    <Link href="#" text="Regular Link" />
    <Link to="/themes" text="Router Link" />
    <Link text="Button Link" />
    <Link
      href="https://github.com"
      target="_blank"
      text="External Link"
    />
  </div>
</template>
