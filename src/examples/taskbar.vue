<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Button, StartButton, StartMenu, StartMenuItem, StartMenuPicture,
    StartMenuStarredItem, TaskBar,
  } from 'win7-vue'

  const open = ref(false)
  const last = ref('')
</script>

<template>
  <StartMenu
    v-model:open="open"
    @main-action="last = 'Shut down'"
  >
    <template #items>
      <StartMenuItem
        icon="monitor"
        text="Computer"
        @click="last = 'Computer'"
      />
      <StartMenuItem
        icon="monitor"
        text="Control Panel"
        @click="last = 'Control Panel'"
      />
    </template>

    <template #picture>
      <StartMenuPicture src="/windows_vista.jpg" alt="User" />
    </template>

    <template #starred-items>
      <StartMenuStarredItem text="Documents" @click="last = 'Documents'" />
      <StartMenuStarredItem text="Pictures" @click="last = 'Pictures'" />
      <StartMenuStarredItem text="Music" @click="last = 'Music'" />
    </template>

    <template #main-action>
      Shut down
    </template>
    <template #actions-dropdown-items>
      <StartMenuItem text="Switch user" @click="last = 'Switch user'" />
      <StartMenuItem text="Log off" @click="last = 'Log off'" />
      <StartMenuItem text="Lock" @click="last = 'Lock'" />
    </template>
  </StartMenu>

  <TaskBar
    clock
    show-desktop
    @show-desktop="last = 'Show desktop'"
  >
    <template #start>
      <StartButton v-model:open="open">
        Start
      </StartButton>
    </template>
    <Button text="Explorer" />
    <template #tray>
      🔊
    </template>
  </TaskBar>

  <p>Last action: {{ last || 'none' }}</p>
</template>
