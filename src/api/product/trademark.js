import request from '@/utils/request'
// 获取品牌列表接口\
export const reqTradeMarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})
// 添加或修改品牌
export const reqAddorUpdateTrademark = (tradeMark) => {
  // 携带id是修改品牌,不携带是新增品牌
  if (tradeMark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tradeMark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark
    })
  }
}
// 删除品牌
export const reqdeletetrademark = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'delete'
})

