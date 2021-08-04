<template>
  <div class="h-2">
    <svg width="100%" height="100%" viewBox="0 0 300 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="hrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="lightblue" stop-opacity=".5">
            <animate attributeName="stop-color" values="lightblue;blue;red;red;black;red;red;purple;lightblue" dur="20s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stop-color="lightblue" stop-opacity=".5">
            <animate attributeName="stop-color" values="lightblue;orange;purple;purple;black;purple;purple;blue;lightblue" dur="20s" repeatCount="indefinite" />
            <animate attributeName="offset" values=".95;.80;.60;.40;.20;0.1;.20;.40;.60;.80;.95" dur="20s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <rect width="300" height="5" fill="url(#hrGradient)" />
    </svg>
  </div>
</template>