<template>
  <div class="bg-gray-50 text-shadow-400">
    <div class="container flex flex-col justify-center h-screen p-4 mx-auto" style="max-height: 90vh">
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
    </div>
  </div>
</template>

<script>
// import Logo from '../components/Logo'

export default {
  components: {
    // Logo,
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
