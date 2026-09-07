<template>
  <section>
    <h2>Components</h2>
    <p>
      Every component renders the verbatim upstream markup. A ✅ means that theme ships
      dedicated CSS for it; native controls &amp; behavior-only components look right
      everywhere. Cells without a ✅ simply fall back to the browser default under that theme.
    </p>

    <div class="matrix-wrap">
      <table class="matrix">
        <thead>
          <tr>
            <th>Component</th>
            <th v-for="t in THEMES" :key="t.key">{{ t.short }}</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in COMPONENTS" :key="c.id">
            <td><a :href="`#cmp-${c.id}`" @click.prevent="scrollTo(c.id)">{{ c.name }}</a></td>
            <td v-for="t in THEMES" :key="t.key" class="cell">
              {{ c.themes.includes(t.key) ? '✅' : '🟠' }}
            </td>
            <td class="matrix-note">{{ c.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button -->
    <fieldset id="cmp-button" class="component-section">
      <legend>Button</legend>
      <div class="component-row">
        <Button text="Default Button" />
        <Button text="Link Button" href="#" />
        <Button @click="dialogOpen = true">Open Dialog</Button>
      </div>
      <CodePreview :code="codeExamples.button" />
    </fieldset>

    <!-- Dialog -->
    <fieldset id="cmp-dialog" class="component-section">
      <legend>Dialog</legend>
      <div class="component-row">
        <Button @click="dialogOpen = true">Show Dialog</Button>
        <Button @click="persistentDialogOpen = true">Open Persistent Dialog</Button>
      </div>
      <Dialog
        v-model="dialogOpen"
        title="Sample Dialog"
        message="This is a sample dialog with a message."
        draggable
        @accept="console.log('Accepted')"
        @cancel="console.log('Cancelled')"
      />
      <Dialog
        v-model="persistentDialogOpen"
        title="Persistent Dialog"
        persistent
        closable
        draggable
        @close="persistentDialogOpen = false"
        @cancel="persistentDialogOpen = false"
        @accept="persistentDialogOpen = false"
      >
        <p>This dialog cannot be closed by clicking outside or pressing ESC.</p>
        <p>Use the close button (X) or the buttons below to close it.</p>
      </Dialog>
      <CodePreview :code="codeExamples.dialog" />
    </fieldset>

    <!-- Window -->
    <fieldset id="cmp-window" class="component-section">
      <legend>Window</legend>
      <div class="windows-container">
        <div>
          <Window title="Basic Window" active>
            <p>This is a basic window component.</p>
          </Window>
        </div>

        <Window
          title="Window with Controls"
          width="300px"
          minimizable
          maximizable
          closable
          :has-status="true"
          :status-fields="['Ready', 'Items: 5']"
          @minimize="showAlert('Minimize clicked!')"
          @maximize="showAlert('Maximize clicked!')"
          @close="showAlert('Close clicked!')"
        >
          <p>This window has minimize, maximize, and close buttons.</p>
        </Window>
      </div>

      <p style="margin-top: 16px">Draggable Window (click button to show):</p>
      <Button @click="draggableWindowOpen = true">Open Draggable Window</Button>

      <Window
        v-if="draggableWindowOpen"
        title="Draggable Window"
        width="350px"
        draggable
        closable
        snap-to-edges
        :snap-threshold="15"
        :default-x="100"
        :default-y="100"
        active
        @close="draggableWindowOpen = false"
      >
        <p>Drag me by the title bar!</p>
        <ul style="margin: 8px 0; padding-left: 20px">
          <li>Touch &amp; mouse support</li>
          <li>Snap to edges</li>
          <li>Constrained to viewport</li>
          <li>Click to bring to front</li>
        </ul>
      </Window>
      <CodePreview :code="codeExamples.window" />
    </fieldset>

    <!-- Textbox -->
    <fieldset id="cmp-textbox" class="component-section">
      <legend>Textbox</legend>
      <Groupbox title="Input Fields">
        <div class="form-group">
          <label>Text Input:</label>
          <Textbox v-model="textboxValue" placeholder="Enter text..." />
        </div>
        <div class="form-group">
          <label>Textarea:</label>
          <Textbox v-model="textareaValue" type="textarea" />
        </div>
        <div class="form-group">
          <label>Readonly:</label>
          <Textbox v-model="textboxValue" readonly />
        </div>
      </Groupbox>
      <CodePreview :code="codeExamples.textbox" />
    </fieldset>

    <!-- Checkbox -->
    <fieldset id="cmp-checkbox" class="component-section">
      <legend>Checkbox</legend>
      <Groupbox title="Checkbox Options">
        <Checkbox v-model="checkboxValue" name="single-checkbox" label="Single Checkbox" />
        <p>Value: {{ checkboxValue }}</p>
        <hr />
        <Checkbox v-model="checkboxArrayValue" name="option-a" label="Option A" value="a" />
        <Checkbox v-model="checkboxArrayValue" name="option-b" label="Option B" value="b" />
        <Checkbox v-model="checkboxArrayValue" name="option-c" label="Option C" value="c" />
        <p>Selected: {{ checkboxArrayValue.join(", ") || "None" }}</p>
      </Groupbox>
      <CodePreview :code="codeExamples.checkbox" />
    </fieldset>

    <!-- Radio -->
    <fieldset id="cmp-radio" class="component-section">
      <legend>Radio</legend>
      <Groupbox title="Radio Options">
        <Radio v-model="radioValue" name="radio-group" value="option1" label="Option 1" />
        <Radio v-model="radioValue" name="radio-group" value="option2" label="Option 2" />
        <Radio v-model="radioValue" name="radio-group" value="option3" label="Option 3" />
        <p>Selected: {{ radioValue }}</p>
      </Groupbox>
      <CodePreview :code="codeExamples.radio" />
    </fieldset>

    <!-- Dropdown -->
    <fieldset id="cmp-dropdown" class="component-section">
      <legend>Dropdown</legend>
      <Dropdown v-model="dropdownValue" :options="dropdownOptions" placeholder="Select a fruit..." />
      <p>Selected: {{ dropdownValue ?? "None" }}</p>
      <CodePreview :code="codeExamples.dropdown" />
    </fieldset>

    <!-- Listbox -->
    <fieldset id="cmp-listbox" class="component-section">
      <legend>Listbox</legend>
      <Listbox v-model="listboxValue" :options="listboxOptions" />
      <p>Selected ID: {{ listboxValue }}</p>
      <CodePreview :code="codeExamples.listbox" />
    </fieldset>

    <!-- Slider -->
    <fieldset id="cmp-slider" class="component-section">
      <legend>Slider</legend>
      <Slider v-model="sliderValue" min="0" max="100" />
      <p>Value: {{ sliderValue }}</p>
      <CodePreview :code="codeExamples.slider" />
    </fieldset>

    <!-- Progress -->
    <fieldset id="cmp-progress" class="component-section">
      <legend>Progress</legend>
      <div class="progress-demos">
        <div>
          <label>Determinate ({{ progressValue }}%):</label>
          <Progress :progress="progressValue" />
        </div>
        <div>
          <label>Indeterminate:</label>
          <Progress indeterminate />
        </div>
      </div>
      <CodePreview :code="codeExamples.progress" />
    </fieldset>

    <!-- Searchbox -->
    <fieldset id="cmp-searchbox" class="component-section">
      <legend>Searchbox <span class="only">7.css only</span></legend>
      <div class="component-row">
        <Searchbox placeholder="Search..." @search="onSearch" />
        <Searchbox instant placeholder="Instant search..." />
      </div>
      <p v-if="searchValue">Last search: {{ searchValue }}</p>
      <CodePreview :code="codeExamples.searchbox" />
    </fieldset>

    <!-- Tabs -->
    <fieldset id="cmp-tabs" class="component-section">
      <legend>Tabs</legend>
      <Tabs v-model="activeTab" :tabs="tabsList">
        <template #tab1><p>This is the General tab content.</p></template>
        <template #tab2><p>This is the Advanced tab content with more options.</p></template>
        <template #tab3><p>About this application. Version 1.0.0</p></template>
      </Tabs>
      <CodePreview :code="codeExamples.tabs" />
    </fieldset>

    <!-- Collapse -->
    <fieldset id="cmp-collapse" class="component-section">
      <legend>Collapse</legend>
      <Collapse v-model:open="collapseOpen" title="Click to expand" :children="collapseChildren" />
      <Collapse title="Another section">
        <p>Custom content inside the collapse.</p>
      </Collapse>
      <CodePreview :code="codeExamples.collapse" />
    </fieldset>

    <!-- Groupbox -->
    <fieldset id="cmp-groupbox" class="component-section">
      <legend>Groupbox</legend>
      <Groupbox title="Settings">
        <p>This content is wrapped in a groupbox (fieldset).</p>
        <Button text="Save Settings" />
      </Groupbox>
      <CodePreview :code="codeExamples.groupbox" />
    </fieldset>

    <!-- Link -->
    <fieldset id="cmp-link" class="component-section">
      <legend>Link</legend>
      <div class="component-row">
        <Link href="#" text="Regular Link" />
        <Link text="Button Link" />
        <Link href="https://github.com" target="_blank" text="External Link" />
      </div>
      <CodePreview :code="codeExamples.link" />
    </fieldset>

    <!-- Icon -->
    <fieldset id="cmp-icon" class="component-section">
      <legend>Icon</legend>
      <div class="component-row">
        <Icon icon="monitor" size="24" />
        <Icon icon="monitor" size="32" />
        <Icon icon="monitor" size="48" />
      </div>
      <CodePreview :code="codeExamples.icon" />
    </fieldset>

    <!-- Balloon -->
    <fieldset id="cmp-balloon" class="component-section">
      <legend>Balloon (Tooltip) <span class="only">7.css only</span></legend>
      <div class="balloon-demos">
        <Balloon caption="Top tooltip" top />
        <Balloon caption="Bottom tooltip" bottom />
        <Balloon caption="Left tooltip" left />
        <Balloon caption="Right tooltip" right />
      </div>
      <CodePreview :code="codeExamples.balloon" />
    </fieldset>

    <!-- Menu & MenuBar -->
    <fieldset id="cmp-menu" class="component-section">
      <legend>Menu &amp; MenuBar</legend>
      <p>MenuBar with dropdown menus (hover to open):</p>
      <MenuBar can-hover>
        <MenuItem>File
          <Menu>
            <MenuItem><button>New</button></MenuItem>
            <MenuItem><button>Open</button></MenuItem>
            <MenuItem><button>Save</button></MenuItem>
            <hr />
            <MenuItem><button>Exit</button></MenuItem>
          </Menu>
        </MenuItem>
        <MenuItem>Edit
          <Menu>
            <MenuItem><button>Undo</button></MenuItem>
            <MenuItem><button>Redo</button></MenuItem>
            <hr />
            <MenuItem><button>Cut</button></MenuItem>
            <MenuItem><button>Copy</button></MenuItem>
            <MenuItem><button>Paste</button></MenuItem>
          </Menu>
        </MenuItem>
        <MenuItem>View</MenuItem>
        <MenuItem>Help
          <Menu>
            <MenuItem><button>About</button></MenuItem>
          </Menu>
        </MenuItem>
      </MenuBar>

      <p style="margin-top: 16px">Standalone Menu:</p>
      <Menu can-hover class="demo-menu">
        <MenuItem><button>Option 1</button></MenuItem>
        <MenuItem><button>Option 2</button></MenuItem>
        <MenuItem>Option 3 (with submenu)
          <Menu>
            <MenuItem><button>Sub Option 3.1</button></MenuItem>
            <MenuItem><button>Sub Option 3.2</button></MenuItem>
          </Menu>
        </MenuItem>
        <hr />
        <MenuItem><button>Option 4</button></MenuItem>
      </Menu>

      <p style="margin-top: 16px">Menu with Checkbox/Radio options:</p>
      <Menu class="demo-menu">
        <MenuItem :option="radioOption('lg')" v-model="menuIconSize">Large icons</MenuItem>
        <MenuItem :option="radioOption('md')" v-model="menuIconSize">Medium icons</MenuItem>
        <MenuItem :option="radioOption('sm')" v-model="menuIconSize">Small icons</MenuItem>
        <hr />
        <MenuItem :option="checkOption('arrange')" v-model="menuAutoArrange">Auto arrange icons</MenuItem>
        <MenuItem :option="checkOption('align')" v-model="menuAlignGrid">Align icons to grid</MenuItem>
      </Menu>
      <p>Icon size: {{ menuIconSize }} | Auto arrange: {{ menuAutoArrange }} | Align grid: {{ menuAlignGrid }}</p>
      <CodePreview :code="codeExamples.menu" />
    </fieldset>

    <!-- Treeview -->
    <fieldset id="cmp-treeview" class="component-section">
      <legend>Treeview</legend>
      <Treeview>
        <li>
          <details open>
            <summary>Documents</summary>
            <ul>
              <li>Work Files</li>
              <li>Personal</li>
              <li>
                <details>
                  <summary>Projects</summary>
                  <ul>
                    <li>Project A</li>
                    <li>Project B</li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Pictures</summary>
            <ul>
              <li>Vacation</li>
              <li>Family</li>
            </ul>
          </details>
        </li>
        <li>Downloads</li>
      </Treeview>
      <CodePreview :code="codeExamples.treeview" />
    </fieldset>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import CodePreview from '../components/CodePreview.vue'
  import { COMPONENTS, THEMES } from '../catalog'
  import {
    Balloon, Button, Checkbox, Collapse, Dialog, Dropdown, Groupbox, Icon,
    Link, Listbox, Menu, MenuBar, MenuItem, Progress, Radio, Searchbox,
    Slider, Tabs, Textbox, Treeview, Window,
  } from '../../lib/components'

  function scrollTo(id: string) {
    document.getElementById(`cmp-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const checkboxValue = ref(false)
  const checkboxArrayValue = ref<string[]>([])
  const radioValue = ref('option1')
  const dropdownValue = ref<string | undefined>(undefined)
  const listboxValue = ref(1)
  const sliderValue = ref(50)
  const textboxValue = ref('Hello World')
  const textareaValue = ref('This is a textarea')
  const searchValue = ref('')
  const dialogOpen = ref(false)
  const persistentDialogOpen = ref(false)
  const collapseOpen = ref(false)
  const draggableWindowOpen = ref(false)
  const activeTab = ref('tab1')
  const progressValue = ref(65)

  const dropdownOptions = [
    { id: 'apple', name: 'Apple' },
    { id: 'banana', name: 'Banana' },
    { id: 'cherry', name: 'Cherry' },
    { id: 'date', name: 'Date' },
  ]
  const listboxOptions = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
    { id: 3, name: 'Item Three' },
    { id: 4, name: 'Item Four' },
  ]
  const tabsList = { tab1: 'General', tab2: 'Advanced', tab3: 'About' }
  const collapseChildren = [
    { id: 1, title: 'Sub Item 1' },
    { id: 2, title: 'Sub Item 2' },
    { id: 3, title: 'Sub Item 3' },
  ]

  const menuIconSize = ref('md')
  const menuAutoArrange = ref(false)
  const menuAlignGrid = ref(true)
  const radioOption = (size: string) => ({
    as: 'radio' as const, id: `icon-size-${size}`, name: 'icon-size', nativeValue: size,
  })
  const checkOption = (id: string) => ({ as: 'checkbox' as const, id: `${id}-option` })

  function onSearch(value: string) { searchValue.value = value }
  function showAlert(message: string) { window.alert(message) }

  const codeExamples = {
    button: `<Button text="Default Button" />
<Button text="Link Button" href="#" />
<Button @click="handleClick">Click Me</Button>`,
    dialog: `<Dialog
  v-model="dialogOpen"
  title="Sample Dialog"
  message="This is a dialog message."
  draggable
  @accept="onAccept"
  @cancel="onCancel"
/>`,
    window: `<Window title="Basic Window" active>
  <p>Window content here.</p>
</Window>

<Window
  title="Draggable Window"
  draggable
  closable
  snap-to-edges
  :default-x="100"
  :default-y="100"
/>`,
    textbox: `<Textbox v-model="value" placeholder="Enter text..." />
<Textbox v-model="value" type="textarea" />
<Textbox v-model="value" readonly />`,
    checkbox: `<Checkbox v-model="checked" name="my-checkbox" label="Accept terms" />
<Checkbox v-model="selected" name="a" label="Option A" value="a" />`,
    radio: `<Radio v-model="selected" name="g" value="option1" label="Option 1" />
<Radio v-model="selected" name="g" value="option2" label="Option 2" />`,
    dropdown: `<Dropdown
  v-model="selected"
  :options="[{ id: 'apple', name: 'Apple' }]"
  placeholder="Select a fruit..."
/>`,
    listbox: `<Listbox v-model="selected" :options="[{ id: 1, name: 'Item One' }]" />`,
    slider: `<Slider v-model="value" min="0" max="100" />`,
    progress: `<Progress :progress="65" />
<Progress indeterminate />`,
    searchbox: `<Searchbox placeholder="Search..." @search="onSearch" />
<Searchbox instant placeholder="Instant search..." />`,
    tabs: `<Tabs v-model="activeTab" :tabs="{ tab1: 'General', tab2: 'Advanced' }">
  <template #tab1><p>General tab content.</p></template>
  <template #tab2><p>Advanced tab content.</p></template>
</Tabs>`,
    collapse: `<Collapse v-model:open="isOpen" title="Click to expand" />
<Collapse title="Custom content"><p>Any content here.</p></Collapse>`,
    groupbox: `<Groupbox title="Settings">
  <p>Content wrapped in a fieldset.</p>
</Groupbox>`,
    link: `<Link href="#" text="Regular Link" />
<Link href="https://github.com" target="_blank" text="External" />`,
    icon: `<Icon icon="monitor" size="24" />
<Icon icon="monitor" size="48" />`,
    balloon: `<Balloon caption="Top tooltip" top />
<Balloon caption="Bottom tooltip" bottom />`,
    menu: `<MenuBar can-hover>
  <MenuItem>File
    <Menu>
      <MenuItem><button>New</button></MenuItem>
      <MenuItem><button>Exit</button></MenuItem>
    </Menu>
  </MenuItem>
</MenuBar>`,
    treeview: `<Treeview>
  <li>
    <details open>
      <summary>Documents</summary>
      <ul><li>Work Files</li></ul>
    </details>
  </li>
</Treeview>`,
  }
</script>

<style scoped>
  .matrix-wrap { overflow-x: auto; margin-bottom: 20px; }
  .matrix { border-collapse: collapse; width: 100%; font-size: 13px; }
  .matrix th, .matrix td {
    padding: 3px 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    text-align: left;
  }
  .matrix .cell { text-align: center; }
  .matrix-note { color: #555; }
  .only { font-size: 11px; font-weight: normal; opacity: 0.7; }
  .component-section { margin-bottom: 16px; scroll-margin-top: 12px; }
  .component-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
  .windows-container { display: flex; gap: 20px; flex-wrap: wrap; }
  .form-group { margin-bottom: 12px; }
  .form-group > label { display: block; margin-bottom: 4px; }
  .progress-demos { display: flex; flex-direction: column; gap: 16px; }
  .progress-demos > div { display: flex; flex-direction: column; gap: 4px; }
  .balloon-demos { display: flex; gap: 20px; flex-wrap: wrap; padding: 40px 20px; }
  .component-section hr { margin: 16px 0; }
  .component-section p { margin: 8px 0; }
  .demo-menu { width: 200px; }
</style>
