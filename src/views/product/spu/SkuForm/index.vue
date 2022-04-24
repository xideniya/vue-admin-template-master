<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }} </el-form-item>
      <el-form-item label="sku名称">
        <el-input v-model="skuInfo.skuName" placeholder="sku名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" placeholder="价格(元)" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" placeholder="规格描述" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item v-for="item1 in attrInfoList" :key="item1.id" :label="item1.attrName" style="margin-bottom: 15px">
            <el-select v-model="item1.attridAndAttrValueid" placeholder="请选择">
              <el-option v-for="item2 in item1.attrValueList" :key="item2.id" :label="item2.valueName" :value="`${item2.attrId}:${item2.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item v-for="item1 in saleAttrList" :key="item1.id" :label="item1.saleAttrName" style="margin-bottom: 15px">
            <el-select v-model="item1.saleAttrIdAndSaleAttrValueId" placeholder="请选择">
              <el-option v-for="item2 in item1.spuSaleAttrValueList" :key="item2.id" :label="item2.saleAttrValueName" :value="`${item1.id}:${item2.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImagelist" @selection-change="handleSelectionChange">
          <el-table-column prop="prop" label="label" width="80" type="selection"> </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width"> </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button v-if="row.isdefault === 0" type="primary" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImagelist: [],
      saleAttrList: [],
      attrInfoList: [],
      // 收集数据
      skuInfo: {
        category3Id: 0,
        price: 0,
        // 平台属性
        skuAttrValueList: [],
        skuDefaultImg: '',
        skuDesc: '',
        skuImageList: [],
        skuName: '',
        // 销售属性列表
        skuSaleAttrValueList: [],
        spuId: 0,
        tmId: 0,
        weight: ''
      },
      spu: {},
      // 收集图片信息
      imgList: []
    }
  },
  methods: {
    // 获取skuform数据
    async getData(category1Id, category2Id, category3Id, row) {
      // 收集父组件给予的数据
      this.skuInfo.category3Id = category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      this.spu = row
      //  获取图片数据
      const result = await this.$API.spu.reqskuimagelist(row.id)
      if (result.code === 200) {
        // 添加字段
        result.data.forEach((item) => {
          item.isdefault = 0
        })
        this.spuImagelist = result.data
      }
      // 获取销售属性数据
      const result1 = await this.$API.spu.reqsaleAttrList(row.id)
      if (result1.code === 200) {
        this.saleAttrList = result1.data
      }
      // 获取平台属性的数据
      const result3 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrInfoList = result3.data
      }
    },
    // 表格复选框
    handleSelectionChange(selection) {
      // 获取到用户选择的图片信息 缺少isdefault字段
      this.imgList = selection
    },
    // 设置默认图片
    changeDefault(row) {
      this.spuImagelist.forEach((item) => {
        item.isdefault = 0
      })
      row.isdefault = 1
      // 收集默认图片信息
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 取消按钮
    cancel() {
      this.$emit('changescene', 0)
      // 清空数据
      Object.assign(this._data, this.$options.data())
    },
    // 保存按钮
    async save() {
      // 整理平台属性
      this.skuInfo.skuAttrValueList = this.attrInfoList.reduce((prev, item) => {
        if (item.attridAndAttrValueid) {
          const [attrId, valueId] = item.attridAndAttrValueid.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])
      // 整理销售属性
      this.skuInfo.skuSaleAttrValueList = this.saleAttrList.reduce((prev, item) => {
        if (item.saleAttrIdAndSaleAttrValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndSaleAttrValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 整理图片数据
      this.skuInfo.skuImageList = this.imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isdefault,
          spuImgId: item.id
        }
      })
      // 发送请求
      const result = await this.$API.spu.reqSaveskuInfo(this.skuInfo)
      if (result.code === 200) {
        this.$message({
          message: '添加sku成功',
          type: 'success'
        })
        this.cancel()
      }
    }
  }
}
</script>

<style></style>
