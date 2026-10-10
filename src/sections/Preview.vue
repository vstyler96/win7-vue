<script setup lang="ts">
  // The whole component set on one desktop, like /srv/http/retro-preview: one markup,
  // restyled by whichever theme is active (switch it from the theme picker).
  import { ref } from 'vue'
  import {
    Balloon, Button, Checkbox, CircularProgress, Collapse, Dialog, Dropdown, Groupbox, Listbox,
    Menu, MenuBar, MenuItem, Progress, Radio, Searchbox, Slider, StartButton, Table, Tabs, Textbox, Treeview,
    Window, useTheme,
  } from 'win7-vue'
  import { themeBackground } from '../catalog'

  const theme = useTheme()

  const tab = ref('general')
  const name = ref('Ada Lovelace')
  const password = ref('hunter22')
  const language = ref<string | number | null>('en')
  const startup = ref(['icons'])
  const mode = ref('normal')
  const volume = ref(7)
  const printer = ref<string | number>(2)
  const search = ref('')
  const email = ref('')
  const notes = ref('Multi-line text box')
  const dialog = ref(false)
  const startOpen = ref(false)
  const vistaOpen = ref(false)

  const languages = [
    { id: 'en', name: 'English (US)' },
    { id: 'es', name: 'Español (MX)' },
    { id: 'de', name: 'Deutsch' },
  ]
  const printers = [
    { id: 1, name: 'LaserJet 4 (Office)' },
    { id: 2, name: 'ImageWriter II' },
    { id: 3, name: 'PDF Writer' },
  ]
  const files = [
    { name: 'README.TXT', size: '2 KB', modified: '1998-06-25' },
    { name: 'SETUP.EXE', size: '840 KB', modified: '1998-06-25' },
    { name: 'AUTOEXEC.BAT', size: '1 KB', modified: '1998-07-02' },
  ]
</script>

<template>
  <section>
    <h1>Preview</h1>
    <p class="docs-lead">
      Every component on one desktop. Pick a theme in the navbar to compare how the shared
      markup looks in each OS.
    </p>

    <!-- The desktop: theme wallpaper + windows, laid out by this one inline flex row. -->
    <div
      class="docs-example"
      :style="{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start', borderRadius: '8px', background: themeBackground(theme.name.value) }"
    >
      <Window
        title="Control Panel"
        active
        minimizable
        maximizable
        closable
        has-status
        :status-fields="['Ready', '3 sections', 'CPU 4%']"
        style="flex: 1 1 100%"
      >
        <MenuBar can-hover>
          <MenuItem>
            File
            <template #submenu>
              <Menu>
                <MenuItem><button>Open</button></MenuItem>
                <MenuItem><button>Save</button></MenuItem>
                <hr>
                <MenuItem><button>Exit</button></MenuItem>
              </Menu>
            </template>
          </MenuItem>
          <MenuItem>
            Edit
            <template #submenu>
              <Menu>
                <MenuItem><button>Undo</button></MenuItem>
                <MenuItem aria-disabled="true">
                  <button>Redo</button>
                </MenuItem>
              </Menu>
            </template>
          </MenuItem>
          <MenuItem>Help</MenuItem>
        </MenuBar>
        <br>

        <Tabs
          v-model="tab"
          :tabs="{ general: 'General', lists: 'Lists', progress: 'Progress' }"
        >
          <template #general>
            <Groupbox title="Account">
              <p>
                <label>Display name <Textbox v-model="name" /></label>
              </p>
              <p>
                <label>Password <Textbox
                  v-model="password"
                  type="password"
                /></label>
              </p>
              <p>
                <label>Language <Dropdown
                  v-model="language"
                  :options="languages"
                /></label>
              </p>
            </Groupbox>
            <Groupbox title="Startup">
              <p>
                <Checkbox
                  v-model="startup"
                  value="icons"
                  label="Load desktop icons"
                />
              </p>
              <p>
                <Checkbox
                  v-model="startup"
                  value="sound"
                  label="Play startup sound"
                />
              </p>
              <p>
                <Checkbox
                  v-model="startup"
                  value="network"
                  label="Network boot (unavailable)"
                  disabled
                />
              </p>
              <p>
                <Radio
                  v-model="mode"
                  name="mode"
                  value="normal"
                  label="Normal"
                />
                <Radio
                  v-model="mode"
                  name="mode"
                  value="safe"
                  label="Safe mode"
                />
              </p>
            </Groupbox>
            <p>
              <label>Volume <Slider
                v-model="volume"
                min="1"
                max="11"
              /></label>
            </p>
            <p>
              <Button class="default">
                OK
              </Button>
              <Button>Cancel</Button>
              <Button disabled>
                Apply
              </Button>
              <Button @click="dialog = true">
                Open dialog…
              </Button>
            </p>
          </template>

          <template #lists>
            <Listbox
              v-model="printer"
              :options="printers"
            />
            <br>
            <Table
              :headers="[
                { key: 'name', title: 'Name' },
                { key: 'size', title: 'Size', center: true },
                { key: 'modified', title: 'Modified' },
              ]"
              :items="files"
              item-key="name"
              shadow
              striped
              hover
              full
            />
          </template>

          <template #progress>
            <p><Progress :progress="62" /></p>
            <p><Progress :progress="40" /></p>
            <p>
              <Progress
                :progress="40"
                variant="paused"
                :animate="false"
              />
            </p>
            <p>
              <Progress
                :progress="80"
                variant="error"
                :animate="false"
              />
            </p>
            <p><Progress indeterminate /></p>
            <p>
              <CircularProgress
                :animate="false"
                label="Idle"
              />
              <CircularProgress />
            </p>
          </template>
        </Tabs>
      </Window>

      <Window
        title="Explorer (inactive)"
        class="inactive"
        style="flex: 1 1 340px"
        minimizable
        maximizable
        closable
      >
        <Searchbox
          v-model="search"
          placeholder="Search files"
        />
        <br>
        <Treeview class="has-connector has-collapse-button has-container">
          <li>
            My Computer
            <ul>
              <li>
                <details open>
                  <summary>C:\</summary>
                  <ul>
                    <li>WINDOWS</li>
                    <li>Program Files</li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>D:\ (CD-ROM)</summary>
                  <ul><li>SETUP</li></ul>
                </details>
              </li>
            </ul>
          </li>
        </Treeview>
      </Window>

      <Window
        title="Odds & ends"
        active
        style="flex: 1 1 340px"
        closable
      >
        <p>
          <Textbox
            v-model="email"
            type="email"
            placeholder="you@example.com"
          />
        </p>
        <p>
          <Textbox
            v-model="notes"
            type="textarea"
          />
        </p>
        <Collapse title="Advanced options">
          <p>Collapsed content lives here.</p>
        </Collapse>
        <p>
          <Balloon
            caption="Balloons point at the control that owns them."
            top
          />
        </p>
      </Window>

      <Window
        title="Start button"
        active
        style="flex: 1 1 340px"
      >
        <p>
          <StartButton v-model:open="startOpen" />
          <StartButton
            v-model:open="vistaOpen"
            variant="vista"
          />
        </p>
        <p>Click to toggle the pressed state (menu open). The second one is the <code>vista</code> variant (7.css only).</p>
      </Window>
    </div>

    <Dialog
      v-model="dialog"
      title="Copying files"
      cancelable
    >
      <p>Copying SETUP.EXE to C:\WINDOWS…</p>
      <Progress indeterminate />
    </Dialog>
  </section>
</template>
