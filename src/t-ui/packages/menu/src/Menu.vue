<template>
  <div class="t-menu t-scrollbar" :class="[typeClassName]" v-scrollbar>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TMenu',
  data() {
    return {}
  },
  props: {
    type: String
  },
  computed: {
    typeClassName() {
      const type = this.type
      if (type && type === 'bigIcon') return 't-icon-big'
      return ''
    }
  },
  methods: {}
  // render(h) {
  //   const hasChildren = item => {
  //     return item.children && item.children.length > 0
  //   }
  //   const menuGroupModel = item => {
  //     return h('t-menu-group', {
  //       props: { data: item, open: this.open }
  //     })
  //   }
  //   const menuItemModel = item => {
  //     return h('t-menu-item', {
  //       props: {
  //         url: item.href,
  //         title: item.title,
  //         prefixIcon: item.icon
  //       }
  //     })
  //   }
  //   return (
  //     <div class={{ 't-menu': true }}>
  //       {this.data.map(item =>
  //         hasChildren(item) ? menuGroupModel(item) : menuItemModel(item)
  //       )}
  //     </div>
  //   )
  // }
}
</script>
