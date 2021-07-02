<template>
  <div class="bg-gray-100 font-serif text-tan-800">
    <div class="container flex justify-between py-4 mx-auto">
      <router-link to="/" class="w-24">
        <!-- <Logo /> -->
        ALIAS.CAT
      </router-link>
      <div class="flex justify-between gap-8 font-bold">
        <!-- <router-link to="/auctions" class="flex p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>Auctions</span>
        </router-link>
        <router-link to="/create" class="flex p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <span>Create Account</span>
        </router-link> -->

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
