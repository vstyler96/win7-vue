<script lang="ts">
  import hljs from 'highlight.js/lib/core'
  import xml from 'highlight.js/lib/languages/xml'
  import javascript from 'highlight.js/lib/languages/javascript'
  import typescript from 'highlight.js/lib/languages/typescript'
  import bash from 'highlight.js/lib/languages/bash'

  hljs.registerLanguage('xml', xml)
  hljs.registerLanguage('html', xml)
  hljs.registerLanguage('vue', xml)
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('bash', bash)
</script>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { Collapse } from 'win7-vue'

  defineOptions({ name: 'CodePreview' })

  const {
    code,
    language = 'vue',
    title = 'Show Code',
    open = false,
  } = defineProps<{
    code: string
    language?: string
    title?: string
    /** Render expanded by default (used for docs/install snippets). */
    open?: boolean
  }>()

  const isOpen = ref(open)

  const highlightedCode = computed(() => {
    const trimmedCode = code.trim()

    try {
      return hljs.highlight(trimmedCode, { language }).value
    } catch {
      return trimmedCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    }
  })
</script>

<template>
  <div style="display: block; padding: 1em;">
    <!-- eslint-disable -->
    <Collapse
      v-model:open="isOpen"
      :title
    ><pre><code :class="`hljs language-${language}`" v-html="highlightedCode" /></pre></Collapse>
    <!-- eslint-enable -->
  </div>
</template>

