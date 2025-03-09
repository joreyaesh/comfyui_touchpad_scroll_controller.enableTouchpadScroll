import { app } from '../../../scripts/app.js';

app.registerExtension({
  name: 'ComfyUI Scroll Over Textarea',
  settings: [
    {
      id: 'comfyui_scroll_over_textarea.enable',
      name: 'Prevent Scrolling Within Textareas',
      type: 'boolean',
      defaultValue: true,
      onChange: (newVal, oldVal) => {
        updateTextareaScrollListener(newVal);
      },
    },
  ],
  async setup() {
    console.log('ComfyUI Scroll Over Textarea Extension Loaded');
    const cb = (event) => {
      app.canvas.processMouseWheel(event);
      event.preventDefault();
    };
    app.canvas['_ignore_textarea_scroll_callback'] = cb;
    updateTextareaScrollListener();
  },
  async nodeCreated(node) {
    const enabled = app.extensionManager.setting.get(
      'comfyui_scroll_over_textarea.enable'
    );
    setTimeout(() => {
      updateTextareaScrollListener(enabled);
    }, 50);
  },
});

function updateTextareaScrollListener(
  ignoreTextareaScroll = app.extensionManager.setting.get(
    'comfyui_scroll_over_textarea.enable'
  )
) {
  const textareas = document.querySelectorAll('textarea.comfy-multiline-input');

  textareas.forEach((textarea) => {
    if (app.canvas) {
      if (ignoreTextareaScroll) {
        textarea.addEventListener(
          'mousewheel',
          app.canvas['_ignore_textarea_scroll_callback']
        );
      } else {
        textarea.removeEventListener(
          'mousewheel',
          app.canvas['_ignore_textarea_scroll_callback']
        );
      }
    }
  });
}
