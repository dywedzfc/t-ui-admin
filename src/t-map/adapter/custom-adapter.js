export default options => {
  const { init } = options
  const result = {
    ...options,
    methods: {
      __initComponent: init
    }
  }
  return result
}
