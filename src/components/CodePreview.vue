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
  // Docs-shell code block (docs.css): a caption bar with a copy button over highlighted code.
  import { computed, ref } from 'vue'

  defineOptions({ name: 'CodePreview' })

  const {
    code,
    language = 'vue',
    title = undefined,
  } = defineProps<{
    code: string
    language?: string
    /** Caption; defaults to the language. */
    title?: string
  }>()

  const highlightedCode = computed(() => {
    const trimmedCode = code.trim()
    try {
      return hljs.highlight(trimmedCode, { language }).value
    } catch {
      return trimmedCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
  })

  const copied = ref(false)
  async function copy() {
    await navigator.clipboard.writeText(code.trim())
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  }
</script>

<template>
  <figure class="docs-code">
    <figcaption class="docs-code-head">
      <span>{{ title ?? language }}</span>
      <button
        class="docs-btn"
        @click="copy"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </figcaption>
    <!-- eslint-disable-next-line vue/no-v-html -- highlight.js output of our own sources -->
    <pre><code :class="`hljs language-${language}`" v-html="highlightedCode" /></pre>
  </figure>
</template>
