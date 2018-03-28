<template>
  <div>
    <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data() {
    return {
      msg: 'Sorry, the page you\'re looking for doesn\'t exist.'
    }
  }
}
</script>
