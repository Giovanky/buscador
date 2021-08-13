<template>
  <div class="container">
    <Nav />
    <RouteLocation />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import RouteLocation from '@/components/RouteLocation.vue'

export default {
  name: 'RouteView',
  components: {
    Nav,
    RouteLocation
  }
}
</script>
