import './monaco/editor.main.js'

const workersDir = new URL('monaco/workers/', import.meta.url)

// eslint-disable-next-line
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    switch (label) {
      case 'json':
        return `${workersDir}json.worker.js`
      case 'css':
        return `${workersDir}css.worker.js`
      case 'html':
        return `${workersDir}html.worker.js`
      case 'typescript':
      case 'javascript':
        return `${workersDir}ts.worker.js`
      default:
        return `${workersDir}editor.worker.js`
    }
  }
}

export class WCMonacoEditor extends HTMLElement {
  static get observedAttributes () {
    return ['src', 'value']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return }
    if (oldValue !== newValue) {
      this[name] = newValue
    }
  }

  get src () { return this.getAttribute('src') }
  set src (value) {
    this.setAttribute('src', value)
    this.setSrc()
  }

  get value () { return this.editor.getValue() }
  set value (value) {
    this.editor.setValue(value)
  }

  get tabSize () { return this.editor.getModel()._options.tabSize }
  set tabSize (value) {
    this.editor.getModel().updateOptions({ tabSize: value })
  }

  constructor () {
    super()
    this.__initialized = false
    this.editor = null
  }

  async connectedCallback () {
    this.style.display = 'block'
    if (!this.id) { this.id = 'editor' }
    if (!this.style.width) { this.style.width = '100%' }
    if (!this.style.height) { this.style.height = '100%' }

    if (this.hasAttribute('config')) {
      const config = await this.fetchConfig(this.getAttribute('config'))
      this.editor = monaco.editor.create(document.getElementById(this.id), config)
    } else {
      this.editor = monaco.editor.create(document.getElementById(this.id), {
        language: this.getAttribute('language'),
        theme: 'vs-dark',
        automaticLayout: true,
        lineNumbersMinChars: 3,
        mouseWheelZoom: true,
        fontSize: this.getAttribute('font-size'),
        minimap: { enabled: !this.hasAttribute('no-minimap') },
        wordWrap: this.hasAttribute('word-wrap'),
        wrappingIndent: this.getAttribute('wrap-indent')
      })
    }

    if (this.hasAttribute('tab-size')) {
      this.tabSize = this.getAttribute('tab-size')
    }

    if (this.hasAttribute('src')) {
      this.setSrc()
    }
    this.__initialized = true
  }

  async setSrc () {
    const src = this.getAttribute('src')
    const contents = await this.fetchSrc(src)
    this.editor.setValue(contents)
  }

  async fetchSrc (src) {
    const response = await fetch(src)
    return response.text()
  }

  async fetchConfig (config) {
    const response = await fetch(config)
    return response.json()
  }
}

customElements.define('custom-monaco-editor', WCMonacoEditor)