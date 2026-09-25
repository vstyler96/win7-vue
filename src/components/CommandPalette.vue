<script setup lang="ts">
  import { computed, nextTick, ref, watch } from 'vue'
  import { Button, Dialog, Searchbox } from 'win7-vue'

  export interface PaletteEntry {
    label: string
    hint?: string
    path: string
    anchor?: string
  }

  const open = defineModel<boolean>({ required: true })
  const { entries } = defineProps<{ entries: PaletteEntry[] }>()
  const emit = defineEmits<{ select: [entry: PaletteEntry] }>()

  const query = ref('')
  const active = ref(0)
  const search = ref<{ $el: HTMLInputElement }>()

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(e =>
      (e.label + ' ' + (e.hint ?? '') + ' ' + e.path).toLowerCase().includes(q),
    )
  })
  watch(results, () => { active.value = 0 })
  watch(open, async isOpen => {
    if (!isOpen) return
    query.value = ''
    active.value = 0
    await nextTick()
    search.value?.$el.focus()
  })

  function choose(entry?: PaletteEntry) {
    if (!entry) return
    emit('select', entry)
    open.value = false
  }

  // Escape is handled by the Dialog.
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); active.value = Math.min(active.value + 1, results.value.length - 1) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active.value = Math.max(active.value - 1, 0) }
    else if (e.key === 'Enter') { e.preventDefault(); choose(results.value[active.value]) }
  }
</script>

<template>
  <Dialog
    v-model="open"
    title="Search"
    width="480px"
    :show-actions="false"
    closable
  >
    <Searchbox
      ref="search"
      v-model="query"
      instant
      placeholder="Search sections and components…"
      @keydown="onKeydown"
    />
    <!-- TODO: back to <Listbox> once every theme styles it; only 7.css does today. -->
    <template v-if="results.length">
      <div
        v-for="(entry, i) in results"
        :key="entry.label + entry.path"
      >
        <Button @click="choose(entry)">
          {{ i === active ? '▶ ' : '' }}{{ entry.label }}{{ entry.hint ? ` — ${entry.hint}` : '' }}
        </Button>
      </div>
    </template>
    <p v-else>
      No matches
    </p>
    <p>↑↓ navigate · ↵ open · esc close</p>
  </Dialog>
</template>
