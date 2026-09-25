<script setup lang="ts">
  import { ref } from 'vue'
  import { Menu, MenuBar, MenuItem } from 'win7-vue'

  const iconSize = ref('md')
  const autoArrange = ref(false)
  const alignGrid = ref(true)
</script>

<template>
  <p>MenuBar with dropdown menus (hover to open):</p>
  <MenuBar can-hover>
    <MenuItem>
      File
      <template #submenu>
        <Menu>
          <MenuItem><button>New</button></MenuItem>
          <MenuItem><button>Open</button></MenuItem>
          <hr />
          <MenuItem><button>Exit</button></MenuItem>
        </Menu>
      </template>
    </MenuItem>
    <MenuItem>
      Edit
      <template #submenu>
        <Menu>
          <MenuItem><button>Undo</button></MenuItem>
          <MenuItem><button>Copy</button></MenuItem>
          <MenuItem><button>Paste</button></MenuItem>
        </Menu>
      </template>
    </MenuItem>
    <MenuItem>View</MenuItem>
  </MenuBar>

  <p>Menu with Checkbox/Radio options:</p>
  <Menu>
    <MenuItem
      v-model="iconSize"
      :option="{ as: 'radio', id: 'size-lg', name: 'size' }"
      value="lg"
    >
      Large icons
    </MenuItem>
    <MenuItem
      v-model="iconSize"
      :option="{ as: 'radio', id: 'size-md', name: 'size' }"
      value="md"
    >
      Medium icons
    </MenuItem>
    <MenuItem
      v-model="iconSize"
      :option="{ as: 'radio', id: 'size-sm', name: 'size' }"
      value="sm"
    >
      Small icons
    </MenuItem>
    <hr />
    <MenuItem v-model="autoArrange" :option="{ as: 'checkbox', id: 'arrange' }">
      Auto arrange icons
    </MenuItem>
    <MenuItem v-model="alignGrid" :option="{ as: 'checkbox', id: 'align' }">
      Align icons to grid
    </MenuItem>
  </Menu>
  <p>Icon size: {{ iconSize }} | Auto arrange: {{ autoArrange }} | Align grid: {{ alignGrid }}</p>
</template>
