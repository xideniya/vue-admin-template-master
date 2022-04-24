import request from '@/utils/request.js'
export const reqProductList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'get'
})
// 上架
export const reqOnsale = (skuId) => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'get'
})
// 下架
export const reqcancelSale = (skuId) => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'get'
})
// 获取商品详情
export const reqgetSkuById = (skuId) => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'get'
})
