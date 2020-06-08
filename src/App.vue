<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<style lang="scss">
// css reset
  *{
    margin: 0;padding: 0;
    box-sizing: border-box;
  }
  *::before, *::after{
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  button{
    font: inherit;
    color: inherit;
  }
  ul, ol{
    list-style: none;
  }

</style>
