<script setup lang="ts">
  import { ref } from 'vue'
  import { Button, Dialog } from 'win7-vue'

  const open = ref(false)
  const persistentOpen = ref(false)
</script>

<template>
  <div class="component-row">
    <Button @click="open = true">
      Show Dialog
    </Button>
    <Button @click="persistentOpen = true">
      Open Persistent Dialog
    </Button>
  </div>

  <Dialog
    v-model="open"
    title="Sample Dialog"
    message="This is a sample dialog with a message."
    draggable
    @accept="console.log('Accepted')"
    @cancel="console.log('Cancelled')"
  />

  <Dialog
    v-model="persistentOpen"
    title="Persistent Dialog"
    persistent
    closable
    @close="persistentOpen = false"
    @cancel="persistentOpen = false"
    @accept="persistentOpen = false"
  >
    <p>This dialog cannot be closed by clicking outside or pressing ESC.</p>
    <p>Use the close button (X) or the buttons below to close it.</p>
  </Dialog>
</template>
