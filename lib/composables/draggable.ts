import { ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'
import { clamp } from '../utils/helpers'

/** Stacking base for windows; each focus/drag lifts a window above all others. */
export const BASE_Z_INDEX = 900
let topZIndex = BASE_Z_INDEX

export type DraggableOptions = {
  enabled?: MaybeRefOrGetter<boolean>
  defaultX?: number | string
  defaultY?: number | string
  snapToEdges?: MaybeRefOrGetter<boolean>
  snapThreshold?: MaybeRefOrGetter<number>
  /** Keep the element fully inside the viewport. */
  constrain?: MaybeRefOrGetter<boolean>
}

export type DraggableEvents = {
  onDragStart?: (x: number, y: number) => void
  onDragEnd?: (x: number, y: number) => void
  onPositionChange?: (x: number, y: number) => void
}

/**
 * Pointer-driven dragging for a fixed-position element by its handle, with
 * viewport clamping, edge snapping and cross-instance z-index stacking.
 */
export default function useDraggable(
  elementRef: Ref<HTMLElement | null>,
  handleRef: Ref<HTMLElement | null>,
  options: DraggableOptions = {},
  events: DraggableEvents = {},
) {
  const {
    enabled = true,
    defaultX = 0,
    defaultY = 0,
    snapToEdges = false,
    snapThreshold = 20,
    constrain = true,
  } = options

  const x = ref(Number(defaultX) || 0)
  const y = ref(Number(defaultY) || 0)
  const dragging = ref(false)
  const zIndex = ref(BASE_Z_INDEX)

  let lastX = 0
  let lastY = 0

  function bounds() {
    const rect = elementRef.value?.getBoundingClientRect()
    return {
      maxX: window.innerWidth - (rect?.width ?? 0),
      maxY: window.innerHeight - (rect?.height ?? 0),
    }
  }

  function constrainPosition(posX: number, posY: number) {
    if (!toValue(constrain)) return { x: posX, y: posY }
    const { maxX, maxY } = bounds()
    return { x: clamp(posX, 0, maxX), y: clamp(posY, 0, maxY) }
  }

  function snap(posX: number, posY: number) {
    if (!toValue(snapToEdges)) return { x: posX, y: posY }
    const threshold = toValue(snapThreshold)
    const { maxX, maxY } = bounds()
    const near = (value: number, edge: number) => Math.abs(value - edge) < threshold
    return {
      x: near(posX, 0) ? 0 : near(posX, maxX) ? maxX : posX,
      y: near(posY, 0) ? 0 : near(posY, maxY) ? maxY : posY,
    }
  }

  function focus() {
    zIndex.value = ++topZIndex
  }

  function onPointerDown(e: PointerEvent) {
    if (!toValue(enabled) || (e.target as Element).closest('button')) return
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    lastX = e.clientX
    lastY = e.clientY
    dragging.value = true
    focus()
    events.onDragStart?.(x.value, y.value)
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging.value) return
    const constrained = constrainPosition(x.value + e.clientX - lastX, y.value + e.clientY - lastY)
    const snapped = snap(constrained.x, constrained.y)
    lastX = e.clientX
    lastY = e.clientY
    x.value = snapped.x
    y.value = snapped.y
  }

  function onPointerUp() {
    if (!dragging.value) return
    dragging.value = false
    events.onDragEnd?.(x.value, y.value)
  }

  // Pointer capture keeps move/up on the handle, so no document listeners.
  watch(handleRef, (handle, _, onCleanup) => {
    if (!handle) return
    handle.addEventListener('pointerdown', onPointerDown)
    handle.addEventListener('pointermove', onPointerMove)
    handle.addEventListener('pointerup', onPointerUp)
    handle.addEventListener('pointercancel', onPointerUp)
    onCleanup(() => {
      handle.removeEventListener('pointerdown', onPointerDown)
      handle.removeEventListener('pointermove', onPointerMove)
      handle.removeEventListener('pointerup', onPointerUp)
      handle.removeEventListener('pointercancel', onPointerUp)
    })
  }, { immediate: true })

  watch([x, y], ([newX, newY]) => events.onPositionChange?.(newX, newY))

  function setPosition(newX: number, newY: number, constrainIt = true) {
    const pos = constrainIt ? constrainPosition(newX, newY) : { x: newX, y: newY }
    x.value = pos.x
    y.value = pos.y
  }

  function center() {
    const { maxX, maxY } = bounds()
    setPosition(maxX / 2, maxY / 2, false)
  }

  return { x, y, dragging, zIndex, setPosition, center, focus }
}
