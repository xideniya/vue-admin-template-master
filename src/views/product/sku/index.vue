<template>
  <div>
    <el-table :data="productList" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"> </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"> </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="120" align="center">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="60" align="center"> </el-table-column>
      <el-table-column prop="price" label="价格" width="60" align="center"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button v-if="row.isSale === 1" type="success" icon="el-icon-bottom" size="mini" @click="cancelSale(row)"></el-button>
          <el-button v-if="row.isSale === 0" type="info" size="mini" icon="el-icon-top" @click="onsale(row)"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info" @click="showSkuInfo(row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageNum" :page-sizes="[5, 10, 15]" :page-size="pageSize" layout="prev, pager, next, jumper,->, sizes,total" :total="totalCount" style="text-align: center" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="drawer" :with-header="true" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id" type="success" style="margin-right: 10px; margin-bottom: 10px">{{ item.attrId }}-{{ item.valueId }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      drawer: false,
      productList: [],
      pageNum: 1,
      pageSize: 5,
      totalCount: 0,
      skuInfo: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const result = await this.$API.sku.reqProductList(this.pageNum, this.pageSize)
      if (result.code === 200) {
        this.productList = result.data.records
        this.totalCount = result.data.total
      }
    },
    handleSizeChange(limit) {
      this.pageSize = limit
      this.getData()
    },
    handleCurrentChange(page) {
      this.pageNum = page
      this.getData()
    },
    // 下架
    async cancelSale(row) {
      const result = await this.$API.sku.reqcancelSale(row.id)
      if (result.code === 200) {
        this.$message({ message: '下架成功', type: 'success' })
        this.getData()
      }
    },
    // 上架
    async onsale(row) {
      const result = await this.$API.sku.reqOnsale(row.id)
      if (result.code === 200) {
        this.$message({ message: '上架成功', type: 'success' })
        this.getData()
      }
    },
    // 显示商品信息
    async showSkuInfo(row) {
      const result = await this.$API.sku.reqgetSkuById(row.id)
      this.drawer = true
      if (result.code === 200) {
        this.skuInfo = result.data
      }
    }
  }
}
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
