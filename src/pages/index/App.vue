<template>
  <Layout />
</template>

<script setup>

</script>

<style>
:root,
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

:root {
  --index-video-width: 240px;
  --index-video-height: 135px;
}

body{
  font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif;
}

.bili-primary-button{
  background-color: #00AEEC!important;
  font-size: 14px!important;
  border-radius: 6px!important;
  line-height: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  max-width: 200px;
}

.bili-primary-button:hover{
  background-color: #00b8f6!important;
}

.primary-click-span:hover{
  color: #00AEEC!important;
}

</style>
