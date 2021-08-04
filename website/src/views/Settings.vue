<template>
  <div class="container mx-auto">

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
            <p class="mt-1 text-sm text-gray-600">
              Decide which communications you'd like to receive.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div class="grid grid-cols-6 gap-6">

                  <div class="col-span-6 sm:col-span-4">
                    <label for="email_address" class="block text-base font-bold text-gray-700">Email address</label>
                    <input type="text" name="email_address" id="email_address" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                  </div>
                </div>
                <fieldset>
                  <legend class="text-base font-bold text-gray-900">Email Settings</legend>
                  <div class="mt-4 space-y-4">

                    <div class="flex items-center py-5">
                      <div class="flex-none w-20 h-8 mr-4">
                        <Switch
                          v-model="updates"
                          :class="updates ? 'bg-manatee-800' : 'bg-manatee-200'"
                          class="relative inline-flex mr-8 flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          style="height:38px; width:74px"
                        >
                          <span class="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            :class="updates ? 'translate-x-9' : 'translate-x-0'"
                            class="pointer-events-none inline-block rounded-full bg-white transform ring-0 transition ease-in-out duration-200"
                            style="height:34px; width:34px"
                          />
                        </Switch>
                      </div>
                      <div class="flex-grow h-12">
                        <div>
                          <h3 class="text-lg leading-6 font-bold text-gray-900 dark:text-white">
                            Auction Updates
                          </h3>
                          <p class="mt-1 text-md font-bold text-gray-500">
                            Get notified when your auction goes live, bidding, reveal & finished.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center py-5">
                      <div class="flex-none w-20 h-8 mr-4">
                        <Switch
                          v-model="bids"
                          :class="bids ? 'bg-manatee-800' : 'bg-manatee-200'"
                          class="relative inline-flex mr-8 flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          style="height:38px; width:74px"
                        >
                          <span class="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            :class="bids ? 'translate-x-9' : 'translate-x-0'"
                            class="pointer-events-none inline-block rounded-full bg-white transform ring-0 transition ease-in-out duration-200"
                            style="height:34px; width:34px"
                          />
                        </Switch>
                      </div>
                      <div class="flex-grow h-12">
                        <div>
                          <h3 class="text-lg leading-6 font-bold text-gray-900 dark:text-white">
                            Bids
                          </h3>
                          <p class="mt-1 text-md font-bold text-gray-500">
                            Get notified when someone places a bid.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </fieldset>
              </div>
              <div class="flex bg-gray-100 p-8">
                <button @click.prevent="" class=" w-1/4 p-4 bg-manatee-500 hover:bg-manatee-800 text-gray-50 font-black uppercase">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
