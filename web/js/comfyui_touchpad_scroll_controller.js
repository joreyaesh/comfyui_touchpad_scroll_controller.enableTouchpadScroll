// @ts-ignore
import { app } from '../../../scripts/app.js';

// Default selectors to target
const defaultTargetSelectors = [
  'textarea.comfy-multiline-input',
  '.p-panel.p-component',
];

app.registerExtension({
  name: 'ComfyUI Touchpad Scroll Controller',
  settings: [
    {
      id: 'comfyui_touchpad_scroll_controller.enableTextareas',
      name: 'Ignore Textarea Scroll',
      tooltip:
        'Ignore mouse wheel events on textareas and pass the event to the canvas.',
      type: 'boolean',
      defaultValue: true,
      onChange: (newVal, oldVal) => {
        updateScrollListener({ ignoreTextareaScroll: newVal });
      },
    },
    {
      id: 'comfyui_touchpad_scroll_controller.enableTouchpadScroll',
      name: 'Enable Touchpad Scroll Controller',
      tooltip:
        'Enable touchpad scroll controller. This will override the default mouse wheel behavior. NOTE: You may need to refresh the page after changing this setting.',
      type: 'boolean',
      defaultValue: true,
      onChange: (newVal, oldVal) => {
        updateScrollListener({ enableTouchpadScroll: newVal });
      },
    },
    {
      id: 'comfyui_touchpad_scroll_controller.selectors',
      name: 'Target Selectors (Comma Separated)',
      type: 'text',
      defaultValue: defaultTargetSelectors.join(', '),
      onChange: (newVal, oldVal) => {
        updateScrollListener({ targetSelectors: getTargetSelectors(newVal) });
      },
    },
  ],
  async setup() {
    console.log('ComfyUI Touchpad Scroll Controller Extension Loaded');
    const cb = (event) => {
      app.canvas.processMouseWheel(event);
      event.preventDefault();
    };
    app.canvas['_ignore_textarea_scroll_callback'] = cb;
    updateScrollListener();
  },
  async nodeCreated(node) {
    const enabled = app.extensionManager.setting.get(
      'comfyui_touchpad_scroll_controller.enableTextareas'
    );
    setTimeout(() => {
      updateScrollListener(enabled);
    }, 50);
  },
});

function getTargetSelectors(
  selectorString = app.extensionManager.setting.get(
    'comfyui_touchpad_scroll_controller.selectors'
  ) || defaultTargetSelectors.join(', ')
) {
  return selectorString
    .split(',')
    .map((selector) => selector.trim())
    .filter((selector) => selector.length > 0);
}

/**
 * @param {{ignoreTextareaScroll?: boolean; targetSelectors?: string[], enableTouchpadScroll?: boolean}} param0
 */
function updateScrollListener({
  ignoreTextareaScroll,
  targetSelectors,
  enableTouchpadScroll,
} = {}) {
  const isTouchpadScrollEnabled =
    enableTouchpadScroll ??
    app.extensionManager.setting.get(
      'comfyui_touchpad_scroll_controller.enableTouchpadScroll'
    );
  if (!isTouchpadScrollEnabled) {
    return;
  }

  /**
   * Smooth scrolling for touchpad
   */
  // @ts-ignore
  window.LGraphCanvas.prototype.processMouseWheel = function (
    /** @type {WheelEvent}*/ event
  ) {
    if (!this.graph || !this.allow_dragcanvas) return;

    const { clientX: x, clientY: y } = event;
    if (this.viewport) {
      const [viewportX, viewportY, width, height] = this.viewport;
      const isInsideX = x >= viewportX && x < viewportX + width;
      const isInsideY = y >= viewportY && y < viewportY + height;
      if (!(isInsideX && isInsideY)) return;
    }

    let scale = this.ds.scale;
    let { deltaX, deltaY } = event;

    if (event.metaKey || event.ctrlKey) {
      let SCALE = event.ctrlKey ? 150 : 100;
      if (event.metaKey) SCALE *= -1 / 0.5;
      this.ds.changeScale(scale - deltaY / SCALE, [
        event.clientX,
        event.clientY,
      ]);
    } else {
      this.ds.mouseDrag(-deltaX, -deltaY);
    }
    this.graph.change();

    event.preventDefault();
    return false; // prevent default
  };

  const selectors = targetSelectors || getTargetSelectors();
  const isTextareaScrollIgnored =
    ignoreTextareaScroll ??
    app.extensionManager.setting.get(
      'comfyui_touchpad_scroll_controller.enableTextareas'
    );

  if (!isTouchpadScrollEnabled) {
    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        if (app.canvas) {
          if (isTextareaScrollIgnored) {
            element.addEventListener(
              'mousewheel',
              app.canvas['_ignore_textarea_scroll_callback']
            );
          } else {
            element.removeEventListener(
              'mousewheel',
              app.canvas['_ignore_textarea_scroll_callback']
            );
          }
        }
      });
    });
  }
}
