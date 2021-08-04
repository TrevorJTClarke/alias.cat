<template>
  <div class="container mx-auto">
    <div class="flex flex-col mb-4">
      <nav class="flex items-center text-gray-500 text-sm font-bold uppercase sm:space-x-2 whitespace-nowrap">
        <router-link to="/auctions" class="hidden sm:block hover:text-gray-900">
          All Auctions
        </router-link>
        <svg width="24" height="24" fill="none" class="hidden sm:block flex-none text-gray-300">
          <path d="M10.75 8.75l3.5 3.25-3.5 3.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <router-link :to="`/auction/${$route.params.id}`" class="hidden sm:block hover:text-gray-900">
          Auction
        </router-link>
      </nav>
    </div>

    <div class="flex-1 min-w-0">
      <h1 class="text-8xl font-extrabold text-gray-900 sm:truncate mb-12">
        {{$route.params.id}}
      </h1>
    </div>

    <div class="w-full flex gap-12">
      <div class="w-2/3">

        <h4 class="uppercase mb-2">Bids</h4>

        <ul aria-disabled="true">
          <li class="border border-gray-200 border-b-0 last:border-b" v-for="bid in bids" :key="bid.account_id">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="text-4xl font-bold text-manatee-600 truncate">
                  {{ bid.account_id }}
                </div>
                <div class="flex items-center text-2xl font-bold" :class="{'text-gray-900': !item.is_blind, 'text-gray-500': item.is_blind}">
                  <span v-if="(isBid(item) && !item.is_blind) || isReveal(item)">{{formatAmount(bid.amount)}}</span>
                  <svg v-if="(isBid(item) && item.is_blind) && !isReveal(item) && !isFinished(item)" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 my-auto -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <NearToken class="w-8 h-8 ml-4" />
                </div>
              </div>
            </div>
          </li>

        </ul>

      </div>
      <div class="w-1/3">

        <h4 class="uppercase mb-2">Details</h4>

        <div class="bg-white border px-4 py-5 sm:px-6">
          <div class="">

            <div class="flex justify-between">
              <h3 class="uppercase mb-2">Highest Bid</h3>
              <span
                class="px-2 flex items-center uppercase text-xs leading-5 font-semibold rounded-full text-steel-800"
                :class="{
                  'bg-olive-200': getStatus(item) === 'Active',
                  'bg-manatee-200': getStatus(item) === 'Bid Phase',
                  'bg-tan-300': getStatus(item) === 'Reveal Phase',
                  'bg-silver-300': getStatus(item) === 'Finished',
                }"
              >
                {{getStatus(item)}}
              </span>
            </div>

            <div class="flex items-center text-8xl font-extrabold mt-4 mb-8" :class="{'text-gray-900': !item.is_blind, 'text-gray-500': item.is_blind}">
              <h2 v-if="(isBid(item) && !item.is_blind) || isReveal(item)">{{getHighestBid(item)}}</h2>
              <svg v-if="(isBid(item) && item.is_blind) && !isReveal(item) && !isFinished(item)" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 my-auto -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <NearToken class="w-16 h-16 ml-4 opacity-50" />
            </div>
            <div v-if="isUnderwriter" class="flex gap-12">
              <button v-if="isBid(item)" @click.prevent="$refs.cancelDialog.open = true" class="w-1/2 p-4 bg-olive-700 text-gray-50 font-black uppercase">Cancel Auction</button>
              <span v-if="isReveal(item)" class="uppercase text-sm text-gray-800">Locked during reveal period</span>
              <!-- <button v-if="isFinished(item)" class="w-1/2 p-4 bg-manatee-500 text-gray-50 font-black uppercase">Finish Auction</button> -->
            </div>
            <div v-if="!isUnderwriter" class="flex gap-12">
              <button v-if="isBid(item)" @click.prevent="$refs.bidDialog.open = true" class="w-1/2 p-4 bg-manatee-500 hover:bg-manatee-800 text-gray-50 font-black uppercase">Bid</button>
              <button v-if="isReveal(item)" @click.prevent="$refs.revealDialog.open = true" class="w-1/2 p-4 bg-manatee-500 hover:bg-manatee-800 text-gray-50 font-black uppercase">Reveal Bid</button>
              <button v-if="isFinished(item)" @click.prevent="$refs.claimDialog.open = true" class="w-1/2 p-4 bg-olive-500 text-gray-50 font-black uppercase">Claim</button>
            </div>
          </div>
          <div class="mt-8 border-t border-gray-200">
            <div class="flex-column my-6">
              <h3 class="uppercase mb-2">Time Remaining <span v-if="isReveal(item)"> To Reveal</span></h3>
              <span class="inline-flex text-md text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 my-auto mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{getTimeRemaining(item.close_block)}}
              </span>
            </div>
            <div class="flex gap-6">
              <div class="mr-6 flex text-base text-gray-700">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600" x-description="Heroicon name: solid/users" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
                {{ item.bids.length }} Bids
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <BidDialog ref="bidDialog" />
    <CancelDialog ref="cancelDialog" />
    <ClaimDialog ref="claimDialog" />
    <RevealDialog ref="revealDialog" />

  </div>
</template>

<script>
import humanizeDuration from 'humanize-duration'
import NearToken from '@/components/NearToken'
import BidDialog from '@/components/BidDialog'
import CancelDialog from '@/components/CancelDialog'
import ClaimDialog from '@/components/ClaimDialog'
import RevealDialog from '@/components/RevealDialog'

// TODO: Remove -- testing only
const revealBlockOffset = 1000000
const dummyItem = {
  title: 'zanzibar.near',
  is_blind: true,
  underwriter: 'im.near',
  winner_id: '',
  // close_block: 45000000,
  close_block: 43900000,
  bids: [
    { account_id: '1.near', amount: '1000000000000000000000000' },
    { account_id: 'hey.near', amount: '12239498239482380000000000' },
    { account_id: 'gfds.near', amount: '900000000000000000000000' },
    { account_id: 'secret.near', amount: '940000000000000000000000' },
    { account_id: 'okwme.near', amount: '920000000000000000000000' },
    { account_id: 'hiim.near', amount: '910000000000000000000000' },
  ],
  reveals: {}
}

const dummies = {
  dummy: dummyItem,
  'zanzibar.near': {
    title: 'zanzibar.near',
    is_blind: false,
    underwriter: 'im.near',
    winner_id: '',
    close_block: 45000000,
    bids: [
      { amount: '1000000000000000000000000' },
      { amount: '1200000000000000000000000' },
      { amount: '900000000000000000000000' },
      { amount: '940000000000000000000000' },
      { amount: '920000000000000000000000' },
      { amount: '910000000000000000000000' },
    ],
    reveals: {}
  },
  'payday-is.near': {
    title: 'payday-is.near',
    is_blind: false,
    underwriter: 'im.near',
    winner_id: '',
    close_block: 45000000,
    bids: [],
    reveals: {}
  },
  'secretly.near': {
    title: 'secretly.near',
    is_blind: true,
    underwriter: 'whos.near',
    winner_id: '',
    close_block: 46000000,
    bids: [
      { amount: '0', precommit: [10,233,34] },
      { amount: '0', precommit: [11,233,34] },
    ],
    reveals: {}
  },
  'too.near': {
    title: 'too.near',
    is_blind: true,
    underwriter: 'its.near',
    winner_id: '',
    close_block: 43900000,
    bids: [
      { amount: '0', precommit: [10,233,34] },
      { amount: '0', precommit: [11,233,34] },
      { amount: '0', precommit: [12,233,34] },
    ],
    reveals: {
      'lol.near': '1000000000000000000000000',
      'void.near': '1700000000000000000000000',
      'midl.near': '900000000000000000000000',
    }
  },
}

export default {
  data() {
    return {
      showBidDialog: false,
      user: 'its.near',
      currentBlock: 44000000,
    }
  },

  components: {
    BidDialog,
    CancelDialog,
    ClaimDialog,
    NearToken,
    RevealDialog,
  },

  computed: {
    item() {
      console.log(this.$route.params);
      return dummies[this.$route.params.id]
    },
    bids() {
      const bids = this.isReveal(this.item) ? Object.keys(this.item.reveals).map(k => { return { amount: this.item.reveals[k] } }) : this.item.bids
      if (!bids || bids.length <= 0) return 0
      return bids.sort((a, b) => b.amount - a.amount)
      // return [...this.item.bids].sort((a, b) => (b.amount - a.amount))
    },
    isUnderwriter() {
      return this.user === this.item.underwriter
    }
  },

  methods: {
    getStatus(item) {
      let s = item.bids.length > 0 ? 'Bid Phase' : 'Active'

      if (item.close_block > this.currentBlock && item.is_blind) s = 'Bid Phase'
      if (item.close_block <= this.currentBlock && item.is_blind) {
        if (item.close_block + revealBlockOffset > this.currentBlock) s = 'Reveal Phase'
        else s = 'Finished'
      }

      return s
    },
    isReveal(item) {
      if (!item.is_blind) return false
      return (item.close_block <= this.currentBlock) && (item.close_block + revealBlockOffset > this.currentBlock)
    },
    isFinished(item) {
      if (item.is_blind != true && item.close_block <= this.currentBlock) return true
      return item.close_block + revealBlockOffset <= this.currentBlock
    },
    isBid(item) {
      return item.close_block > this.currentBlock
    },
    getHighestBid(item) {
      const bids = this.isReveal(item) ? Object.keys(item.reveals).map(k => { return { amount: item.reveals[k] } }) : item.bids
      if (!bids || bids.length <= 0) return 0
      const bid = bids.sort((a, b) => b.amount - a.amount)[0]
      return this.formatAmount(bid.amount)
    },
    formatAmount(amount) {
      let p = this.$near.nearApi.utils.format.formatNearAmount(amount)
      if (p.search('.') > -1) {
        if (p.split('.').length > 1 && p.split('.')[1].length > 4) p = parseFloat(p).toFixed(4)
      }
      return p
    },
    getTimeRemaining(closeBlock) {
      // NOTE: Currently using 1 block per second, will be innacurate, but not by too much
      let dur = closeBlock - this.currentBlock
      if (this.isReveal(this.item)) dur = (this.currentBlock + revealBlockOffset) - closeBlock
      if (dur < 0) dur = 0
      return humanizeDuration(dur, { largest: 2, round: true })
    },
  },
}
</script>