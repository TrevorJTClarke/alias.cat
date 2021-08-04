<template>
  <div class="container mx-auto">
    <div class="flex-1 flex justify-between min-w-0 mb-12">
      <div>
        <h1 class="text-6xl font-bold text-gray-900 sm:truncate mb-4">
          Auctions
        </h1>

        <div class="flex">
          <Hr class="inline-flex" />
        </div>
      </div>

      <div class="flex-column">
        <router-link to="/auctions/new" class="flex mt-auto bg-iron-200 hover:bg-iron-800 font-extrabold text-gray-500 hover:text-gray-50 text-2xl p-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>New Auction</span>
        </router-link>
      </div>
    </div>

    <ul aria-disabled="true">
      <li class="border border-gray-200 border-b-0 last:border-b" v-for="item in auctions" :key="item.title">
        <router-link :to="`/auction/${item.title}`" class="block hover:bg-gray-50">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-column">
                <div class="text-4xl font-bold text-manatee-600 truncate mb-4">
                  {{ item.title }}
                </div>

                <div class="sm:flex font-bold">
                  <div class="mr-6 flex items-center text-sm text-gray-700">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600" x-description="Heroicon name: solid/users" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                    </svg>
                    {{ item.bids.length }} Bids
                  </div>
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-steel-800 mr-4"
                    :class="{
                      'bg-olive-200': getStatus(item) === 'Active',
                      'bg-manatee-200': getStatus(item) === 'Bid Phase',
                      'bg-tan-300': getStatus(item) === 'Reveal Phase',
                      'bg-silver-300': getStatus(item) === 'Finished',
                    }"
                  >
                    {{getStatus(item)}}
                  </span>
                  <span class="px-2 inline-flex text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 my-auto mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{getTimeRemaining(item)}}
                  </span>
                </div>
              </div>
              <div class="flex items-center text-2xl font-bold" :class="{'text-gray-900': !item.is_blind, 'text-gray-500': item.is_blind}">
                <span v-if="(isBid(item) && !item.is_blind) || isReveal(item)">{{getHighestBid(item)}}</span>
                <svg v-if="(isBid(item) && item.is_blind) && !isReveal(item) && !isFinished(item)" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 my-auto -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <NearToken class="w-8 h-8 ml-4" />
              </div>
            </div>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
import humanizeDuration from 'humanize-duration'
import Hr from '../components/ui/Hr'
import NearToken from '../components/ui/NearToken'

// TODO: Remove -- testing only
const revealBlockOffset = 1000000
const dummyAuctions = [
  {
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
  {
    title: 'payday-is.near',
    is_blind: false,
    underwriter: 'im.near',
    winner_id: '',
    close_block: 510000000,
    bids: [],
    reveals: {}
  },
  {
    title: 'secretly.near',
    is_blind: true,
    underwriter: 'whos.near',
    winner_id: '',
    close_block: 460000000,
    bids: [
      { amount: '0', precommit: [10,233,34] },
      { amount: '0', precommit: [11,233,34] },
    ],
    reveals: {}
  },
  {
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
]

export default {

  data() {
    return {
      currentBlock: 44000000,
      // auctions: dummyAuctions,
    }
  },

  components: {
    Hr,
    NearToken,
  },

  computed: {
    auctions() {
      return [...dummyAuctions].sort((a, b) => (a.close_block - b.close_block))
    },
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
      return this.$near.nearApi.utils.format.formatNearAmount(bid.amount)
    },
    getTimeRemaining(item) {
      // NOTE: Currently using 1 block per second, will be innacurate, but not by too much
      let dur = item.close_block - this.currentBlock
      if (this.isReveal(item)) dur = (this.currentBlock + revealBlockOffset) - item.close_block
      if (dur < 0) dur = 0
      return humanizeDuration(dur, { largest: 2, round: true })
    },
  },
}
</script>