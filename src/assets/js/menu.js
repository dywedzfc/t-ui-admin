const menuList = [
  { id: 'wdsy', title: '首页', icon: 'icon-home', href: '/home' },
  {
    id: 'pbgl',
    title: '排班管理',
    icon: 'icon-compose-type',
    fullPath: '/pbgl',
    children: [
      { id: 'pbcx', title: '排班查询', href: '/pbgl/pbcx' },
      { id: 'bcsz', title: '班次设置', href: '/pbgl/bcsz' },
      { id: 'mbsz', title: '模板设置', href: '/pbgl/mbsz' },
      { id: 'znpb', title: '智能排班', href: '/pbgl/znpb' },
      { id: 'qwpbdd', title: '勤务排班(大队)', href: '/pbgl/qwpb/dd' },
      { id: 'qwpbzd', title: '勤务排班(中队)', href: '/pbgl/qwpb/zd' },
      { id: 'pbtx', title: '排班提醒', href: '/pbgl/pbtx' }
    ]
  },
  {
    id: 'tjgl',
    title: '统计管理',
    icon: 'icon-statistics',
    fullPath: '/tjgl',
    children: [
      { id: 'cxtj', title: '查询统计', href: '/tjgl/cxtj' },
      { id: 'qjtj', title: '请假统计', href: '/tjgl/qjtj' },
      { id: 'txtj', title: '调休统计', href: '/tjgl/txtj' },
      { id: 'hdtj', title: '活动统计', href: '/tjgl/hdtj' },
      { id: 'nqtj', title: '内勤统计', href: '/tjgl/nqtj' },
      { id: 'lmtj', title: '路面统计', href: '/tjgl/lmtj' },
      { id: 'tqtj', title: '铁骑统计', href: '/tjgl/tqtj' },
      { id: 'pbtj', title: '排班统计', href: '/tjgl/pbtj' }
    ]
  }
]
const systemMenuList = [
  { id: 'zdfx', title: '终端分析系统', icon: 'icon-kefu' },
  { id: 'qyhj', title: '企业函件管理', icon: 'icon-peoplelist', href: '' },
  { id: 'gdxt', title: '工单管理系统', icon: 'icon-mail', href: '' },
  { id: 'wxgl', title: '维修管理系统', icon: 'icon-label', href: '' },
  { id: 'dldd', title: '运力调度管理', icon: 'icon-find', href: '' },
  { id: 'fwpt', title: '服务平台管理', icon: 'icon-monitor', href: '' },
  { id: 'hyyx', title: '行业运行情况', icon: 'icon-taxi', href: '' },
  { id: 'sjdj', title: '运政数据接入', icon: 'icon-report', href: '' },
  { id: 'zffw', title: '支付服务', icon: 'icon-form', href: '' },
  { id: 'swxc', title: '导航屏升级', icon: 'icon-consultation', href: '' }
]
const secondaryMenuList = {
  zdfx: [
    { id: 'zjgz', title: '主机故障', icon: 'icon-gzxx', href: '/zdfx/zjgz' },
    { id: 'zdyc', title: '车辆查询', icon: 'icon-zdxx', href: '/zdfx/form' },
    { id: 'whltj', title: '地图查询', icon: 'icon-tjxx', href: '/zdfx/map' },
    {
      id: 'clgl',
      title: '标签页',
      icon: 'icon-manage',
      fullPath: '/zdfx/tabs',
      children: [
        {
          id: 'lps',
          title: '卡片式',
          icon: 'icon-tjxx',
          href: '/zdfx/tabs/card'
        },
        {
          id: 'lps2',
          title: '卡片式2',
          icon: 'icon-tjxx',
          href: '/zdfx/tabs/card2'
        },
        {
          id: 'zdy',
          title: '自定义标签页',
          icon: 'icon-tjxx',
          href: '/zdfx/tabs/customize'
        },
        {
          id: 'wsxclcx',
          title: '未上线车辆查询',
          icon: 'icon-cxxx',
          href: '/zdfx/clgl/wsxclcx'
        }
      ]
    },
    { id: 'spyc', title: '视频异常', icon: 'icon-ycxx', href: '/zdfx/spyc' },
    {
      id: 'spyw',
      title: '视频移位巡检',
      icon: 'icon-xcxx',
      href: '/zdfx/spyw'
    },
    {
      id: 'wxgdcx',
      title: '维修工单',
      icon: 'icon-wxxx',
      href: '/zdfx/wxgdcx'
    },
    {
      id: 'zjgzlsjl',
      title: '主机故障历史记录',
      icon: 'icon-lsxx',
      href: '/zdfx/zjgzlsjl'
    }
  ],
  qyhj: [
    { id: 'hjtj', title: '函件添加', icon: 'el-icon-plus', href: '/qyhj/hjtj' },
    { id: 'hjfs', title: '函件发送', icon: 'icon-fsxx', href: '/qyhj/hjfs' },
    { id: 'hjcx', title: '函件查询', icon: 'icon-cxxx', href: '/qyhj/hjcx' },
    { id: 'hjsh', title: '函件审核', icon: 'icon-shxx', href: '/qyhj/hjsh' },
    { id: 'hjfw', title: '函件服务', icon: 'icon-kefu', href: '/qyhj/hjfw' },
    {
      id: 'hjfwtj',
      title: '函件服务统计',
      icon: 'icon-tjxx',
      href: '/qyhj/hjfwtj'
    },
    {
      id: 'btclgl',
      title: '报停车辆管理',
      icon: 'icon-manage',
      href: '/qyhj/btclgl'
    },
    {
      id: 'btcltj',
      title: '报停车辆统计',
      icon: 'icon-tjxx',
      href: '/qyhj/btcltj'
    }
  ],
  gdxt: [
    { id: 'gdpf', title: '工单派发', icon: 'icon-pfxx', href: '/gdxt/gdpf' },
    { id: 'gdgl', title: '工单管理', icon: 'icon-manage', href: '/gdxt/gdgl' },
    { id: 'gdtj', title: '工单统计', icon: 'icon-tjxx', href: '/gdxt/gdtj' }
  ],
  wxgl: [
    {
      id: 'wxzlbg',
      title: '维修质量报告',
      icon: 'icon-form',
      href: '/wxgl/wxzlbg'
    },
    {
      id: 'wxjlcx',
      title: '维修记录查询',
      icon: 'icon-cxxx',
      href: '/wxgl/wxjlcx'
    },
    {
      id: 'wxjltj',
      title: '维修记录统计',
      icon: 'icon-tjxx',
      href: '/wxgl/wxjltj'
    }
  ],
  dldd: [
    {
      id: 'dlddcx',
      title: '动力调度查询',
      icon: 'icon-cxxx',
      href: '/dldd/dlddcx'
    },
    {
      id: 'dlddtj',
      title: '动力调度统计',
      icon: 'icon-tjxx',
      href: '/dldd/dlddtj'
    }
  ],
  fwpt: [
    {
      id: 'qyfzxcx',
      title: '企业分中心查询',
      icon: 'icon-cxxx',
      href: '/fwpt/qyfzxcx'
    },
    {
      id: 'qyfzxtj',
      title: '企业分中心统计',
      icon: 'icon-tjxx',
      href: '/fwpt/qyfzxtj'
    },
    {
      id: 'scfzxcx',
      title: '手持分中心查询',
      icon: 'icon-cxxx',
      href: '/fwpt/scfzxcx'
    },
    {
      id: 'scfzxtj',
      title: '手持分中心统计',
      icon: 'icon-tjxx',
      href: '/fwpt/scfzxtj'
    },
    {
      id: 'wxglcx',
      title: '维修管理查询',
      icon: 'icon-cxxx',
      href: '/fwpt/wxglcx'
    },
    {
      id: 'wxgltj',
      title: '维修管理统计',
      icon: 'icon-tjxx',
      href: '/fwpt/wxgltj'
    },
    {
      id: 'wazcx',
      title: '终端未安装查询',
      icon: 'icon-cxxx',
      href: '/fwpt/wazcx'
    },
    {
      id: 'aztj',
      title: '安装情况统计',
      icon: 'icon-tjxx',
      href: '/fwpt/aztj'
    },
    {
      id: 'ydaz',
      title: '月度安装分析',
      icon: 'icon-fxxx',
      href: '/fwpt/ydaz'
    },
    {
      id: 'btcltj',
      title: '报停车辆统计',
      icon: 'icon-tjxx',
      href: '/fwpt/btcltj'
    },
    {
      id: 'spgl',
      title: '审批管理',
      icon: 'icon-manage',
      fullPath: '/fwpt/spgl',
      children: [
        {
          id: 'clzrsp',
          title: '车辆转入审批',
          icon: 'icon-shxx',
          href: '/fwpt/spgl/clzrsp'
        },
        {
          id: 'cpbgsp',
          title: '车牌号变更审批',
          icon: 'icon-shxx',
          href: '/fwpt/spgl/cpbgsp'
        },
        {
          id: 'cpbtsp',
          title: '车辆报停审批',
          icon: 'icon-shxx',
          href: '/fwpt/spgl/cpbtsp'
        }
      ]
    },
    {
      id: 'hcgl',
      title: '回场管理',
      icon: 'icon-manage',
      fullPath: '/fwpt/hcgl',
      children: [
        {
          id: 'hcclcx',
          title: '回场车辆查询',
          icon: 'icon-cxxx',
          href: '/fwpt/hcgl/hcclcx'
        },
        {
          id: 'hcbbtj',
          title: '回场报表统计',
          icon: 'icon-tjxx',
          href: '/fwpt/hcgl/hcbbtj'
        },
        {
          id: 'washcclcx',
          title: '未按时回场车辆查询',
          icon: 'icon-cxxx',
          href: '/fwpt/hcgl/washcclcx'
        },
        {
          id: 'hcgssz',
          title: '回场公司设置',
          icon: 'icon-wxxx',
          href: '/fwpt/hcgl/hcgssz'
        },
        {
          id: 'hcqysz',
          title: '回场区域设置',
          icon: 'icon-wxxx',
          href: '/fwpt/hcgl/hcqysz'
        }
      ]
    }
  ],
  hyyx: [
    {
      id: 'dcyyqk',
      title: '单车营运情况',
      icon: 'icon-qkxx',
      href: '/hyyx/dcyyqk'
    },
    {
      id: 'hyyyqk',
      title: '行业营运情况',
      icon: 'icon-qkxx',
      href: '/hyyx/hyyyqk'
    },
    {
      id: 'hypjyxqk',
      title: '行业平均运行情况',
      icon: 'icon-qkxx',
      href: '/hyyx/hypjyxqk'
    },
    {
      id: 'ztyyqs',
      title: '总体营运趋势',
      icon: 'icon-fxxx',
      href: '/hyyx/ztyyqs'
    },
    {
      id: 'qyclyyqk',
      title: '企业车辆营运情况',
      icon: 'icon-qkxx',
      href: '/hyyx/qyclyyqk'
    },
    {
      id: 'jsysrqk',
      title: '驾驶员收入情况',
      icon: 'icon-qkxx',
      href: '/hyyx/jsysrqk'
    },
    {
      id: 'clyxph',
      title: '车辆运行排行',
      icon: 'icon-phxx',
      href: '/hyyx/clyxph'
    },
    {
      id: 'ylxqrd',
      title: '运力需求热点',
      icon: 'icon-rdxx',
      href: '/hyyx/ylxqrd'
    },
    {
      id: 'dcrdod',
      title: '打车热点OD分析',
      icon: 'icon-fxxx',
      fullPath: '/hyyx/dcrdod',
      children: [
        {
          id: 'odyysj',
          title: 'OD营运数据分析',
          icon: 'icon-fxxx',
          href: '/hyyx/dcrdod/odyysj'
        },
        {
          id: 'odlxtj',
          title: 'OD流向统计',
          icon: 'icon-tjxx',
          href: '/hyyx/dcrdod/odlxtj'
        },
        {
          id: 'odlxt',
          title: 'OD流向图',
          icon: 'icon-kefu',
          href: '/hyyx/dcrdod/odlxt'
        }
      ]
    },
    {
      id: 'yjtfwz',
      title: '夜间停放位置分析',
      icon: 'icon-fxxx',
      href: '/hyyx/yjtfwz'
    },
    {
      id: 'jsywftj',
      title: '驾驶员违法统计',
      icon: 'icon-tjxx',
      href: '/hyyx/jsywftj'
    },
    { id: 'tscx', title: '投诉查询', icon: 'icon-cxxx', href: '/hyyx/tscx' },
    {
      id: 'zpsj',
      title: '抓拍数据',
      icon: 'icon-sjxx',
      fullPath: '/hyyx/zpsj',
      children: [
        {
          id: 'zpsjcx',
          title: '抓拍数据查询',
          icon: 'icon-cxxx',
          href: '/hyyx/zpsj/zpsjcx'
        },
        {
          id: 'calltj',
          title: '场站流量统计',
          icon: 'icon-tjxx',
          href: '/hyyx/zpsj/calltj'
        },
        {
          id: 'rlltj',
          title: '日流量统计',
          icon: 'icon-tjxx',
          href: '/hyyx/zpsj/rlltj'
        },
        {
          id: 'fdlltj',
          title: '分段流量统计',
          icon: 'icon-tjxx',
          href: '/hyyx/zpsj/fdlltj'
        }
      ]
    }
  ],
  sjdj: [
    { id: 'clxx', title: '车辆信息', icon: 'icon-taxi', href: '/sjdj/clxx' },
    {
      id: 'jsyxx',
      title: '驾驶员信息',
      icon: 'icon-user',
      href: '/sjdj/jsyxx'
    },
    { id: 'gsxx', title: '公司信息', icon: 'icon-gsxx', href: '/sjdj/gsxx' },
    { id: 'jbxx', title: '交班信息', icon: 'icon-jbxx', href: '/sjdj/jbxx' },
    {
      id: 'fwzlpt',
      title: '服务质量平台',
      icon: 'icon-kefu',
      href: '/sjdj/fwzlpt'
    }
  ],
  zffw: [
    {
      id: 'zfmxcx',
      title: '支付明细查询',
      icon: 'icon-cxxx',
      href: '/zffw/zfmxcx'
    },
    {
      id: 'zfzdtf',
      title: '支付账单统计',
      icon: 'icon-tjxx',
      href: '/zffw/zfzdtf'
    }
  ]
}

export function getMenuList() {
  return menuList
}

export function getSystemMenuList() {
  return systemMenuList
}

export function getSecondaryMenuList() {
  return secondaryMenuList
}
