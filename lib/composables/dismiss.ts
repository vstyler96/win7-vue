import { watch, type Ref } from 'vue'

export type DismissOptions = {
  /** Clicks outside this element dismiss. Omit to only dismiss on Escape. */
  el?: Ref<HTMLElement | null>
  /** Selector for outside elements that must not dismiss (e.g. the toggle button). */
  ignore?: string
  /** Called instead of setting `open` to false (e.g. to emit or veto). */
  onDismiss?: () => void
}

// Open popups, innermost last: Escape only dismisses the top one.
const stack: (() => void)[] = []

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') stack[stack.length - 1]?.()
}

/** Dismisses a popup on Escape and, with `el`, on pointerdown outside it. */
export function useDismiss(open: Ref<boolean>, { el, ignore, onDismiss }: DismissOptions = {}) {
  const dismiss = onDismiss ?? (() => { open.value = false })

  function onPointerdown(e: PointerEvent) {
    const target = e.target as Element
    if (el?.value?.contains(target) || (ignore && target.closest(ignore))) return
    dismiss()
  }

  watch(open, (isOpen, _, onCleanup) => {
    if (!isOpen) return
    if (!stack.length) document.addEventListener('keydown', onKeydown)
    stack.push(dismiss)
    if (el) document.addEventListener('pointerdown', onPointerdown)

    onCleanup(() => {
      stack.splice(stack.indexOf(dismiss), 1)
      if (!stack.length) document.removeEventListener('keydown', onKeydown)
      if (el) document.removeEventListener('pointerdown', onPointerdown)
    })
  }, { immediate: true })
}
