<template>
  <div class="t-menu-group">
    <t-menu-item
      class="t-menu-group__title"
      :class="[titleClassName, { active: display }]"
      :id="id"
      :title="title"
      :prefixIcon="icon"
      suffixIcon="el-icon-caret-bottom"
      @menu-item-click="handleMenuGroupTitleClick"
    >
      <template v-if="$slots.title">
        <slot name="title"></slot>
      </template>
    </t-menu-item>
    <transition name="menu-panel">
      <ul class="t-menu-group__panel" :class="[panelClassName]" v-if="display">
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TMenuGroup',
  data() {
    return {
      display: this.show
    }
  },
  props: {
    id: String,
    title: String,
    icon: String,
    visible: {
      type: Boolean,
      default: false
    },
    tpClass: String,
    tilteClass: String,
    panelClass: String
  },
  computed: {
    titleClassName() {
      if (this.tilteClass) return this.tilteClass
      if (this.tpClass) return this.tpClass + '__title'
      return ''
    },
    panelClassName() {
      if (this.panelClass) return this.panelClass
      if (this.tpClass) return this.tpClass + '__panel'
      return ''
    }
  },
  methods: {
    handleMenuGroupTitleClick() {
      this.display = !this.display
      if (this.$listeners['title-click']) this.$emit('title-click', this.id)
    }
  },
  watch: {
    visible(value) {
      this.display = value
    },
    display(value) {
      if (this.$listeners['update:visible']) this.$emit('update:visible', value)
    }
  }
  // render(h) {
  //   return (
  //     <div class="t-menu-group">
  //       <t-menu-item
  //         class={{
  //           't-menu-title': true,
  //           active: this.hasActiveMenuPanel,
  //           open: this.hasOpenMenuPanel
  //         }}
  //         props={{
  //           title: this.data.title,
  //           prefixIcon: this.data.icon,
  //           suffixIcon: 'icon-expansion-d'
  //         }}
  //         nativeOn={{
  //           click: this.handlerMenuTitleClick(this.data)
  //         }}
  //       ></t-menu-item>
  //       <div class={{ 't-menu-panel': true, open: this.hasOpenMenuPanel }}>
  //         {this.data.children.map(item =>
  //           item.children
  //             ? h('t-menu-group', {
  //                 props: { data: item, open: this.openPanelItem }
  //               })
  //             : h('t-menu-item', {
  //                 props: {
  //                   url: item.href,
  //                   title: item.title,
  //                   prefixIcon: item.icon
  //                 }
  //               })
  //         )}
  //       </div>
  //     </div>
  //   )
  // }
}
</script>
