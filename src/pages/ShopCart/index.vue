<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="list in shoppingInfoList" :key="list.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="list.isChecked === 1"
              @click="changeChecked(list.skuId,$event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="list.imgUrl" />
            <div class="item-msg">{{ list.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ list.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="updateGoodsNum('cut', -1, list)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="list.skuNum"
              minnum="1"
              class="itxt"
              @blur="updateGoodsNum('character', $event.target.value * 1, list)"
            />
            <a class="plus" @click="updateGoodsNum('add', 1, list)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ list.skuNum * list.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCommodity(list.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @click="checkedAllupdate($event)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllPitchCommodity">删除选中的商品</a>
        <a >移到我的关注</a>
        <a >清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ allGoodsSum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） </em>
          <i class="summoney">{{ allGoodsPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      timer: null, //定时器返回值
    };
  },
  computed: {
    ...mapGetters("ShoppingCart", ["shoppingInfoList"]),
    //全选
    isAllChecked() {
      return this.shoppingInfoList.every((item) => item.isChecked === 1);
    },
    //商品总价
    allGoodsPrice() {
      let sum = 0;
      this.shoppingInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //总件数
    allGoodsSum() {
      let sum = 0;
      this.shoppingInfoList.forEach((item) => {
        sum += item.skuNum;
      });
      return sum;
    },
  },
  methods: {
    //调用vuex仓库中的action  获取购物车数据
    getData() {
      this.$store.dispatch("ShoppingCart/getShoppingCartData");
    },
    //更新购物车  商品数量 (单个)
    updateGoodsNum(type, changeNum, list) {
      //最终  商品数量的  变化量
      let goodsChangeNum = null;
      //传过来的  商品个数 是否是数字类型
      let flang = isNaN(changeNum);
      //商品 的原始数据
      let { skuNum, skuId } = list;

      switch (type) {
        case "add":
          goodsChangeNum = 1;
          break;
        case "cut":
          goodsChangeNum = skuNum <= 1 ? 0 : -1;
          break;
        case "character":
          goodsChangeNum =
            !flang && changeNum >= 1 ? parseInt(changeNum) - skuNum : 0;
        default:
          break;
      }

     //节流
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$store.dispatch("ShoppingCart/updateShoppingCart", { skuId, goodsChangeNum })
        .then((response) => {
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        });
      },500)
    },
    //删除购物车商品 (单个)
    deleteCommodity(skuId){
      this.$store.dispatch('ShoppingCart/deleteShoppingCart',skuId)
      .then(response => {
        this.getData()
      })
      .catch(error => {
        console.log(error);
      })
    },
    //改变商品 勾选状态(单个)
    changeChecked(skuId,oldChecked){
      console.log(skuId,oldChecked);
      let checked = oldChecked ? 1 : 0
      
      this.$store.dispatch('ShoppingCart/changeCheckedGood',{skuId,checked})
      .then(
        response => {
          this.getData()
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
    },
    //删除勾选所有商品 (多个)
    deleteAllPitchCommodity(){
      this.$store.dispatch('ShoppingCart/deleteAllPitchCommodity')
      .then(
        response => {
          this.getData()
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
    },
    //所有商品 全部 勾选 或者 全不 勾选
    async checkedAllupdate({target:{checked}}){
      try {
        await this.$store.dispatch('ShoppingCart/checkedAllupdate',checked ? 1 : 0)
        this.getData()
      } catch (error) {
        console.log(error);
      }
      
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>

.sindelet{
  cursor: pointer;
}

.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>