<script setup lang="ts">
  import { Table } from 'win7-vue'

  const files = [
    { name: 'readme.txt', size: '1 KB', type: 'Text Document' },
    { name: 'photo.jpg', size: '240 KB', type: 'JPEG Image' },
    { name: 'setup.exe', size: '3.2 MB', type: 'Application' },
    { name: 'notes.doc', size: '18 KB', type: 'Word Document' },
  ]
</script>

<template>
  <Table
    :headers="[
      { key: 'name', title: 'Name' },
      { key: 'size', title: 'Size', center: true },
      { key: 'type', title: 'Type' },
    ]"
    :items="files"
    item-key="name"
    striped
    hover
    full
  >
    <template #cell-name="{ value }">
      <strong>{{ value }}</strong>
    </template>
  </Table>
</template>
