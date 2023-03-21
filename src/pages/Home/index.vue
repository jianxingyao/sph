<template>
  
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodyRecommend></TodyRecommend>
    <Rank></Rank>
    <Link></Link>
    <Floor 
      v-for="item in floorList" 
      :key="item.id"
      :list ='item'
    ></Floor>
    
  </div>

</template>

<script>
import ListContainer from './ListContainer'
import TodyRecommend from './TodayRecommend'
import Rank from './Rank'
import Link from './Link'
import Floor from './Floor'
import { mapState } from 'vuex'


export default {
    name:'Home',
    computed:{
      ...mapState("Home",['floorList'])
    },
    components:{
      ListContainer,
      TodyRecommend,
      Rank,
      Link,
      Floor,
    },
    mounted() {
      this.$store.dispatch('Home/createFloorList')
      // this.$store.dispatch('User/getUserInfo')
      // .then(response => {

      // })
      // .catch(error => {

      // })
    },
    
}
</script>

<style>

</style>