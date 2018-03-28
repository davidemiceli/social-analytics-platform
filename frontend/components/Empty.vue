<template>
  <div class="headmargin m-lr-10">
    <h1>Empty {{msg}}</h1>
  </div>
</template>

<script>
// Routes
import { Routes } from '@/router/routes';

export default {
  name: Routes.EMPTY.name,
  data() {
    return {
      msg: 'nothing'
    }
  }
}
</script>
