<template>
  <div id="app">
    <loading />
    <navbar />
    <router-view />
  </div>
</template>

<script>

// Components
import loading from '@/components/commons/loading/index';
import navbar from '@/components/commons/navbar/index';

export default {
  name: 'App',
  components: {
    'loading': loading,
    'navbar': navbar
  }
}
</script>
