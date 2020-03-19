const DEFAULT_AMP_CONFIG = {
  key: null,
  v: '1.4.4',
  protocol: 'https',
  path: 'webapi.amap.com/maps',
  // key: '',
  plugin: [],
  callback: ''
}

export default class AMapAPILoader {
  constructor(config) {
    this._config = {
      ...DEFAULT_AMP_CONFIG,
      ...config
    }
    this._document = document
    this._window = window
    this._window = window
  }
  load() {
    if (this._window.AMap && this._window.AMap.Map) return this.loadUIAMap()

    const script = this._document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = this._getScriptSrc()

    if (this._config.uiVersion) {
      this.loadUIAMap().then(() => {
        window.initAMapUI()
      })
    }

    this._document.head.appendChild(script)
  }
  loadUIAMap() {
    if (!this._config.uiVersion || window.AMapUI) return Promise.resolve()
    return new Promise((resolve, reject) => {
      const UIScript = document.createElement('script')
      // const { protocol, key, uiVersion } = this._config
      const { uiVersion } = this._config
      const [versionMain, versionSub, versionDetail] = uiVersion.split('.')
      let src = `${this._config.protocol}://webapi.amap.com/ui/${versionMain}.${versionSub}/main-async.js`
      if (versionDetail)
        src += `?v=${versionMain}.${versionSub}.${versionDetail}`
      UIScript.src = src
      UIScript.type = 'text/javascript'
      UIScript.async = true
      this._document.head.appendChild(UIScript)
      UIScript.onload = () => {
        setTimeout(resolve, 0)
      }
      UIScript.onerror = () => reject()
    })
  }
  _getScriptSrc() {
    const { protocol, path, v, key, plugin } = this._config
    const plugins = plugin.join(',')
    return `${protocol}://${path}?v=${v}&key=${key}&plugin=${plugins}`
  }
}
