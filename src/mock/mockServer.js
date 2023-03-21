import Mock from 'mockjs'

//json 图片等在webPack默认暴露
import banner from './banner.json'
import floor from './floor.json'

Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
