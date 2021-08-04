<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" @close="open = false" :open="open">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-manatee-100 sm:mx-0 sm:h-10 sm:w-10">
                  <TagIcon class="h-6 w-6 text-manatee-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left font-bold">
                  <DialogTitle as="h3" class="text-xl leading-6 text-gray-900">
                    Bid
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-md text-gray-500">
                      Enter the amount you'd like to pay to win this auction! Your bid must be an amount that your account actually owns to win.
                    </p>
                  </div>
                </div>
              </div>

              <div class="w-full grid grid-cols-3 gap-6 my-6">
                <div class="col-span-3">
                  <label for="bid_amount" class="block text-lg leading-6 font-bold text-gray-700">
                    Bid Amount
                  </label>
                  <div class="mt-1 flex">
                    <input type="text" name="bid_amount" id="bid_amount" class="flex-1 block w-full p-4 bg-transparent border-b border-gray-300 text-right text-xl text-gray-900" placeholder="1" />
                    <span class="inline-flex items-center p-4 border-b border-gray-300 text-gray-500 bg-transparent text-sm">
                      <NearToken class="w-8 h-8 ml-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between">
              <button type="button" class=" w-1/4 p-4 bg-manatee-500 hover:bg-manatee-800 text-gray-50 font-black uppercase" @click="open = false">
                Bid
              </button>
              <button type="button" class="w-1/4 p-4 bg-gray-400 hover:bg-gray-800 text-gray-50 font-black uppercase" @click="open = false" ref="cancelButtonRef">
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue'
import NearToken from '@/components/NearToken'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { TagIcon } from '@heroicons/vue/outline'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    TagIcon,
    NearToken,
  },
  setup() {
    let open = ref(false)

    return {
      open,
    }
  },
}
</script>