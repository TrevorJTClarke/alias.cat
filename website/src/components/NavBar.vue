<template>
  <div class="bg-gray-50 text-tan-800">
    <div class="container flex justify-between py-4 mx-auto">
      <router-link to="/" class="font-semibold tracking-wide">
        🦸‍♀️ Alias
      </router-link>
      <div class="flex justify-between gap-12 font-bold">
        <router-link to="/docs" class="flex p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Integrate</span>
        </router-link>

        <AuthButton />
      </div>
    </div>
  </div>
</template>

<script>
import AuthButton from './AuthButton'
import Logo from './Logo'

export default {
  components: {
    AuthButton,
    Logo,
  },

}
</script>
