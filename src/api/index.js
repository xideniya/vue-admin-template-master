// 将四个模块请求的接口函数统一暴露
import * as trademark from './product/trademark'
import * as attr from './product/attr.js'
import * as spu from './product/spu.js'
import * as sku from './product/sku'
// 权限接口文件
import * as user from './acl/user.js'
// 接口文件里已经是默认暴露
import role from './acl/role.js'
import permission from './acl/permission'

export default {
  trademark,
  attr,
  sku,
  spu,
  user,
  role,
  permission
}
