<template>
  <div class="pagination" @click="paginationClick">
    <button :disabled="currentPage == 1" class="prevPageBtn">上一页</button>
    <button 
      class="firstPageBtn"
      v-if="continuousPageStartOrEnd.start > 2"
    >1</button>
    <button
      v-if="continuousPageStartOrEnd.start >= 2"
    >···</button>

    <template v-for="(page,index) of continuousPageStartOrEnd.end">
      <button 
        :data-page="`${page}`"
        :key="index"
        :class="{'active':currentPage == page}" 
        v-if="(page > continuousPageStartOrEnd.end-continuousPage)"
      >{{page}}</button>
    </template>
    
    <button 
      v-if="continuousPageStartOrEnd.end < totalPage"
    >···</button>
    <button 
      class="lastPageBtn"
      v-if="continuousPageStartOrEnd.end < totalPage - 1"
    >{{totalPage}}</button>

    <button :disabled="currentPage == totalPage" class="nextPageBtn">下一页</button>
   
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
import { computed } from 'vue'
  export default {
    name: "Pagination",
    props:['total','currentPage','continuousPage','pageSize'],
    computed:{
      //总的页数
      totalPage(){
        return Math.ceil(this.total/this.pageSize)
      },
      //连续页码的起始和结束
      continuousPageStartOrEnd(){
        const {total,currentPage,continuousPage,pageSize,totalPage} = this
        currentPage - 0
        //中间页码 距离 起始和结束的差值页码数
        const differencPage = Math.floor(continuousPage / 2)
        //起始页码
        let start = 0
        //结束页码
        let end = 0

        //总的页数 小于  连续页码数
        if(totalPage < continuousPage){
          start = 1
          end = totalPage
        }else{
          
          //当前页码数 小于 差值页码数 + 1
          if(currentPage < differencPage + 1){
            start = 1
            end = continuousPage
          }

          //当前页码数 大于等于 差值页码数 + 1
          if(currentPage >= differencPage + 1){
            start = currentPage - 0  - differencPage - 0
            end = currentPage - 0  + differencPage - 0
          }

          //当前页码数 与 差值页码  之和 大于等于 总页数
          if((currentPage + differencPage ) >= totalPage){
            start = totalPage - continuousPage + 1
            end = totalPage
          }
        }

        console.log(start,end);
        return {end,start}
      },

      

    },
    methods:{
      //分页器事件委托
      paginationClick(e){
        let target = e.target
        console.log(target.className);
        console.log(target.dataset.page);
        //属性是 第几页 
        if(target.dataset.page){
          this.$emit('getCurrentPage',target.dataset.page)
        }
        //上一页
        if(target.className === 'prevPageBtn'){
          this.$emit('getCurrentPage',this.currentPage - 1)
        }
        //下一页
        if(target.className === 'nextPageBtn'){
          this.$emit('getCurrentPage',this.currentPage + 1)
        }
        //第一页 首页
        if(target.className === 'firstPageBtn'){
          this.$emit('getCurrentPage',1)
        }
        //尾页 最后一页
        if(target.className === 'lastPageBtn'){
          this.$emit('getCurrentPage',this.totalPage)
        }

      },
      
    }
  }
</script>



<style lang="less" scoped>


  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>