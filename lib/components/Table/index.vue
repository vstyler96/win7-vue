<script lang="ts">
  export interface TableHeader<T> {
    key: keyof T & string
    title: string
    /** Adds `.is-center` to the column's th/td. */
    center?: boolean
  }
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
  defineOptions({ name: 'WinTable' })

  const {
    headers,
    items,
    itemKey = undefined,
    striped = false,
    hover = false,
    full = false,
    shadow = false,
  } = defineProps<{
    headers: readonly TableHeader<T>[]
    items: T[]
    /** Row key; defaults to the row index. */
    itemKey?: keyof T & string
    striped?: boolean
    hover?: boolean
    full?: boolean
    shadow?: boolean
  }>()

  // One optional slot per column, `#cell-<key>="{ item, value }"`, to render custom cells.
  defineSlots<{ [K in `cell-${string}`]?: (props: { item: T, value: unknown }) => unknown }>()
</script>

<template>
  <table :class="{ 'is-striped': striped, 'has-hover': hover, 'is-full': full, 'has-shadow': shadow }">
    <thead>
      <tr>
        <th
          v-for="h in headers"
          :key="h.key"
          :class="{ 'is-center': h.center }"
        >
          {{ h.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="itemKey ? item[itemKey] : index"
      >
        <td
          v-for="h in headers"
          :key="h.key"
          :class="{ 'is-center': h.center }"
        >
          <slot
            :name="`cell-${h.key}`"
            :item
            :value="item[h.key]"
          >
            {{ item[h.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
