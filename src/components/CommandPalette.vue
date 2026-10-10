<script setup lang="ts">
  // Ctrl/⌘+K search, part of the docs shell: a native <dialog> styled by docs.css, so it
  // looks the same under every theme. showModal() gives Escape, focus trapping and ::backdrop.
  import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'

  export interface PaletteEntry {
    label: string
    hint?: string
    path: string
    hash?: string
  }

  const open = defineModel<boolean>({ required: true })
  const { entries } = defineProps<{ entries: PaletteEntry[] }>()
  const emit = defineEmits<{ select: [entry: PaletteEntry] }>()

  const dialog = useTemplateRef<HTMLDialogElement>('dialog')
  const input = useTemplateRef<HTMLInputElement>('input')
  const query = ref('')
  const active = ref(0)

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(e => `${e.label} ${e.hint ?? ''} ${e.path}`.toLowerCase().includes(q))
  })
  watch(results, () => { active.value = 0 })

  watch(open, async isOpen => {
    if (!isOpen) return dialog.value?.close()
    query.value = ''
    active.value = 0
    dialog.value?.showModal()
    await nextTick()
    input.value?.focus()
  })

  function choose(entry?: PaletteEntry) {
    if (!entry) return
    emit('select', entry)
    open.value = false
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); active.value = Math.min(active.value + 1, results.value.length - 1) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active.value = Math.max(active.value - 1, 0) }
    else if (e.key === 'Enter') { e.preventDefault(); choose(results.value[active.value]) }
  }
</script>

<template>
  <!-- Clicking the backdrop hits the <dialog> itself. -->
  <dialog
    ref="dialog"
    class="docs-palette"
    aria-label="Search"
    @close="open = false"
    @click="$event.target === dialog && (open = false)"
  >
    <input
      ref="input"
      v-model="query"
      type="search"
      placeholder="Search sections and components…"
      @keydown="onKeydown"
    >
    <ul v-if="results.length">
      <li
        v-for="(entry, i) in results"
        :key="entry.label + entry.path"
      >
        <button
          class="docs-btn"
          :class="{ 'is-active': i === active }"
          @mouseenter="active = i"
          @click="choose(entry)"
        >
          {{ entry.label }} <small>{{ entry.hint }}</small>
        </button>
      </li>
    </ul>
    <p
      v-else
      class="docs-palette-empty"
    >
      No matches
    </p>
    <p class="docs-palette-foot">
      ↑↓ navigate · ↵ open · esc close
    </p>
  </dialog>
</template>
