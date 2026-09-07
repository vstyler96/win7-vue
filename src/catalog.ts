// Single source of truth for the demo: navigation sections, the component list
// and which upstream stylesheet actually styles each one. Drives the sidebar,
// the Ctrl+K palette and the support badges.

export type ThemeKey = "win98" | "winxp" | "win7" | "macos";

export interface ThemeMeta {
  key: ThemeKey;
  label: string;
  short: string;
}

export const THEMES: ThemeMeta[] = [
  { key: "win98", label: "Windows 98", short: "98" },
  { key: "winxp", label: "Windows XP", short: "XP" },
  { key: "win7", label: "Windows 7", short: "7" },
  { key: "macos", label: "Mac OS (system.css)", short: "mac" },
];

export type SectionId = "install" | "requirements" | "themes" | "components";

export interface Section {
  id: SectionId;
  title: string;
  icon: string;
  /** Router path for this section. */
  path: string;
}

export const SECTIONS: Section[] = [
  { id: "install", title: "Installation", icon: "📦", path: "/installation" },
  { id: "requirements", title: "Requirements", icon: "✅", path: "/requirements" },
  { id: "themes", title: "Themes", icon: "🎨", path: "/themes" },
  { id: "components", title: "Components", icon: "🧩", path: "/components" },
];

const ALL: ThemeKey[] = ["win98", "winxp", "win7", "macos"];
const WINDOWS: ThemeKey[] = ["win98", "winxp", "win7"];

export interface ComponentMeta {
  /** anchor id inside the Components section (`cmp-<id>`) */
  id: string;
  name: string;
  /** upstream stylesheets that carry dedicated styling for this markup */
  themes: ThemeKey[];
  desc: string;
}

// Support = which upstream package ships dedicated CSS for the markup. Native
// controls & behavior-only components (Collapse, Icon, Link, Dialog) render the
// same everywhere. Verified against each package's shipped stylesheet.
export const COMPONENTS: ComponentMeta[] = [
  { id: "window", name: "Window", themes: ALL, desc: ".window / .title-bar chrome, draggable, min/max/close" },
  { id: "button", name: "Button", themes: ALL, desc: "native button (.btn on mac)" },
  { id: "textbox", name: "Textbox", themes: ALL, desc: "native input / textarea" },
  { id: "checkbox", name: "Checkbox", themes: ALL, desc: "native checkbox, array v-model" },
  { id: "radio", name: "Radio", themes: ALL, desc: "native radio group" },
  { id: "dropdown", name: "Dropdown", themes: ALL, desc: "native select, generic value" },
  { id: "listbox", name: "Listbox", themes: ALL, desc: "multi-row native select" },
  { id: "slider", name: "Slider", themes: ALL, desc: "native range input" },
  { id: "progress", name: "Progress", themes: ALL, desc: "determinate & indeterminate bar" },
  { id: "tabs", name: "Tabs", themes: WINDOWS, desc: 'role="tablist" tabs' },
  { id: "treeview", name: "Treeview", themes: WINDOWS, desc: "ul.tree-view with <details>" },
  { id: "groupbox", name: "Groupbox", themes: ALL, desc: "fieldset + legend" },
  { id: "collapse", name: "Collapse", themes: ALL, desc: "<details> disclosure (behavior)" },
  { id: "dialog", name: "Dialog", themes: ALL, desc: "modal window (behavior)" },
  { id: "link", name: "Link", themes: ALL, desc: "anchor / button link" },
  { id: "icon", name: "Icon", themes: ALL, desc: "inline icon" },
  { id: "menu", name: "Menu & MenuBar", themes: ["win7", "macos"], desc: "can-hover menus / .menu-items" },
  { id: "searchbox", name: "Searchbox", themes: ["win7"], desc: ".searchbox — 7.css only" },
  { id: "balloon", name: "Balloon", themes: ["win7"], desc: "glass tooltip — 7.css only" },
];

export const themeLabel = (key: string): string =>
  THEMES.find(t => t.key === key)?.label ?? key;
