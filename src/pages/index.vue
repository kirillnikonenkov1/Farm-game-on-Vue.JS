<template>
  <div class="farm">
    <div class="farm__wrapper">
      <div class="farm__statistics statistics">
        <div class="statistics__wrapper">
          <div class="statistics__info">
            <div v-for="item in componentElems" :key="item" 
              class="statistics__item">
              <div class="statistics__logo" 
              :class="`statistics__logo--${item}`"
              :style="{backgroundImage: `url(../../assets/img/${item}-product.png`}"></div>
              <p class="statistics__text">{{resources[item].amount}}</p>
            </div>
            <div class="statistics__item">
              <div class="statistics__logo statistics__logo--gold"></div>
              <p class="statistics__text">{{resources.gold.amount}}</p>
            </div>
          </div>
          <sellPopUp :dataBase="dataBase"></sellPopUp>
        </div>
      </div>
      <div class="farm__field">
        <div class="farm__fence farm__fence--top"></div>
        <div class="farm__side-fence farm__side-fence--left"></div>
        <div class="farm__side-fence farm__side-fence--right"></div>
        <div class="farm__row">
          <div class="farm__cell-wrapper">
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
          </div>
          <div class="farm__row-decoration"></div>
        </div>
        <div class="farm__row">
          <div class="farm__cell-wrapper">
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
          </div>
          <div class="farm__row-decoration"></div>
        </div>
        <div class="farm__row">
          <div class="farm__cell-wrapper">
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
          </div>
          <div class="farm__row-decoration"></div>
        </div>
        <div class="farm__row">
          <div class="farm__cell-wrapper">
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
          </div>
          <div class="farm__row-decoration"></div>
        </div>
        <div class="farm__row">
          <div class="farm__cell-wrapper">
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
            <farm-cell :matterList="componentElems" :dataBase="dataBase"></farm-cell>
          </div>
          <div class="farm__row-decoration"></div>
        </div>
        <div class="farm__fence farm__fence--bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>

import farmCell from "../components/farmCell.vue";
import sellPopUp from "../components/sellPopUp.vue"
import matterList from "../components/controller/matterList.js"
import dataBase from "../js/dataBase.js";

export default {
  components: {
    farmCell,
    sellPopUp,
  },
  data () {
    return {
      dataBase,
      componentElems: matterList.components,
    }
  },
  computed: {
    resources() {
      return this.$store.state.farmStore
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
  .farm {
    height: 100%;
    width: 100%;
    min-width: 600px;
    &__wrapper {
      position: relative;
      width: 50%;
      min-width: 600px;
      overflow: hidden;
      margin: {
        left: auto;
        right: auto;
      };
      padding: {
        bottom: 5%;
      };
       background: {
        image: url("../assets/img/background-farm.jpg");
        size: contain;
      };
    }
    &__field {
      position: relative;
      width: 60%;
      margin: {
        left: auto;
        right: auto;
      };
    }
    &__fence {
      width: 100%;
      height: 39px;
      background: {
        repeat: no-repeat;
      };
      &--top {
        background: {
          image: url("../assets/img/fence-back-row-bg.png");
        };
      }
      &--bottom {
        position: relative;
        margin: {
          top: -12px;
        };
        background: {
          image: url("../assets/img/fence-front-row-bg.png");
        };
        z-index: 3;
      }
    }
    &__side-fence {
      position: absolute;
      top: 10px;
      width: 10px;
      height: 96.5%;
      background: {
          image: url("../assets/img/f-fences-vertical.png");
          repeat: repeat-y;
          position-y: 12px;
      };
      z-index: 2;
      &--left {
        left: -7px;
      }
      &--right {
        right: -7px;
        background: {
          position-x: -15px;
        };
      }
    }
    &__cell-wrapper {
      display: flex;
    }
    &__row {
      &:nth-last-of-type(2) {
        .farm__row-decoration {
          display: none;
        }
      }
    }
    &__row-decoration {
      position: relative;
      height: 38px;
      margin: {
        top: -6px;
      };
      background: {
        image: url("../assets/img/row-decoration.png");
        repeat: no-repeat;
      };
      z-index: 1;
    }
    &__cell {
      width: 20%;
      min-height: 72px;   
    }
  }
  .statistics {
    min-height: 40px;
    margin: {
      bottom: 50px;
    };
    background: linear-gradient(180deg,#45a6ed 0,rgba(69,166,237,0) 100%);;
    &__wrapper {
      display: flex;
      width: 60%;
      margin: {
        left: auto;
        right: auto;
      };
      padding: {
        top: 10px;
      };
    }
    &__info {
      display: flex;
      align-items: center;
      width: 100%;
      padding: {
        left: 10px;
      };
    }
    &__item {
      position: relative;
      display: flex;
      width: 14%;
      justify-content: center;
      margin: {
        right: 11%;
      };
      background: linear-gradient(to bottom,rgba(255,255,255,0.15) 49.999%,rgba(0,100,177,0.3) 50%,rgba(0,100,177,0.3) 100%);
      border: 1px solid rgba(0,60,117,0.6);
      border-left: none;
      box-shadow: inset 0 0 6px rgba(0,96,185,0.5);
      border-radius: 0 41px 41px 0;
      font: {
        size: 15px;
      }
    }
    &__logo {
        position: absolute;
        left: -22px;
        top: calc(50% - 13px);
        width: 30px;
        height: 26px;
        background: {
          size: contain;
          repeat: no-repeat;
          position: right;
        };
        &--gold {
          background: {
            image: url("../assets/img/coin.png")
          };
        }
      }
  }
</style>
