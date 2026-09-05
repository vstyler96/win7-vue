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
  import { Collapse } from '../../lib/components'

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
      return hljs.highlight(trimmedCode, { language: language || 'vue' }).value
    } catch {
      return trimmedCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    }
  })
</script>

<template>
  <Collapse
    v-model:open="isOpen"
    class="code-preview"
    :title
  >
    <pre class="code-preview-pre"><code
      :class="`hljs language-${language}`"
      v-html="highlightedCode"
    /></pre>
  </Collapse>
</template>

<style>
  .code-preview {
    margin-top: 12px;
  }

  .code-preview summary {
    cursor: pointer;
    user-select: none;
  }

  .code-preview-pre {
    margin: 0;
    padding: 12px;
    background: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 3px;
    overflow-x: auto;
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.4;
  }

  .code-preview-pre code {
    background: transparent;
    padding: 0;
    white-space: pre;
    word-break: normal;
    word-wrap: normal;
  }

  .code-preview .hljs {
    display: block;
    overflow-x: auto;
    background: transparent;
  }
</style>
