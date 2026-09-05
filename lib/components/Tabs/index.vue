<script setup lang="ts">
  defineOptions({ name: 'WinTabs' })

  const {
    tabs,
    justified = false,
  } = defineProps<{
    /** Map of tab key -> tab title. Each key is also the panel's slot name. */
    tabs: Record<string, string>
    justified?: boolean
  }>()

  const model = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <menu
      role="tablist"
      :class="{ justified }"
    >
      <button
        v-for="(title, tab) in tabs"
        :key="tab"
        role="tab"
        :aria-selected="model === tab"
        @click="model = tab"
      >
        {{ title }}
      </button>
    </menu>

    <article
      v-for="(title, tab) in tabs"
      :key="tab"
      role="tabpanel"
      :hidden="model !== tab"
    >
      <slot
        :name="tab"
        :title="title"
        :tab="tab"
        :hidden="model !== tab"
      />
    </article>
  </div>
</template>
