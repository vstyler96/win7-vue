<script setup lang="ts">
  import { computed, nextTick, ref, watch } from 'vue'

  export interface PaletteEntry {
    label: string
    hint?: string
    section: string
    anchor?: string
  }

  const open = defineModel<boolean>({ required: true })
  const { entries } = defineProps<{ entries: PaletteEntry[] }>()
  const emit = defineEmits<{ select: [entry: PaletteEntry] }>()

  const query = ref('')
  const active = ref(0)
  const inputEl = ref<HTMLInputElement>()

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(e =>
      (e.label + ' ' + (e.hint ?? '') + ' ' + e.section).toLowerCase().includes(q),
    )
  })

  watch(results, () => { active.value = 0 })
  watch(open, async (isOpen) => {
    if (!isOpen) return
    query.value = ''
    active.value = 0
    await nextTick()
    inputEl.value?.focus()
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
    else if (e.key === 'Escape') { open.value = false }
  }
</script>

<template>
  <div v-if="open" class="palette-overlay" @click="open = false">
    <div class="palette" @click.stop>
      <input
        ref="inputEl"
        v-model="query"
        class="palette-input"
        type="text"
        placeholder="Search sections and components…"
        @keydown="onKeydown"
      />
      <ul class="palette-list">
        <li
          v-for="(entry, i) in results"
          :key="entry.section + (entry.anchor ?? '')"
          :class="{ active: i === active }"
          @mouseenter="active = i"
          @click="choose(entry)"
        >
          <span class="palette-label">{{ entry.label }}</span>
          <span v-if="entry.hint" class="palette-hint">{{ entry.hint }}</span>
        </li>
        <li v-if="!results.length" class="palette-empty">No matches</li>
      </ul>
      <div class="palette-footer">↑↓ navigate · ↵ open · esc close</div>
    </div>
  </div>
</template>

<style scoped>
  .palette-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 12vh;
    z-index: 9999;
  }
  .palette {
    width: min(560px, 92vw);
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    font-family: system-ui, sans-serif;
  }
  .palette-input {
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid #e2e2e2;
    padding: 14px 16px;
    font-size: 15px;
    outline: none;
  }
  .palette-list {
    list-style: none;
    margin: 0;
    padding: 6px;
    max-height: 320px;
    overflow-y: auto;
  }
  .palette-list li {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 9px 12px;
    border-radius: 6px;
    cursor: pointer;
  }
  .palette-list li.active {
    background: #245dab;
    color: #fff;
  }
  .palette-label { font-weight: 500; }
  .palette-hint { font-size: 12px; opacity: 0.7; margin-left: auto; }
  .palette-empty { justify-content: center; color: #888; cursor: default; }
  .palette-footer {
    padding: 8px 14px;
    border-top: 1px solid #e2e2e2;
    font-size: 11px;
    color: #888;
    background: #fafafa;
  }
</style>
