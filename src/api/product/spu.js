import request from '@/utils/request.js'
export const reqSpuList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: {
    category3Id
  }
})
// 获取spu信息
export const reqSpu = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'get'
})
// 获取品牌信息
export const reqTrademark = () => request({
  url: `/admin/product/baseTrademark/getTrademarkList`,
  method: 'get'
})
// 获取spu图片
export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})
// 获取销售属性
export const reqAttrList = () => request({
  url: `/admin/product/baseSaleAttrList`,
  method: 'get'
})
// 修改或添加spu
export const reqAddorUpdatespuinfo = (spuinfo) => {
// 携带ID说明是修改
  if (spuinfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuinfo
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuinfo
    })
  }
}
// 删除spu
export const reqDeleteSpu = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete'
})
// 获取图片信息接口(添加sku)
export const reqskuimagelist = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})
// 获取销售属性
export const reqsaleAttrList = (spuId) => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'get'
})
// 获取平台属性的数据
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})
// 保存sku
export const reqSaveskuInfo = (skuInfo) => request({
  url: '/admin/product/saveSkuInfo',
  method: 'post',
  data: skuInfo
})
// 获取sku列表数据
export const reqSkuList = (spuId) => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'get'
})

