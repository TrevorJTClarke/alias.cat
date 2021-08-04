<template>
  <div class="bg-gray-50 text-shadow-400 flex flex-col">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="lg:text-center">
        <h2 class="text-6xl text-green-600 font-semibold tracking-wide uppercase">👩‍🎨</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Customize your decentralized personality
        </p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Update your avatar, favorite color and more for your blockchain accounts.
        </p>
      </div>
    </div>
    <div class="container flex p-4 mx-auto">
      <div class="w-1/2 mr-12">
        <div class="h-full mt-1 flex justify-center px-6 pt-5 pb-6 border-4 border-gray-300 border-dashed rounded-2xl">
          <div class="my-auto space-y-1 text-center">
            <svg v-if="!hasFile" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <canvas class="mx-auto text-gray-400" :class="{'w-0 h-0 invisible overflow-hidden': !hasFile, 'visible alias mb-6 rounded-lg': hasFile}" id="canvas" :width="size" :height="size" />
            <div class="flex justify-center text-sm text-gray-600">
              <label for="file-upload" class="relative cursor-pointer underline bg-transparent rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" @change="logFile" class="sr-only" />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-50d0">
              Sqaure Image: PNG, JPG, GIF up to 6MB
            </p>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="mb-4">
          <legend class="text-base font-medium text-gray-900">Choose Your Options</legend>
          <p class="text-sm text-gray-500">Your payment to store data on the blockchain will depend on the options below.</p>
        </div>
        <!-- <canvas id="canvas" :width="size" :height="size" class="alias" /> -->
        <RadioGroup v-model="selected">
          <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
          <div class="space-y-2">
            <RadioGroupOption
              as="template"
              v-for="plan in sizes"
              :key="plan.name"
              :value="plan"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  active
                    ? 'ring-2 ring-offset-2 ring-offset-green-300 ring-white ring-opacity-60'
                    : '',
                  checked ? 'bg-green-900 bg-opacity-75 text-white ' : 'bg-white ',
                ]"
                class="relative flex px-5 py-4 rounded-lg cursor-pointer focus:outline-none"
              >
                <div class="flex items-center justify-between w-full">
                  <div class="flex-none mr-8">
                    <div class="flex m-auto w-12">
                      <img class="mx-auto rounded-full" style="max-width: 48px;" :width="plan.pixels" :height="plan.pixels" :src="imgData" alt="" />
                    </div>
                  </div>
                  <div class="flex-1 items-center">
                    <div class="text-sm">
                      <RadioGroupLabel
                        as="p"
                        :class="checked ? 'text-white' : 'text-gray-900'"
                        class="font-medium"
                      >
                        {{ plan.name }}
                      </RadioGroupLabel>
                      <RadioGroupDescription
                        as="span"
                        :class="checked ? 'text-green-100' : 'text-gray-500'"
                        class="inline"
                      >
                        <span>Dimensions {{ plan.dim }}x{{ plan.dim }}</span>
                        <span> &middot; </span>
                        <span>Cost Basis {{ plan.cost }}</span>
                      </RadioGroupDescription>
                    </div>
                  </div>
                  <div v-show="checked" class="flex-shrink-0 text-white">
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

    <div class="container flex flex-col p-4 mx-auto my-12">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
        >
          <span>Advanced</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5 text-gray-500"
          />
        </DisclosureButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <DisclosurePanel class="px-4 pt-4 pb-2 flex text-sm text-gray-500">
            <div class="w-1/2 mr-12">
              &nbsp;
            </div>
            <div class="w-1/2">
              <div class="mb-4">
                <legend class="text-base font-medium text-gray-900">Your Initials</legend>
                <p class="text-sm text-gray-500">Your initials are 2 letters that best represent your name, and display when no image is available.</p>
              </div>
              <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-1/2 p-4 shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <!-- <div class="w-1/2">
              <div class="mb-4">
                <legend class="text-base font-medium text-gray-900">Favorite Color</legend>
                <p class="text-sm text-gray-500">This color will load for themeing on dApps.</p>
              </div>
              <div class="w-12 h-12 rounded-lg">
                &nbsp;
              </div>
              <ColorPicker
                theme="light"
                :color="color"
                :sucker-hide="true"
              />
            </div> -->
          </DisclosurePanel>
        </transition>
      </Disclosure>
    </div>

    <div class="container flex p-4 mx-auto">
      <div class="w-1/2 mr-12">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span class="block">Changes all finished?</span>
          <span class="block text-green-600">Store them directly on the blockchain</span>
        </h2>
      </div>
      <div class="w-1/2">
        <div class="mt-8 flex justify-end lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <button @click.prevent="submit" class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import Logo from '../components/Logo'
import { getContractAbi } from '../utils/config'
import { ChevronUpIcon } from '@heroicons/vue/outline'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import { ColorPicker } from 'vue-color-kit'
// import 'vue-color-kit/dist/vue-color-kit.css'

const sizes = [
  {
    name: 'Extra Small',
    dim: 16,
    cost: 1024,
    pixels: 16,
    amount: '266000000000000000000000',
  },
  {
    name: 'Small',
    dim: 32,
    cost: 4096,
    pixels: 24,
  },
  {
    name: 'Medium',
    dim: 64,
    cost: 16384,
    pixels: 32,
  },
  {
    name: 'Large',
    dim: 128,
    cost: 65536,
    pixels: 48,
  },
]

export default {
  components: {
    ChevronUpIcon,
    ColorPicker,
    RadioGroup, 
    RadioGroupLabel, 
    RadioGroupOption,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },

  data() {
    return { 
      selected: sizes[0], 
      sizes,
      icon: null,
      color: '#f9f9f9',
      initials: '',
      hasFile: false,
      imgData: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      contractSpec: null,
      contract: null,
    }
  },

  computed: {
    size() {
      if (this.icon) return Math.sqrt(this.icon.length) / 2
      return this.selected.dim
    },
    pixelSize() {
      return 1
    },
  },

  methods: {
    changeColor(color) {
      const { r, g, b, a } = color.rgba
      this.color = `rgba(${r}, ${g}, ${b}, ${a})`
    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },
    logFile(e) {
      var file = e.target.files[0];
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      this.icon = null

      var fr = new FileReader();
      fr.onload = () => {
        var img = new Image();
        this.hasFile = true;
        img.onload = () => {
          context.drawImage(img,0,0,canvas.width,canvas.height);
          this.imgData = canvas.toDataURL("image/png");

          let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
          let data = Array.from(imgData.data);
          console.log('data', data.length);
          this.icon = data;
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    },

    async submit() {
      // if (!this.icon || !this.contract) return
      if (!this.contract) return
      console.log('this.contract',this.contract);
      const content = {
        icon: this.icon,
        // color: this.color === '#f9f9f9' ? null : this.color,
        // color: [],
        // initials: [],
        // initials: this.initials ? this.initials : `${this.$near.user.accountId}`.substring(0, 2),
      }

      // // Send to NEAR
      // const res = await this.contract.set(
      //   content,
      //   '300000000000000',
      //   this.selected.amount,
      // )
      // console.log('RES', res);

      // // Send to NEAR
      // const res = await this.contract.register(
      //   {},
      //   // content,
      //   '300000000000000',
      //   // this.selected.amount,
      //   '266000000000000000000000'
      //   // 263310000000000000000000
      // )
      // console.log('RES', res);

      // Send to NEAR
      const res = await this.contract.set2(
        content,
        '300000000000000',
        0
        // this.selected.amount,
      )
      console.log('RES', res);

      // Remove the fields data
      // this.to_account_id = ''
    },

    async loadContract() {
      if (this.contract) return
      console.log('CONTRACT:', this.$near.config.contractName)
      this.contract = await this.$near.getContractInstance(
        this.$near.config.contractName,
        this.contractSpec,
      )
    },

    async loadData() {
      if (!this.contract) return
      const res = await this.contract.get({ id: `${this.$near.user.accountId}` })
      if (!res || !res.icon) return
      this.hasFile = true
      let data = res.icon;
      this.icon = [].concat(res.icon);
      var pixelSize = this.pixelSize;
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      // read the sizes, and assign found data
      this.sizes.forEach(size => {
        if (size.cost === res.icon.length) this.selected = size
      })

      for(var row = 0; row < canvas.width; ++row) {
        for(var column = 0; column < canvas.width; ++column) {
          const tmpRgba = data.splice(0,4);
          context.fillStyle = `rgba(${tmpRgba[0]},${tmpRgba[1]},${tmpRgba[2]},${tmpRgba[3]})`;
          context.fillRect(column * pixelSize, row * pixelSize, pixelSize, pixelSize);
        }
      }

      this.imgData = canvas.toDataURL("image/png");
    },
  },

  async mounted() {
    this.contractSpec = getContractAbi('alias')
    await this.loadContract()
    await this.loadData()
  }
}
</script>

<style scoped>
.alias {
  width: 256px;
  height: 256px;
  image-rendering: crisp-edges;
}

.hu-color-picker{padding:10px;background:#1d2024;border-radius:4px;box-shadow:0 0 16px 0 rgba(0,0,0,.16);z-index:1}.hu-color-picker.light{background:#f7f8f9}.hu-color-picker.light .color-show .sucker{background:#eceef0}.hu-color-picker.light .color-type .name{background:#e7e8e9}.hu-color-picker.light .color-type .value{color:#666;background:#eceef0}.hu-color-picker.light .colors.history{border-top:1px solid #eee}.hu-color-picker canvas{vertical-align:top}.hu-color-picker .color-set{display:flex}.hu-color-picker .color-show{margin-top:8px;display:flex}.saturation{position:relative;cursor:pointer}.saturation .slide{position:absolute;left:100px;top:0;width:10px;height:10px;border-radius:50%;border:1px solid #fff;box-shadow:0 0 1px 1px rgba(0,0,0,.3);pointer-events:none}.color-alpha{position:relative;margin-left:8px;cursor:pointer}.color-alpha .slide{position:absolute;left:0;top:100px;width:100%;height:4px;background:#fff;box-shadow:0 0 1px 0 rgba(0,0,0,.3);pointer-events:none}.sucker{width:30px;fill:#9099a4;background:#2e333a;cursor:pointer;transition:all .3s}.sucker.active,.sucker:hover{fill:#1593ff}.hue{position:relative;margin-left:8px;cursor:pointer}.hue .slide{position:absolute;left:0;top:100px;width:100%;height:4px;background:#fff;box-shadow:0 0 1px 0 rgba(0,0,0,.3);pointer-events:none}.colors{padding:0;margin:0}.colors.history{margin-top:10px;border-top:1px solid #2e333a}.colors .item{position:relative;width:16px;height:16px;margin:10px 0 0 10px;border-radius:3px;box-sizing:border-box;vertical-align:top;display:inline-block;transition:all .1s;cursor:pointer}.colors .item:nth-child(8n+1){margin-left:0}.colors .item:hover{transform:scale(1.4)}.colors .item .alpha{height:100%;border-radius:4px}.colors .item .color{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:3px}.color-type{display:flex;margin-top:8px;font-size:12px}.color-type .name{width:60px;height:30px;float:left;display:flex;justify-content:center;align-items:center;color:#999;background:#252930}.color-type .value{flex:1;height:30px;min-width:100px;padding:0 12px;border:0;color:#fff;background:#2e333a;box-sizing:border-box}
</style>
