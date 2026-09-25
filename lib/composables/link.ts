import { computed, resolveDynamicComponent, type Component } from 'vue'

export type LinkTarget = { href?: string, to?: string | object }

/**
 * Picks the element for a clickable: RouterLink for `to` (plain <a> when
 * vue-router isn't installed), <a> for `href`, otherwise a native <button>.
 */
export function useLinkTag(link: () => LinkTarget) {
  const routerLink = resolveDynamicComponent('RouterLink')
  const hasRouter = typeof routerLink !== 'string'

  return computed<{ is: string | Component, attrs: Record<string, unknown> }>(() => {
    const { href, to } = link()
    if (to && hasRouter) return { is: routerLink as Component, attrs: { to } }
    if (to || href) return { is: 'a', attrs: { href: href ?? (typeof to === 'string' ? to : undefined) } }
    return { is: 'button', attrs: {} }
  })
}
