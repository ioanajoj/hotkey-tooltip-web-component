# \<hotkey-tooltip>

Display a tooltip for a selected element and trigger a callback when a given key was pressed.

![Demo example](./demo-example.PNG?raw=true 'Title')

## Installation

```bash
npm i hotkey-tooltip
```

## Usage

```html
<script type="module">
  import 'hotkey-tooltip/hotkey-tooltip.js';
</script>

<button type="button" class="fill" id="my-button" onclick="alertACallback">
  Alert A
</button>
<hotkey-tooltip for="my-button" message="Tooltip message" hotkey="?"></hotkey-tooltip>

<script>
  const buttonCallback = () => { alert('Pressed "?" key'); }
  document.querySelector('[for="my-button"]').callback = alertACallback;
<script>
```

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
