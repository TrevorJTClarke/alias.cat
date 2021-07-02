<template>
  <div class="bg-gray-50 text-shadow-400">
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
    <!-- <div class="container flex flex-col justify-center h-screen p-4 mx-auto" style="max-height: 90vh">
      <div class="mx-auto w-1/3">
        Open image

         <input type="file" @change="logFile">
      </div>
      <div class="mx-auto w-1/3">
        HI canvas
        <canvas id="canvas" :width="size" :height="size" class="alias" />
      </div>
      <div class="mx-auto w-1/3">
        canvas 2
        <canvas id="canvas2" :width="size" :height="size" class="alias" />
      </div>
    </div> -->
    <div class="container flex p-4 mx-auto">
      <div class="w-1/2 mr-12">
        <div class="h-full mt-1 flex justify-center px-6 pt-5 pb-6 border-4 border-gray-300 border-dashed rounded-2xl">
          <div class="my-auto space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label for="file-upload" class="relative cursor-pointer bg-transparent rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
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
              v-for="plan in plans"
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
                      <img class="mx-auto rounded-full" style="max-width: 48px;" :width="plan.pixels" :height="plan.pixels" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
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
                        <span>Dimensions {{ plan.dim }}</span>
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
  </div>
</template>

<script>
// import Logo from '../components/Logo'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

const plans = [
  {
    name: 'Extra Small',
    dim: '16x16',
    cost: 1024,
    pixels: 16,
  },
  {
    name: 'Small',
    dim: '32x32',
    cost: 4096,
    pixels: 32,
  },
  {
    name: 'Medium',
    dim: '64x64',
    cost: 16384,
    pixels: 64,
  },
  {
    name: 'Large',
    dim: '128x128',
    cost: 65536,
    pixels: 128,
  },
]

export default {
  components: { RadioGroup, RadioGroupLabel, RadioGroupOption },

  data() {
    return { 
      selected: plans[0], 
      plans
    }
  },

  computed: {
    size() {
      return 32
    },
    pixelSize() {
      return 1
    },
  },

  methods: {
    logFile(e) {
      var file = e.target.files[0];
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      var canvas2 = document.getElementById("canvas2");
      var context2 = canvas2.getContext("2d");
      var pixelSize = this.pixelSize;

      var fr = new FileReader();
      fr.onload = function(){
        var img = new Image();
        img.onload = function(){
          context.drawImage(img,0,0,canvas.width,canvas.height);

          let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
          let data = Array.from(imgData.data);
          console.log('data', JSON.stringify(data));

          for(var row = 0; row < canvas2.width; ++row) {
            for(var column = 0; column < canvas2.width; ++column) {
              const tmpRgba = data.splice(0,4);
              context2.fillStyle = `rgba(${tmpRgba[0]},${tmpRgba[1]},${tmpRgba[2]},${tmpRgba[3]})`;
              context2.fillRect(column * pixelSize, row * pixelSize, pixelSize, pixelSize);
            }
          }
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    }
  },

  mounted () {
    console.log(this.$near)
  }
}
</script>

<style scoped>
.alias {
  width: 128px;
  height: 128px;
  image-rendering: crisp-edges;
}
</style>
