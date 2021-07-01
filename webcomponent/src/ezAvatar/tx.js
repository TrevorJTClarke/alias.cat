/**
 * eth-txn
 *
 * Transaction Hash Chip, a simplified human recognizable element using split hex values represented as colors.
 *
 * @markup
 * <eth-txn hash="0x2d6a7b0f6ade..."></eth-txn>
 *
 * @options
 *  - hash - Hex, "0x2d6a7b0f6adeff38423d4c62cd8b6ccb708ddad85da5d3d06756ad4d8a04a6a2"
 */

function create() {
  const template = document.createElement('template')
  const clipboardIcon = `
    <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" enable-background="new 0 0 512 512" title="Copy to clipboard" xml:space="preserve">
      <path fill="currentColor" d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z" />
    </svg>
  `

  template.innerHTML = `
    <style>
      :host {
        background: var(--eth-chip-basic-background, white);
        border-radius: var(--eth-chip-basic-border-radius, 4px);
        border: var(--eth-chip-basic-border, 1px solid rgba(0, 0, 0, 0.05));
        cursor: pointer;
        width: fit-content;
        display: flex;
        justify-content: space-between;
        margin: 0;
        position: relative;
        align-items: center;
        min-height: 18px;
        min-width: 115px;
      }

      :host(:not(:defined)) {
        opacity: 0;
      }

      .txn-expand-clipboard {
        color: rgba(0, 0, 0, 0.1);
        position: relative;
        margin: 0px 10px;
        top: 5px;
        width: 1px;
        height: 1px;
        border-radius: 50%;
        border: solid 1px currentColor;
        background-color: currentColor;
      }
      .txn-expand-clipboard svg {
        visibility: hidden;
        height: 100%;
        width: 100%;
      }

      .txn-expand-clipboard:before {
        content: '';
        position: absolute;
        left: -1px;
        top: -6px;
        width: 1px;
        height: 1px;
        border-radius: 50%;
        border: solid 1px currentColor;
        background-color: currentColor;
      }

      .txn-expand-clipboard:after {
        content: '';
        position: absolute;
        left: -1px;
        top: 4px;
        width: 1px;
        height: 1px;
        border-radius: 50%;
        border: solid 1px currentColor;
        background-color: currentColor;
      }

      svg {
        color: #404040;
        display: block;
        height: 100%;
        width: 100%;
      }

      span {
        color: black;
        font-size: 10pt;
        display: inline-block;
        margin: var(--eth-chip-basic-margin, auto 0px);
        padding: var(--eth-chip-basic-padding, 0px 0px);
      }

      /* Zero State */
      span:empty {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 3px;
        min-width: 50px;
        height: 16px;
        margin-right: 10px;
      }

      .txn-text-wrap {
        display: flex;
        font-family: Helvetica, sans-serif;
        position: relative;
        meth-width: 100px;
        overflow: hidden;
        transition: meth-width 330ms ease;
      }

      .txn-text {
        padding: 0px;
        word-break: break-all;
        display: grid;
        text-align: right;
        letter-spacing: 0.075em;
        line-height: 10pt;
      }

      .txn-hash {
        margin-right: 10px;
      }
      .svg-wrap {
        border-radius: calc(var(--eth-chip-basic-border-radius, 4px) - 1px);
        overflow: hidden;
        height: 32px;
        width: 32px;
      }

      /* Expanded/Collapsed States */
      .txn-text span {
        display: none;
      }
      .txn-text span:first-of-type {
        display: inline;
      }

      :host(:hover) .txn-text-wrap {
        background: var(--eth-chip-basic-background, white);
        border-radius: 0 var(--eth-chip-basic-border-radius, 4px) var(--eth-chip-basic-border-radius, 4px) 0;
        border: var(--eth-chip-basic-border, 1px solid rgba(0, 0, 0, 0.05));
        border-left: 0px;
        display: flex;
        meth-width: 415px;
        padding: 0px;
        position: absolute;
        left: 34px;
        top: -1px;
        bottom: -1px;
        z-index: 9999;
      }
      :host(:hover) .txn-text {
        grid-template-columns: 60px repeat(7, minmax(45px, 1fr));
      }
      :host(:hover) .txn-text span {
        display: block;
      }
      :host(:hover) .txn-hash {
        margin-right: 0px;
        transition: meth-width 330ms 200ms ease;
      }
      :host(:hover) .txn-expand-clipboard {
        background: transparent;
        border: 0px;
        border-radius: 0px;
        height: 16px;
        width: 16px;
        margin: auto 10px;
        top: 0px;
      }
      :host(:hover) .txn-expand-clipboard:before,
      :host(:hover) .txn-expand-clipboard:after {
        visibility: hidden;
      }
      :host(:hover) .txn-expand-clipboard svg {
        visibility: visible;
      }
      :host(:not([hash])) .txn-expand-clipboard {
        display: none;
      }
      :host(:not([hash]):hover) .txn-text {
        meth-width: 60px;
      }
      :host(:not([hash]):hover) .txn-hash {
        margin-right: 10px;
      }
    </style>
    <div class="txn-hash"></div>
    <div class="txn-text-wrap">
      <div class="txn-text"><span></span></div>
      <div class="txn-expand-clipboard">${clipboardIcon}</div>
    </div>
  `

  // export default class ChipTransaction extends HTMLElement {
  class ChipTransaction extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // setup default svg sections
      this.primaryColor = 'ececec'
      this.secondaryColor = '4f4f4f'
      this.colors = []
      this.text = ''

      // NOTE: Ratio for square: 90 / 128 = 0.7
      // NOTE: Could be abstracted in future to accept w/h params
      this.size = {
        ratio: 0.7,
        height: 256,
        width: 256,
      }

      const halfHeight = this.size.height / 2
      const halfWidth = this.size.width / 2
      const ratioHeight = Math.ceil(halfHeight * 0.7) + 1
      const ratioWidth = Math.ceil(halfWidth * 0.7) + 1
      const mtrxDefault = '0.7071 0.7071 -0.7071 0.7071'

      // NOTE: Sets up svg rectangle variables
      this.structure = [
        // outer half
        [0, 0, halfWidth, halfHeight, ''],
        [halfWidth, 0, halfWidth, halfHeight, ''],
        [0, halfHeight, halfWidth, halfHeight, ''],
        [halfWidth, halfHeight, halfWidth, halfHeight, ''],
        // inner half --NOTE: Matrix values are hardcoded as derived pattern needs extracting
        [90, 25, ratioWidth, ratioHeight, `matrix(${mtrxDefault} 82.25 -82)`],
        [
          halfWidth,
          0,
          ratioWidth,
          ratioHeight,
          `matrix(${mtrxDefault} 102 -26.75)`,
        ],
        [
          0,
          halfHeight,
          ratioWidth,
          ratioHeight,
          `matrix(${mtrxDefault} 154.25 -26.75)`,
        ],
        [
          halfWidth,
          halfHeight,
          ratioWidth,
          ratioHeight,
          `matrix(${mtrxDefault} 128 -53)`,
        ],
      ]
    }

    // Immediately load prop values & execute their helper methods
    connectedCallback() {
      // Fallbacks
      const attributes = Array.from(this.attributes)
      if (!attributes || attributes.length <= 0) {
        this.generateDefault()
        return
      }
      // Methods
      if (this.hasAttribute('hash')) {
        this.text = this.getAttribute('hash')
        this.hash(this.text)
      }

      // Events
      const el = this.shadowRoot.querySelector('.txn-expand-clipboard')
      if (this.text)
        el.addEventListener('click', e => {
          e.preventDefault()
          this.copyToClipboard(this.text)
        })
    }

    // Be kind, rewind
    disconnectedCallback() {
      if (!this.text) return
      const el = this.shadowRoot.querySelector('.txn-expand-clipboard')
      el.removeEventListener('click', e => {
        e.preventDefault()
        this.copyToClipboard(this.text)
      })
    }

    // Use hash value & compute colors from hex value
    hash(value) {
      // If no value, render default zero state
      if (!value || typeof value === 'undefined' || isNaN(value)) {
        this.generateDefault(value)
        return
      }

      // Check validity of value
      if (`${value}`.length <= 8) {
        this.generateDefault(value)
        return
      }

      // generate colors
      this.colors = this.getSplitArray(value.substring(2))

      // generate & append svg
      this.generateHashImage()

      // append text
      this.setHashText(value)
    }

    // Creates the hash text, split into human friendly chunks... #NotThrowUp
    setHashText(str) {
      const el = this.shadowRoot.querySelector('.txn-text')
      if (!str || typeof str === 'undefined') return
      const sp = document.createElement('span')
      const pre = str.substring(0, 2)
      const spans = this.getSplitArray(str.substring(2), 4)
      // reset, because it has strange behaviour
      el.innerHTML = ''

      spans.forEach((s, idx) => {
        if (!s) return
        const span = sp.cloneNode(true)
        span.textContent = idx === 0 ? `${pre}${s}` : s
        el.appendChild(span)
      })
    }

    // returns array of hex compliant strings
    getSplitArray(hash, length = 8) {
      if (!hash || hash.length <= length) return hash
      const rgx = new RegExp(`.{1,${length}}`, 'g')
      return hash.match(rgx)
    }

    // Creates fallback UI
    generateDefault() {
      // generate zero state image
      for (let i = 0; i < 8; i++) {
        const r = Math.max(10, Math.round(Math.random() * 80))
        const c = i % 3 == 0 ? this.primaryColor : this.secondaryColor
        this.colors.push(`${c}${r}`)
      }

      this.generateHashImage()
      this.setHashText()
    }

    // Creates fallback UI
    generateHashImage() {
      const el = this.shadowRoot.querySelector('.txn-hash')
      const container = document.createElement('div')
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      const rectTemplate = document.createElementNS(svg.namespaceURI, 'rect')
      container.id = 'sw'
      container.setAttribute('class', 'svg-wrap')
      svg.setAttribute('viewBox', `0 0 ${this.size.width} ${this.size.height}`)

      // Loop colors and map to svg structure
      this.colors.forEach((c, idx) => {
        // use the structure to generate sections
        const s = this.structure[idx]
        const n = rectTemplate.cloneNode(true)

        // create new rect for each color, utilize structure, append to parent SVG
        const fill = idx % 3 == 0 ? c.substring(0, 6) : c
        n.setAttribute('fill', `#${fill}`)
        n.setAttribute('x', s[0])
        n.setAttribute('y', s[1])
        n.setAttribute('width', s[2])
        n.setAttribute('height', s[3])
        n.setAttribute('transform', s[4])

        svg.appendChild(n)
      })

      container.appendChild(svg)
      el.appendChild(container)
    }

    // NOTE: This is more minimal than clipboard.js
    // REF: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    clipboardFallback(text) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      this.shadowRoot.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        document.execCommand('copy')
      } catch {
        return
      }

      this.shadowRoot.removeChild(textArea)
    }

    copyToClipboard(text) {
      this.clipboardFallback(text)
      if (!navigator.clipboard) {
        this.clipboardFallback(text)
        return
      }

      navigator.clipboard.writeText(text)
    }
  }

  return ChipTransaction
}

export default create
