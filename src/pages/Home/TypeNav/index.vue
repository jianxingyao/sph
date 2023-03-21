<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex()" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 左边的一级栏目 -->
        <transition name="abc">
            <div class="sort" v-show="show">
              <div class="all-sort-list2" @click="goSearch($event)">
                <div
                  class="item"
                  v-for="(c1, index) in CategoryList"
                  :key="c1.categoryId"
                >
                  <h3
                    @mouseenter="ChangIndex(index)"
                    :class="{ cut: currentIndex === index }"
                  >
                    <a :data-categroy1Id="c1.categoryId" :data-categoryName="c1.categoryName">{{
                      c1.categoryName
                    }}</a>
                  </h3>
                  <!-- 二级栏目 -->
                  <div class="item-list clearfix" v-show="currentIndex === index">
                    <div
                      class="subitem"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categroy2Id="c2.categoryId"
                            :data-categoryName="c2.categoryName"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="(c3, index) in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categroy3Id="c3.categoryId"
                              :data-categoryName="c3.categoryName"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      // timer:'',
      show: false,
      path: this.$route.path,
    };
  },
  computed: {
    ...mapState("Home", ["CategoryList"]),
  },
  methods: {
    // ...mapActions("Home", ["createcategorylist"]),

    //改变一级栏目背景色
    ChangIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 20),
    //一级栏目 显示 和 不显示
    enterShow() {
      if (this.path !== "/home") {
        this.show = true;
      }
    },
    leaveIndex() {
      this.currentIndex = -1;
      if (this.path !== "/home") {
        this.show = false;
      }
    },
    //三级联动跳转
    goSearch(e) {
      let target = e.target;
      //发送的信息
      const localhost = { name: "search" };

      let {categoryname,categroy1id,categroy2id,categroy3id,} = target.dataset
      //携带的参数
      const query = { categoryName:categoryname };
      if (target.nodeName == "A") {
        
        if (categroy1id) {
          query.category1Id = categroy1id;
        } else if (categroy2id) {
          query.category2Id = categroy2id;
        } else {
          query.category3Id = categroy3id;
        }
      }
      //整合信息
      localhost.query = query;
      if(this.$route.params){
        localhost.params = this.$route.params
      }
      this.$router.push(localhost);
    },
  },
  mounted() {
    // this.createcategorylist();
    if (this.$route.path === "/home") {
      this.show = true;
    }
  },
};
</script>

<style scoped>
h3.cut {
  background-color: pink;
}

.outer .type-nav {
  border-bottom: 2px solid #e1251b;
}
.outer .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.outer .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  cursor: pointer;
  z-index: 999;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
  /* display: none; */
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl.fore {
  border-top: 0;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd
  em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}

/* 进入的时候 */
.abc-enter,
.abc-leave-to
{
  height: 0px;
  opacity: 0;
}
/* 动画结束的时候 */
.abc-enter-to,
.abc-leave
{
  height: 461px;
  opacity: 1;
}
/* 动画过程 */
.abc-enter-active,
.abc-leave-active
{
  transition: all .5s linear;
 
}


</style>