<template>
  <div class="layout">
    <side-bar></side-bar>

    <nav-bar></nav-bar>

    <main-container></main-container>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import SideBar from './components/SideBar/index.vue'
import NavBar from './components/NavBar/index.vue'
import MainContainer from './components/MainContainer/index.vue'
</script>

<style lang="scss" scoped></style>
