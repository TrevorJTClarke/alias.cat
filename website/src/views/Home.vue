<template>
  <div class="bg-gray-50 text-shadow-400">
    <div class="container flex flex-col justify-center h-screen p-4 mx-auto" style="max-height: 90vh">
      <div class="mx-auto w-1/3">
        Paste image here
      </div>
    </div>
  </div>
</template>

<script>
// import Logo from '../components/ui/Logo'

export default {
  components: {
    // Logo,
  },

  mounted () {
    console.log(this.$near)
  }
}
</script>
