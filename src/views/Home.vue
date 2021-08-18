<template>
  <div class="container">
    <Nav />
    <Front />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Front from '@/components/Front.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    Front
  }
}
</script>
