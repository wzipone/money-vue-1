<template>
  <svg class="icon">
    <use :xlink:href="`#${name}`"/>
  </svg>
</template>

<script lang="ts">
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {
    importAll(require.context('../assets/icons', true, /\.svg$/));
  }catch (e) {
    console.log(e);
  }

  export default {
    name: 'Icon.vue',
    props: ['name']
  };
</script>

<style lang="scss" scoped>
   /*在iconfont 帮助里搜到了默认样式*/
  .icon {
    width: 1em;height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>