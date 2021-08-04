<template>
  <div class="container mx-auto">
    <div class=" mb-12">
      <h1 class="text-6xl font-bold text-gray-900 sm:truncate mb-4">
        New Auction
      </h1>
    </div>

    <div class="w-full flex gap-12">
      <div class="w-1/4">

        <ul class="flex-column gap-8 font-extrabold">
          <li class="flex items-center my-4 text-manatee-800" v-for="st in steps" :key="st.id">
            <svg v-if="step > st.id" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-1 mr-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <div v-if="step <= st.id"
              class="w-1 h-1 rounded-2xl border-4 p-1 m-1.5 mr-4"
              :class="{
                'border-manatee-400 bg-manatee-800': step == st.id,
                'border-gray-50 bg-gray-400': step < st.id
              }"
            />
            <span>{{ st.title }}</span>
          </li>
        </ul>

      </div>
      <div class="w-3/4">

        <section id="step1" v-if="step == 1" class="bg-white">

          <div class="p-8">
            <h1 class="text-4xl font-bold text-gray-900 sm:truncate mb-4">
              Auction Setup
            </h1>

            <div>

              <div class="grid grid-cols-3 gap-6 mb-12">
                <div class="col-span-3 sm:col-span-2">
                  <label for="auction_title" class="block text-lg leading-6 font-bold text-gray-700">
                    Account to Auction
                  </label>
                  <div class="mt-1 flex">
                    <span class="inline-flex items-center p-4 border-b border-gray-300 text-gray-500 bg-transparent text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </span>
                    <input type="text" name="auction_title" id="auction_title" class="flex-1 block w-full p-4 bg-transparent border-b border-gray-300" placeholder="hello.near" />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6 mb-12">
                <div class="col-span-3 sm:col-span-2">
                  <label for="auction_underwriter" class="block text-lg leading-6 font-bold text-gray-700">
                    Beneficiary
                  </label>
                  <div class="mt-1 flex">
                    <span class="inline-flex items-center p-4 border-b border-gray-300 text-gray-500 bg-transparent text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </span>
                    <input type="text" name="auction_underwriter" id="auction_underwriter" class="flex-1 block w-full p-4 bg-transparent border-b border-gray-300" placeholder="there.near" />
                  </div>
                  <p>The account that receives the proceeds of the auction and manages the auction.</p>
                </div>
              </div>

              <div class="flex items-center py-5 mb-12">
                <div class="flex-none w-20 h-8 mr-4">
                  <Switch
                    v-model="enabled"
                    :class="enabled ? 'bg-manatee-800' : 'bg-manatee-200'"
                    class="relative inline-flex mr-8 flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    style="height:38px; width:74px"
                  >
                    <span class="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      :class="enabled ? 'translate-x-9' : 'translate-x-0'"
                      class="pointer-events-none inline-block rounded-full bg-white transform ring-0 transition ease-in-out duration-200"
                      style="height:34px; width:34px"
                    />
                  </Switch>
                </div>
                <div class="flex-grow h-12">
                  <div>
                    <h3 class="text-lg leading-6 font-bold text-gray-900 dark:text-white">
                      Blind Auction
                    </h3>
                    <p class="mt-1 text-md font-bold text-gray-500">
                      Allow bids amounts to be hidden until auction bid period is over. This requires all users to submit a second transaction to reveal their bid.
                    </p>
                  </div>
                </div>
              </div>

              <div class="w-full">
                <h4 class="text-lg leading-6 font-bold mb-2">End Time</h4>

                <RadioGroup v-model="selected">
                  <div class="flex space-x-2">
                    <RadioGroupOption
                      as="template"
                      v-for="block in blockTimes"
                      :key="block.name"
                      :value="block"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :class="[
                          active
                            ? 'ring-2 ring-offset-2 ring-offset-light-blue-300 ring-white ring-opacity-60'
                            : '',
                          checked
                            ? 'bg-manatee-800 text-white '
                            : 'bg-manatee-50 ',
                        ]"
                        class="relative flex w-1/4 px-5 py-4 cursor-pointer focus:outline-none"
                      >
                        <div class="flex items-center justify-between w-full">
                          <div class="flex items-center">
                            <div class="text-md">
                              <RadioGroupLabel
                                as="p"
                                :class="checked ? 'text-white' : 'text-manatee-900'"
                                class="font-bold"
                              >
                                {{ block.name }}
                              </RadioGroupLabel>
                            </div>
                          </div>
                          <div v-show="checked" class="flex-shrink-0 text-manatee-500">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
                              <circle
                                cx="12"
                                cy="12"
                                r="12"
                                fill="#fff"
                                fill-opacity="0.2"
                              />
                              <path
                                d="M7 13l3 3 7-7"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup>
              </div>

            </div>
          </div>

          <div class="flex bg-gray-100 p-8">
            <button @click.prevent="goToConfirm()" class=" w-1/4 p-4 bg-manatee-500 hover:bg-manatee-800 text-gray-50 font-black uppercase">Next</button>
          </div>

        </section>
        <section id="step2" v-if="step == 2" class="bg-white">

          <div v-if="!deploying" class="p-8">
            <h1 class="text-4xl font-bold text-gray-900 sm:truncate mb-4">
              Confirm Auction Details
            </h1>

            <div class="sm:flex sm:items-start my-8 p-4 border border-yellow-300 border-opacity-50 bg-yellow-200 bg-opacity-5">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left font-bold">
                <h3 class="text-xl leading-6 text-gray-900">
                  Are You 100% Sure?
                </h3>
                <div class="mt-2">
                  <p class="text-base text-gray-500">
                    Auctioning your account removes your ownership of the account. You can always cancel the auction until the bid phase is complete.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex space-x-12">
              <div class="w-1/2 text-xl">
                <h4 class="font-bold">By submitting your account to auction:</h4>
                <ul class="list-disc list-inside">
                  <li class="">Ownership will be transfered to Nym Escrow</li>
                  <li class="">All access keys will be removed</li>
                  <li class="">Extra balance will be sent to Beneficiary</li>
                </ul>
              </div>
              <div class="w-1/2 p-4 border border-gray-100">
                <h3 class="uppercase mb-2">Auction Cost</h3>
                <div class="flex items-center text-4xl font-extrabold mt-4 mb-8 text-gray-900">
                  <h2>1.337</h2>
                  <NearToken class="w-8 h-8 ml-4" />
                </div>

                <h3 class="uppercase mb-2">Account To Auction</h3>
                <span class="inline-flex text-md text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  {{auction.title}}
                </span>
              </div>
            </div>
          </div>

          <div v-if="deploying" class="flex-column items-center text-center p-8 pb-16">
            <Loader/>
            <h1 class="text-4xl font-bold text-gray-900 sm:truncate mb-4">
              Deploying Auction...
            </h1>
            <p>Please wait while you're auction is being created.</p>
          </div>

          <div v-if="!deploying" class="flex justify-between bg-gray-100 p-8">
            <button @click.prevent="createAuction()" class=" w-1/4 p-4 bg-manatee-500 hover:bg-manatee-800 text-gray-50 font-black uppercase">Pay & Create Auction</button>
            <button @click.prevent="goToSetup()" class=" w-1/4 p-4 bg-gray-400 hover:bg-gray-800 text-gray-50 font-black uppercase">Back</button>
          </div>

        </section>
        <section id="step3" v-if="step == 3" class="bg-white">

          <div class="p-8">
            <h1 class="text-4xl font-bold text-gray-900 sm:truncate mb-4">
              Auction Setup Complete!
            </h1>

            <p class="text-xl">Your account "{{auction.title}}" is now deployed and available!</p>
            <br>
            <p class="text-xl">There's still a couple things to make your auction even better:</p>
            <br>

            <h4 class="text-2xl font-bold">1. Setup Email Notifications</h4>
            <p class="text-xl">Add an email to get notified when your auction gets bids, finishes & is ready for claiming proceeds.</p>

            <label for="email_alerts" class="block mt-8 text-md font-bold text-gray-700">Email address</label>
            <div class="flex">
              <span class="inline-flex items-center p-4 border-b border-gray-300 text-gray-500 bg-transparent text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input type="text" name="email_alerts" id="email_alerts" class="flex-1 block w-full p-4 bg-transparent border-b border-gray-300" placeholder="your@email.com" />
            </div>
            <p><small>Your email will never be used for anything other than alerts for this auction. Change your settings at any time.</small></p>

            <h4 class="text-2xl font-bold mt-12">2. Share Your Auction</h4>
            <p class="text-xl">Copy the following link & share to friends or on social media!</p>

            <div class="flex">
              <span class="inline-flex items-center p-4 border-b border-gray-300 text-gray-500 bg-transparent text-sm">
                <clipboard-copy for="share_link" class="text-manatee-600">
                  <div class="clip-main">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div class="clip-notice" hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </clipboard-copy>
              </span>
              <input id="share_link" type="text" value="auction/24343" class="flex-1 block w-full p-4 bg-transparent border-b border-gray-300" />
            </div>

          </div>

          <div class="flex justify-between bg-gray-100 p-8">
            <button @click.prevent="$near.loginAccount()" class=" w-1/4 p-4 bg-manatee-500 hover:bg-manatee-800 text-gray-50 font-black uppercase">Login As Beneficiary</button>
            <button @click.prevent="goToDetailPage()" class=" w-1/4 p-4 bg-gray-500 hover:bg-gray-800 text-gray-50 font-black uppercase">Go To Auction</button>
          </div>

        </section>

      </div>
    </div>

  </div>
</template>

<script>
import '@github/clipboard-copy-element'
import { ref } from 'vue'
import {
  Dialog,
  DialogTitle,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
  Switch,
} from '@headlessui/vue'
import Loader from '../components/Loader'
import Hr from '../components/Hr'
import NearToken from '../components/NearToken'

const steps = [
  { id: 1, title: 'Setup' },
  { id: 2, title: 'Confirm' },
  { id: 3, title: 'Finish' },
]

const blockTimes = [
  {
    name: "12 hours",
    blocks: 43200,
  },
  {
    name: "1 day",
    blocks: 86400,
  },
  {
    name: "3 days",
    blocks: 259200,
  },
  {
    name: "1 week",
    blocks: 604800,
  },
];

export default {

  setup() {
    const enabled = ref(false)
    const selected = ref(blockTimes[0])

    return { enabled, selected, blockTimes }
  },

  data() {
    return {
      step: 1,
      steps,
      user: 'its.near',
      currentBlock: 44000000,
      auction: {},
      deploying: false,
    }
  },

  components: {
    Dialog,
    DialogTitle,
    Loader,
    Hr,
    NearToken,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
    Switch,
  },

  computed: {
  },

  methods: {
    goToSetup() {
      this.step = 1
    },
    createAuction() {
      this.deploying = true

      setTimeout(() => {
        this.deploying = false
        this.goToFinish()
      }, 3000)
    },
    goToConfirm() {
      this.step = 2
    },
    goToFinish() {
      this.step = 3
    },
    goToDetailPage() {
      // this.step = 3
    },
  },

  mounted() {
    document.addEventListener('clipboard-copy', e => {
      const cmain = e.target.querySelector('.clip-main')
      const notice = e.target.querySelector('.clip-notice')
      cmain.hidden = true
      notice.hidden = false
      setTimeout(() => {
        cmain.hidden = false
        notice.hidden = true
      }, 2000)
    })
  }
}
</script>