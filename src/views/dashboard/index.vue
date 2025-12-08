<template>
  <div class="dashboard">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1 space-y-6 bg-[#f0f2f5]">
        <span class="text-3xl">123</span>
      </div>

      <div class="lg:col-span-2 space-y-6 bg-[#f0f2f5]">
        <span class="text-[24px]">456</span>
        <span class="text-[20px]">456</span>
      </div>
    </div>

    <div class="grid grid-cols-3 grid-rows-3 gap-6">
      <div class="col-span-1 row-span-3 bg-[#f0f2f5]">123</div>
      <div class="col-span-2 row-span-3 bg-[#f0f2f5]">
        <div class="grid grid-cols-2 grid-rows-2 gap-6">
          <div class="col-span-1 row-span-2 bg-amber-600">123</div>
          <div class="col-span-1 row-span-1 bg-amber-900">123</div>
          <div class="col-span-1 row-span-1 bg-amber-300">123</div>
          <div class="col-span-1 row-span-2 bg-[#f0f2f5]">123</div>
        </div>
      </div>
    </div>

    <div class="p-[24px] bg-amber-300">789</div>
  </div>
</template>
