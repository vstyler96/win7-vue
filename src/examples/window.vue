<script setup lang="ts">
  import { ref } from 'vue'
  import { Button, Window } from 'win7-vue'

  const draggableOpen = ref(false)
  const notify = (message: string) => window.alert(message)
</script>

<template>
  <div>
    <Window title="Basic Window" active>
      <p>This is a basic window component.</p>
    </Window>

    <Window
      title="Window with Controls"
      width="300px"
      minimizable
      maximizable
      closable
      has-status
      :status-fields="['Ready', 'Items: 5']"
      @minimize="notify('Minimize clicked!')"
      @maximize="notify('Maximize clicked!')"
      @close="notify('Close clicked!')"
    >
      <p>This window has minimize, maximize, and close buttons.</p>
    </Window>
  </div>

  <p>Draggable Window (click button to show):</p>
  <Button @click="draggableOpen = true">
    Open Draggable Window
  </Button>

  <Window
    v-if="draggableOpen"
    title="Draggable Window"
    width="350px"
    draggable
    closable
    snap-to-edges
    :snap-threshold="15"
    :default-x="100"
    :default-y="100"
    active
    @close="draggableOpen = false"
  >
    <p>Drag me by the title bar!</p>
    <ul>
      <li>Touch &amp; mouse support</li>
      <li>Snap to edges</li>
      <li>Constrained to viewport</li>
      <li>Click to bring to front</li>
    </ul>
  </Window>
</template>
