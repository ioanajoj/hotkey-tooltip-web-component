import { html, css, LitElement, property } from 'lit-element';
import { StyleInfo, styleMap } from 'lit-html/directives/style-map.js';

export class HotkeyTooltip extends LitElement {
  static styles = css`
    .tooltip {
      position: absolute;
      z-index: 1;
      border-radius: 6px;
      background-color: #555;
      color: #fff;
      text-align: center;
      padding: 5px;
    }

    .tooltip::before {
      content: '';
      width: 20px;
      height: 20px;
      background: #555;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      margin-left: -10px;
      bottom: 15px;
      transform: rotate(45deg);
      z-index: -1;
    }
  `;

  @property({ type: String }) targetSelector = '';

  @property({ type: String }) message = '';

  @property() hotkey: string = '';

  @property({ type: String || null }) modifier = null;

  @property() callback: Function = () => {};

  @property() showTooltip: boolean = false;

  targetElement: HTMLElement | null = null;

  position: StyleInfo = { top: '0', left: '0' };

  render() {
    if (!this.showTooltip) {
      return html``;
    }
    return html`
      <div class="tooltip" style=${styleMap(this.position)}>
        ${this.message}
        <span class="hotkey">${this.hotkey}</span>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setTarget();
    this.addKeyboardListeners();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._checkPressedKey.bind(this));
    this.targetElement?.removeEventListener(
      'mouseenter',
      this._show.bind(this)
    );
    this.targetElement?.removeEventListener(
      'mouseleave',
      this._hide.bind(this)
    );
  }

  addKeyboardListeners() {
    document.addEventListener('keydown', this._checkPressedKey.bind(this));
  }

  setTarget() {
    this.targetElement = document.querySelector(this.targetSelector);
    this.targetElement?.addEventListener('mouseenter', this._show.bind(this));
    this.targetElement?.addEventListener('mouseleave', this._hide.bind(this));
  }

  _checkPressedKey(event: KeyboardEvent) {
    if (!this.hotkey) {
      return;
    }
    if (this.hotkey === event.key) {
      this.callback();
    }
  }

  _show() {
    this.targetElement = document.querySelector(this.targetSelector);
    let top = ((this.targetElement?.clientTop || 0) + 40).toString();
    top += 'px';
    let left = ((this.targetElement?.clientLeft || 0) - 20).toString();
    left += 'px';
    this.position = {
      top,
      left,
    };
    this.showTooltip = true;
  }

  _hide() {
    this.showTooltip = false;
  }
}
