const DEFAULT_AMP_CONFIG = {
  v: '1.4.4',
  protocol: 'https',
  path: 'webapi.amap.com/maps',
  key: '',
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
    this._scriptLoaded = false
    this._queueEvents = []
  }

  load() {
    if (this._window.AMap && this._window.AMap.Map) return this.loadUIAMap()

    if (this._scriptLoadingPromise) return this._scriptLoadingPromise

    const script = this._document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = this._getScriptSrc()

    const UIPromise = this._config.uiVersion ? this.loadUIAMap() : null

    this._scriptLoadingPromise = new Promise((resolve, reject) => {
      this._window['amapInitComponent'] = () => {
        if (UIPromise) {
          UIPromise.then(() => {
            window.initAMapUI()
            setTimeout(resolve)
          })
        } else return resolve()
      }
      script.onerror = error => reject(error)
      this._document.head.appendChild(script)
    })

    console.info('load-ss1:', this._scriptLoadingPromise)

    return this._scriptLoadingPromise
  }

  loadUIAMap() {
    if (!this._config.uiVersion || window.AMapUI) return Promise.resolve()
    return new Promise((resolve, reject) => {
      const UIScript = document.createElement('script')
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
    const url = `${protocol}://${path}?v=${v}&key=${key}&plugin=${plugins}`
    const scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++)
      if (scripts[i].src === url) return ''
    return url
  }
}
