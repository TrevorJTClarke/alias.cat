<template>
  <main>
    <NavBar />
    <div class="bg-gray-50 py-12" style="min-height: calc(100vh - 112px)">
      <RouterView />
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from './components/ui/Footer.vue'
import NavBar from './components/ui/NavBar.vue'

export default {
  components: {
    NavBar,
    Footer
  }
}
</script>
