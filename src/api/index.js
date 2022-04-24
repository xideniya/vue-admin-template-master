// 将四个模块请求的接口函数统一暴露
import * as trademark from './product/trademark'
import * as attr from './product/attr.js'
import * as spu from './product/spu.js'
import * as sku from './product/sku'

export default {
  trademark,
  attr,
  sku,
  spu
}
