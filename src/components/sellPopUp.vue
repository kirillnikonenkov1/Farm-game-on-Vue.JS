<template>
<div class="statistics__sell-panel sell-panel">
    <button class="sell-panel__cart" @click="openSellMenu">sell</button>
    <transition name="fade">
        <div class="sell-panel__menu" v-if="sellMenuOpen">
        <div class="sell-panel__list">
            <div v-for="item in componentElems" :key="item" 
            class="sell-panel__item" @click.prevent="incrementSaleItems(item)">
                <div class="sell-panel__img-wrapper">
                   <img :src="`../assets/img/${item}-product.png`"  class="sell-panel__img">
                </div>
                <p class="sell-panel__text">Price: {{componentsData[item].priceForSale}}</p>
                <p class="sell-panel__text">Total: {{componentsData[item].itemsForSale * componentsData[item].priceForSale}}</p>
                <input type="number" v-model="componentsData[item].itemsForSale" class="sell-panel__input" min="0">
            </div>
        </div>
        <p class="sell-panel__text">Total price: {{totalPrice}}</p>
        <button @click="sellGoods" class="sell-panel__btn sell-panel__btn--sell">Sell Goods</button>
        <button @click="closeSellMenu" class="sell-panel__btn sell-panel__btn--close"></button>
        </div>
    </transition>
</div>
</template>
<script>

import matterList from "../components/controller/matterList.js";

export default {
  props: ['dataBase'],
  components: {
  },
  data() {
    return {
      componentsData: this.dataBase,
      componentElems: matterList.components,
      sellMenuOpen: false,
    }
  },
  computed: {
    totalPrice() {
      let price = 0;
      for (let key in this.componentsData) {
        price += this.componentsData[key].priceForSale * this.dataBase[key].itemsForSale;
      }
      return price;
    }
  },
  methods: {
    openSellMenu() {
      this.sellMenuOpen = true;
      for (let i = 0; i < this.componentElems.length; i++) {
          this.componentsData[this.componentElems[i]] = Object.assign({}, this.componentsData[this.componentElems[i]], {itemsForSale: 0})
      }
    },
    closeSellMenu() {
      this.sellMenuOpen = false;
      for (let i = 0; i < this.componentElems.length; i++) {
         delete this.componentsData[this.componentElems[i]].itemsForSale;
      }
    },
    sellGoods() {
      for (let key in this.componentsData) {
        if (this.$store.state.farmStore[key].amount >= this.componentsData[key].itemsForSale && this.componentsData[key].itemsForSale > 0) {
          this.$store.commit('decrease', {
            item: key,
            quantity: this.componentsData[key].itemsForSale,
          })
          this.$store.commit('increment', {
            item: 'gold',
            quantity: parseInt(this.componentsData[key].priceForSale * this.componentsData[key].itemsForSale),
          })
          this.componentsData[key].itemsForSale = 0;
        } else {
          this.componentsData[key].itemsForSale = this.$store.state.farmStore[key].amount;
        }
      }
    },
    incrementSaleItems(item) {
      this.componentsData[item].itemsForSale++;
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/utils/mixins.scss";

  .sell-panel {
    display: flex;
    align-items: center;
    height: 100%;
    z-index: 999;
    &__cart {
      @include btnGreen(5px 15px);
    }
    &__menu {
      position: absolute;
      left: 10%;
      top: 50px;
      width: 80%;
      padding: 20px;
      background: {
        color:#e6ca93;
      };
      &--active {
        display: block;
        animation: 1s ease slideout;
      }
      &--close {
        animation: 1s ease slidein;
        display: none;
      }
    }
    &__list {
      display: flex;
      margin: {
        bottom: 25px;
      };
    }
    &__item {
      width: 88px;
      margin: {
        right: 5px;
        left: 5px;
      };
      padding: 5px;
      background: {
        color: #fff0d2;
      }
      box-shadow: 0px 0px 4px 0px #000;
      border-radius: 4px;
      cursor: pointer;
      &:first-child {
        margin: {
          left: 0;
        }
      }
    }
    &__img-wrapper {
      height: 60px;
      margin: {
        bottom: 10px;
      };
    }
    &__img {
      height: 100%;
      margin: 0 auto;
    }
    &__text {
      margin: {
        bottom: 5px;
      };
      font: {
        size: 14px;
      };
    }
    &__input {
      width: 78px;
      font: {
        size: 14px;
      }
      &::-webkit-outer-spin-button, 
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
    &__btn {
      &--close {
        position: absolute;
        top: 10px;
        right: 10px;
        display: block;
        width: 15px;
        height: 15px;
        background: transparent;
        cursor: pointer;
        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 5px;
          left: 0;
          display: block;
          width: 15px;
          height: 2px;
          background: black;
          opacity: 0.5;
          transform: rotate(-45deg);
        }
        &::after {
          transform: rotate(45deg);
        }
      }
      &--sell {
        @include btnGreen(10px 25px);
      }
    }
  }
  .fade-enter-active {
    animation: slideout 1s;
  }
  .fade-leave-active {
    animation: slideout 1s reverse;
  }
  @keyframes slideout {
    from {
      left: 100%;
      opacity: 0;
    }
    to {
      left: 10%;
      opacity: 1;
    }
  }
</style>
