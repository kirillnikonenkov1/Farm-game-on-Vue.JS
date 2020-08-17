<template>
  <div class="farm__cell cell">
    <transition name="fade">
      <div class="cell__menu menu-plant" v-if="menuOpen">
          <ul class="menu-plant__list">
            <li class="menu-plant__item" v-for="item in matterList" :key="item">
              <label class="menu-plant__label" @click.once="pickContent(item)">
                <div class="menu-plant__img"
                      :style="{backgroundImage: `url(../../assets/img/${item}.png`}">
                </div>
                <div class="menu-plant__time">
                  <span class="menu-plant__icon"></span>
                  {{dataBase[item].timeForGrow}}s
                </div>  
                <input type="radio" name="choosePlant" class="menu-plant__input">
              </label>
            </li>
          </ul>
          <button @click="closeMenu" class="menu-plant__btn menu-plant__btn--close"></button>
        </div>
      </transition>
    <div class="cell__inner">
      <div class="cell__content cell__content--empty" 
      v-if="content==='empty'"
      @click.self="openMenu"
      ></div>
      <div class="cell__content cell__content--waiting" 
           v-if="waitingForFeed"
           :style="{backgroundImage: `url(../assets/img/${content}.png)`}"></div>
      <div class="cell__content cell__content--progress" 
           v-if="growthInProgress"
           :style="[{backgroundImage: `url(../assets/img/${content}.png)`}, 
                     isFeedable ? {backgroundPosition: 'center 100%'} : {backgroundPosition: 'center 65%'}]"></div>
      <div class="cell__content cell__content--ready" 
           v-if="readyForPickUp"
           :style="[{backgroundImage: `url(../assets/img/${content}.png)`},
                    isFeedable ? {backgroundPosition: 'center 67.5%'} : {backgroundPosition: 'center 97%'}]">
        <div class="cell__content cell__content--product"
             v-if="isFeedable"
             :style="isFeedable ? {backgroundImage: `url(../assets/img/${content}-product.png)`} : ''"
              ></div>            
      </div>
      <div class="cell__control" v-if="content !== 'empty'">
        <button class="cell__btn cell__btn--feed"
                v-if="isFeedable && waitingForFeed"
                @click="feedAnimal"
        ></button>
        <button class="cell__btn cell__btn--gather"
                v-if="readyForPickUp"
                @click="pickUp"
                :style="isFeedable ? {backgroundPosition: '84% 6.5%'} : {backgroundPosition: '80% 84%'}"
        ></button>
        <button class="cell__btn cell__btn--clear"
                v-if="content !== 'empty' && false"
                @click="clearCell"
        ></button>
     </div>
      <div class="cell__timer timer" ref="timer" v-if="growthInProgress">
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['matterList', 'dataBase'],
  components: {
  },
  data() {
    return {
      content: 'empty',
      timeForGrowth: null,
      forOneRye: null,
      food: null,
      isFeedable: null,
      growthTimesLeft: null,
      waitingForFeed: false,
      growthInProgress: false,
      readyForPickUp: false,
      menuOpen: false,
    }
  },
  computed: {
  },
  methods: {
    pickContent(item) {
      this.content = item;
      this.isFeedable = this.dataBase[item].isFeedable;
      this.timeForGrowth = this.dataBase[item].timeForGrow;
      this.forOneRye = this.dataBase[item].forOneRye;
      this.food = this.dataBase[item].food;
      this.menuOpen = false;
    },
    openMenu() {
      if (this.content === 'empty') {
        this.clickOutside();
        this.menuOpen = true;
      }
    },
    closeMenu() {
      this.menuOpen = false;
      document.removeEventListener('click', outsideClicker, true);
    },
    clickOutside() {
     let outsideClicker = (event) => {
        if (!event.target.className.includes('menu-plant')) {
          this.menuOpen = false;
          document.removeEventListener('click', outsideClicker, true)
        }
      }
      document.addEventListener('click', outsideClicker, true)      
    },
    startGrowth() {
      if (this.growthTimesLeft > 0 || !this.isFeedable) {
        this.readyForPickUp = false;
        this.growthInProgress = true;
        let counter = 0;
        let timeInterval = setInterval(() => {
          counter += 0.1;
          this.$refs.timer.style.backgroundImage = `linear-gradient(90deg, #4bdb16 ${counter/this.timeForGrowth * 100}%, #d6edce ${(counter/this.timeForGrowth * 100)+10}%)`;
          if (counter > this.timeForGrowth) {
            clearInterval(timeInterval);
            this.growthInProgress = false;
            this.readyForPickUp = true;
          } else if(this.content === 'empty') {
            clearInterval(timeInterval);
            this.$refs.timer.innerText = '';
          }
        }, 100);
      } else {
        this.waitingForFeed = true;
      }
    },
    pickUp() {
      this.$store.commit('increment', {
        item: this.content,
        quantity: 1,
      })
      this.readyForPickUp = false;
      if (this.isFeedable) {
        this.growthTimesLeft -= 1;
      }
      this.startGrowth();
    },
    feedAnimal() {
      if (this.$store.state.farmStore[this.food].amount > 0 && this.waitingForFeed) {
        this.$store.commit('decrease', {
        item: this.food,
        quantity: 1,
      });
        this.growthTimesLeft = this.forOneRye;
        this.waitingForFeed = false;
        this.startGrowth();
      }
    },
    clearCell() {
      this.content = 'empty';
      this.waitingForFeed = false;
      this.growthTimesLeft = null;
      this.growthInProgress = false;
      this.readyForPickUp = false;
      this.isFeedable = false;
      this.$refs.timer.innerText = '';
    }
  },
  watch: {
    content: function () {
      if (!this.content.isFeedable) {
        this.startGrowth();
      } else if (this.content !== 'empty') {
        this.waitingForFeed = true;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  .cell {
    cursor: pointer;
    &__inner {
      position: relative;
      width: 100%;
      height: 100%;
       background: {
          image: url("../assets/img/not-ready.png");
          size: cover;
        };
    }
    &__content {
        width: 100%;
        height: 100%;
        background: {
            size: 80%;
            repeat: no-repeat;
        };
        &--waiting {
          background: {
            position: center 3%;
          };
        }
        &--progress {
          background: {
            position: center 100%;
          };
        }
         &--product {
          position: absolute;
          bottom: 10%;
          left: 10%;
          width: 50%;
          height: 50%;
          background: {
            size: contain;
          };
        }
    }
    &__control {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    &__btn {
      width: 100%;
      height: 100%;
       background: {
          image: url("../assets/img/flags.png");
          color: transparent;
          repeat: no-repeat;
          size: 90% auto;
        };
      cursor: pointer;
      &--gather {
        background: {
          position: 80% 84%;
        };
      }
      &--waiting {
        background: {
          position: 80% 84%;
        };
      }
      &--feed {
        background: {
          position: 80% 30%;
        };
      }
    }
    &__timer {
      position: absolute;
      left: 20%;
      bottom: -22px;
      display:block;
      width: 60%;
      height: 15px;
      z-index: 100;
      background: {
        image: linear-gradient(90deg, #4bdb16 0%, #d6edce 0%)
      };
      border: 1px solid #219e13;
      border-radius: 15px;
    }
    .menu-plant {
      position: absolute;
      left: calc(50% - 40vw / 2);
      top: 50px;
      width: 40vw;
      padding: 20px;
      background: {
        color:#e6ca93;
      };
      box-shadow: 0px 0px 7px -1px #000;
      z-index: 999;
      &--active {
        display: block;
        animation: 1s ease slideout;
      }
      &--close {
        animation: 1s ease slidein;
        display: none;
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
      }
      &__list {
        display: flex;
      }
      &__item {
        width: 100px;
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
      }
      &__img {
        width: 90px;
        height: 100px;
        background: {
          size: cover;
          position: 0 99%;
          repeat: no-repeat;
        }
      }
      &__time {
        display: flex;
        justify-content: center;
        align-items: center;
        font: {
          size: 14px;
        }
      }
      &__icon {
        position: relative;
        display: inline-block;
        width: 18px;
        height: 18px;
        margin: {
          right: 1px;
        };
        background: {
          image: url("../assets/img/icons2.png");
          position: 0 15.152%;
          repeat: no-repeat;
          size: 100% auto;
        };
        text-align: center;
      }
      &__label {
        cursor: pointer;
      }
      &__input {
        display: none;
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
        left: calc(50% - 40vw / 2);;
        opacity: 1;
      }
    }
  }
</style>
