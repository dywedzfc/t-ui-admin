const menuList = [
  {
    id: 'wdsy',
    title: '首页',
    icon: 'icon-home',
    href: '/home'
  },
  {
    id: 'pbgl',
    title: '排班管理',
    icon: 'icon-compose-type',
    fullPath: '/pbgl',
    children: [
      {
        id: 'pbcx',
        title: '排班查询',
        href: '/pbgl/pbcx'
      },
      {
        id: 'bcsz',
        title: '班次设置',
        href: '/pbgl/bcsz'
      },
      {
        id: 'mbsz',
        title: '模板设置',
        href: '/pbgl/mbsz'
      },
      {
        id: 'znpb',
        title: '智能排班',
        href: '/pbgl/znpb'
      },
      {
        id: 'qwpbdd',
        title: '勤务排班(大队)',
        href: '/pbgl/qwpb/dd'
      },
      {
        id: 'qwpbzd',
        title: '勤务排班(中队)',
        href: '/pbgl/qwpb/zd'
      },
      {
        id: 'pbtx',
        title: '排班提醒',
        href: '/pbgl/pbtx'
      }
    ]
  },
  {
    id: 'tjgl',
    title: '统计管理',
    icon: 'icon-statistics',
    fullPath: '/tjgl',
    children: [
      {
        id: 'cxtj',
        title: '查询统计',
        href: '/tjgl/cxtj'
      },
      {
        id: 'qjtj',
        title: '请假统计',
        href: '/tjgl/qjtj'
      },
      {
        id: 'txtj',
        title: '调休统计',
        href: '/tjgl/txtj'
      },
      {
        id: 'hdtj',
        title: '活动统计',
        href: '/tjgl/hdtj'
      },
      {
        id: 'nqtj',
        title: '内勤统计',
        href: '/tjgl/nqtj'
      },
      {
        id: 'lmtj',
        title: '路面统计',
        href: '/tjgl/lmtj'
      },
      {
        id: 'tqtj',
        title: '铁骑统计',
        href: '/tjgl/tqtj'
      },
      {
        id: 'pbtj',
        title: '排班统计',
        href: '/tjgl/pbtj'
      }
    ]
  }
]

export function getMenuList() {
  return menuList
}
