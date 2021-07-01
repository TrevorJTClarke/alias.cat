/**
 * avatar-blockie
 *
 * Blockies are a unique Address representation as an image
 * REF: https://github.com/ethereum/blockies
 *
 * @markup
 * <avatar-blockie hash="0x2d6a7b0f6ade..."></avatar-blockie>
 *
 * @options
 *  - hash - Hex, "0xb8c77482e45f1f44de1745f52c74426c631bdd52"
 */

function create() {
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      :host {
        background: #f2f2f2;
        display: block;
        height: 100%;
        width: 100%;
      }
    </style>
  `

  class Blockie extends HTMLElement {
    static get observedAttributes() {
      return ['hash']
    }

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // The random number is a js implementation of the Xorshift PRNG
      this.randseed = new Array(4) // Xorshift: [x, y, z, w] 32 bit values
    }

    hash(value) {
      if (!value || typeof value === 'undefined') return
      this.generateHashImage({ seed: value })
    }

    // Immediately load fallback
    connectedCallback() {
      if (!this.hasAttribute('hash') || !this.getAttribute('hash')) return
      const seed = `${this.getAttribute('hash')}`.toLowerCase()
      this.generateHashImage({ seed })
    }

    seedrand(seed) {
      for (var i = 0; i < this.randseed.length; i++) {
        this.randseed[i] = 0
      }
      for (var e = 0; e < seed.length; e++) {
        this.randseed[e % 4] =
          (this.randseed[e % 4] << 5) -
          this.randseed[e % 4] +
          seed.charCodeAt(e)
      }
    }

    rand() {
      // based on Java's String.hashCode(), expanded to 4 32bit values
      var t = this.randseed[0] ^ (this.randseed[0] << 11)

      this.randseed[0] = this.randseed[1]
      this.randseed[1] = this.randseed[2]
      this.randseed[2] = this.randseed[3]
      this.randseed[3] =
        this.randseed[3] ^ (this.randseed[3] >> 19) ^ t ^ (t >> 8)

      return (this.randseed[3] >>> 0) / ((1 << 31) >>> 0)
    }

    createColor() {
      //saturation is the whole color spectrum
      var h = Math.floor(this.rand() * 360)
      //saturation goes from 40 to 100, it avoids greyish colors
      var s = this.rand() * 60 + 40 + '%'
      //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
      var l = (this.rand() + this.rand() + this.rand() + this.rand()) * 25 + '%'

      var color = 'hsl(' + h + ',' + s + ',' + l + ')'
      return color
    }

    createImageData(size) {
      var width = size // Only support square icons for now
      var height = size
      var dataWidth = Math.ceil(width / 2)
      var mirrorWidth = width - dataWidth
      var data = []

      for (var y = 0; y < height; y++) {
        var row = []
        for (var x = 0; x < dataWidth; x++) {
          // this makes foreground and background color to have a 43% (1/2.3) probability
          // spot color has 13% chance
          row[x] = Math.floor(this.rand() * 2.3)
        }
        var r = row.slice(0, mirrorWidth)
        r.reverse()
        row = row.concat(r)

        for (var i = 0; i < row.length; i++) {
          data.push(row[i])
        }
      }

      return data
    }

    buildOpts(opts) {
      const newOpts = {}

      newOpts.seed =
        opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16)

      this.seedrand(newOpts.seed)

      newOpts.size = opts.size || 8
      newOpts.scale = opts.scale || 4
      newOpts.color = opts.color || this.createColor()
      newOpts.bgcolor = opts.bgcolor || this.createColor()
      newOpts.spotcolor = opts.spotcolor || this.createColor()

      return newOpts
    }

    renderIcon(opts, canvas) {
      opts = this.buildOpts(opts || {})
      var imageData = this.createImageData(opts.size)
      var width = Math.sqrt(imageData.length)

      canvas.width = canvas.height = opts.size * opts.scale

      var cc = canvas.getContext('2d')
      cc.fillStyle = opts.bgcolor
      cc.fillRect(0, 0, canvas.width, canvas.height)
      cc.fillStyle = opts.color

      for (var i = 0; i < imageData.length; i++) {
        // if data is 0, leave the background
        if (imageData[i]) {
          var row = Math.floor(i / width)
          var col = i % width

          // if data is 2, choose spot color, if 1 choose foreground
          cc.fillStyle = imageData[i] == 1 ? opts.color : opts.spotcolor

          cc.fillRect(
            col * opts.scale,
            row * opts.scale,
            opts.scale,
            opts.scale,
          )
        }
      }

      return canvas
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

    // Creates image for UI
    generateHashImage(opts) {
      const canvas = document.createElement('canvas')
      canvas.style.display = 'block'
      canvas.style.width = '100%'

      this.renderIcon(opts, canvas)

      this.shadowRoot.innerHTML = ''
      this.shadowRoot.appendChild(canvas)
    }
  }

  return Blockie
}

export default create
