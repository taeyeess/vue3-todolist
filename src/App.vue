<template>
    <div class="container">
      <div class="row">
        <!-- Header -->
        <BaseHeader />
      </div>
      <div class="row">
        <todo-input/>
      </div>
      <div class="row">
        <router-view />
      </div>
    </div>
  </template>

<script lang="ts" setup>
import BaseHeader from '@/components/Header.vue';
import TodoInput from '@/components/todo-input.vue';

</script>
  
  <style lang="scss">
  #app {
    padding: 100px;
    
    .row + .row {
      margin-top: 15px;
    }
  }
  </style>