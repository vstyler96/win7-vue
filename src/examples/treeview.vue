<script setup lang="ts">
  import { Treeview } from 'win7-vue'
</script>

<template>
  <Treeview>
    <li>
      <details open>
        <summary>Documents</summary>
        <ul>
          <li>Work Files</li>
          <li>
            <details>
              <summary>Projects</summary>
              <ul>
                <li>Project A</li>
                <li>Project B</li>
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
    <li>Downloads</li>
  </Treeview>
</template>
