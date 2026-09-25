import type { InjectionKey } from 'vue'

/** Provided by StartMenu; items call it to close the menu once chosen. */
export const StartMenuCloseKey: InjectionKey<() => void> = Symbol('win:start-menu-close')
