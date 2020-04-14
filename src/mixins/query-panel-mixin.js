import moment from 'moment'
const DATEFORMATS = [
  'YYYY-MM-DD HH',
  'YYYY-MM-DD HH:MM',
  'YYYY-MM-DD HH:MM:SS',
  'YYYY年MM月DD日 HH',
  'YYYY年MM月DD日 HH时',
  'YYYY年MM月DD日 HH:MM',
  'YYYY年MM月DD日 HH时MM分',
  'YYYY年MM月DD日 HH:MM:SS',
  'YYYY年MM月DD日 HH时MM分SS秒'
]
const STARTFORMAT = 'YYYY-MM-DD 00:00:00'
const ENDFORMAT = 'YYYY-MM-DD 23:59:59'

export default {
  data() {
    return {
      dateConfig: {
        /** 日期类型 date: 日期（默认）; day: 天; week: 周; month: 月; half-year: 半年; year: 年 */
        type: 'date',
        format: 'YYYY-MM-DD',
        stime: 'stime',
        etime: 'etime'
      }
    }
  },
  mounted() {
    this.initDateType()
  },
  methods: {
    /**根据类型判断初始化"时间类型" */
    initDateType() {
      const { type } = this.dateConfig
      if (type === 'day') this.initDay()
      else if (type === 'week') this.initWeek()
      else if (type === 'month') this.initMonth()
      else if (type === 'half-year') this.initHalfYear()
      else if (type === 'year') this.initYear()
      else this.initDate()
    },
    /**初始化日期 */
    initDate() {
      const { stime: startName, etime: endName } = this.dateConfig
      let { stime, etime } = this.getPeriod()

      if (Number(moment().format('DD')) === 1)
        stime.month(stime.month() - 1).date(1)
      else stime.date(1)

      this.setDate(stime, startName)
      this.setDate(etime, endName)
    },
    /**初始化当前天 */
    initDay() {
      const { stime: startName, etime: endName } = this.dateConfig
      const { stime, etime } = this.getPeriod()

      this.setDate(stime, startName)
      this.setDate(etime, endName)
    },
    /**初始化一周 */
    initWeek() {
      const { stime: startName, etime: endName } = this.dateConfig
      const { stime, etime } = this.getPeriod()

      stime.day(-7 + stime.day())

      this.setDate(stime, startName)
      this.setDate(etime, endName)
    },
    /**初始化一月 */
    initMonth() {
      const { stime: startName, etime: endName } = this.dateConfig
      const { stime, etime } = this.getPeriod()

      stime.day(-30 + stime.day())

      this.setDate(stime, startName)
      this.setDate(etime, endName)
    },
    /**初始化半年 */
    initHalfYear() {
      const { stime: startName, etime: endName } = this.dateConfig
      const { stime, etime } = this.getPeriod()

      stime.day(-182 + stime.day())

      this.setDate(stime, startName)
      this.setDate(etime, endName)
    },
    /**初始化一年 */
    initYear() {
      const { stime: startName, etime: endName } = this.dateConfig
      const { stime, etime } = this.getPeriod()

      stime.day(-365 + stime.day())

      this.setDate(stime, startName)
      this.setDate(etime, endName)
    },
    /**
     * 设置日期
     *
     * @param {*} value：日期
     * @param {*} name：变量名
     * @param {boolean} [hasToDateType=true]：是否转成Date类型 默认：true
     */
    setDate(value, name, hasToDateType = true) {
      const errText1 = 'setDate: "name" is undefined'
      const errText2 = 'setDate: "name" is not String type'
      if (name == null || name === '') throw new TypeError(errText1)
      if (!(typeof name === 'string')) throw new TypeError(errText2)
      this.query[name] = hasToDateType ? this.toDateType(value) : value
    },
    /**
     * 时间段的开始、结束时间
     *
     * @param {*} [stime=moment()]：开始时间
     * @param {*} [etime=moment()]：结束时间
     * @returns
     */
    getPeriod(stime = moment(), etime = moment()) {
      const { format } = this.dateConfig
      const formatUpperCase = format.toUpperCase()

      if (DATEFORMATS.indexOf(formatUpperCase) >= 0) {
        stime = stime.format(STARTFORMAT)
        etime = etime.format(ENDFORMAT)
      }

      return { stime, etime }
    },
    /**
     * 转化为Date类型
     *
     * @param {*} date
     * @returns
     */
    toDateType(date) {
      return new Date(date)
    }
  }
}
