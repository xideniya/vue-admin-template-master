<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="scene !== 0" @getcategoryid="getcategoryid"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addspu">添加Spu</el-button>
        <!-- spu列表 -->
        <el-table style="width: 100%; margin: 20px 0px" border :data="records">
          <el-table-column prop="prop" label="序号" width="80" type="index" align="center"> </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width"> </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width"> </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button type="success" size="mini" icon="el-icon-plus" title="添加sku" @click="addSku(row)"></el-button>
              <el-button type="warning" size="mini" icon="el-icon-edit" title="修改spu" @click="updatespu(row)"></el-button>
              <el-button type="info" size="mini" icon="el-icon-info" title="查看sku列表" @click="checkskuList(row)"></el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" style="margin-left: 10px" @onConfirm="deleteSpu(row)">
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" title="删除spu"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination :current-page="page" :page-sizes="[5, 10, 20]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total" align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </div>
      <SpuForm v-show="scene === 1" ref="spuform" @changescene="changescene"></SpuForm>
      <SkuForm v-show="scene === 2" ref="skuform" @changescene="changescenegFromSkuform"></SkuForm>
    </el-card>
    <!-- 点击查看弹出的对话框 -->
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" @closed="closeDialog">
      <el-table v-loading="loading" :data="skuList" border>
        <el-table-column property="skuName" label="名称" width="width"></el-table-column>
        <el-table-column property="price" label="价格" width="100"></el-table-column>
        <el-table-column property="weight" label="重量" width="100"></el-table-column>
        <el-table-column property="address" label="默认图片" width="150">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 5,
      records: [],
      total: 0,
      scene: 0, // 控制3个不同场景的切换
      dialogTableVisible: false, // 控制对话框显示
      spu: {},
      skuList: [],
      loading: true
    }
  },
  methods: {
    // 获得三级分类的ID
    getcategoryid({ categoryid, level }) {
      switch (level) {
        case 1:
          this.category1Id = categoryid
          this.category2Id = ''
          this.category3Id = ''
          break
        case 2:
          this.category2Id = categoryid
          this.category3Id = ''
          break
        case 3:
          this.category3Id = categoryid
          this.getspuList()
          break
      }
    },
    // 获取服务器数据
    async getspuList() {
      const result = await this.$API.spu.reqSpuList(this.page, this.limit, this.category3Id)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 分页器每页展示条数变化
    handleSizeChange(limit) {
      this.limit = limit
      this.getspuList()
    },
    // 分页器当前页码变化
    handleCurrentChange(page) {
      this.page = page
      this.getspuList()
    },
    // 添加spu按钮回调
    addspu() {
      this.scene = 1
      // 发送2个请求，获取品牌和属性,顺便把3级ID送过去
      this.$refs.spuform.addSpudata(this.category3Id)
    },
    // 修改某一个spu
    updatespu(row) {
      this.scene = 1
      // 调用子组件上的方法
      this.$refs.spuform.initSpudata(row)
    },
    // 接受子组件传来的值
    changescene({ scene, flag }) {
      this.scene = scene
      // 切换完场景重新获取数据
      this.getspuList()
      if (flag === '修改') {
        this.getspuList()
      } else {
        // 新增spu，点保存后跳转到第一页
        this.handleCurrentChange(1)
      }
    },
    // 删除spu
    async deleteSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: `删除"${row.spuName}"成功`
        })
        // 判断删完后本页是否还有数据
        if (this.records.length > 1) {
          this.getspuList()
        } else {
          this.handleCurrentChange(this.page - 1)
        }
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2
      // 父组件调用子组件的方法发请求
      this.$refs.skuform.getData(this.category1Id, this.category2Id, this.category3Id, row)
    },
    // 子组件skuform点击取消后，切换显示
    changescenegFromSkuform(scene) {
      this.scene = scene
    },
    // 查看sku列表
    async checkskuList(row) {
      this.dialogTableVisible = true
      this.spu = row
      const result = await this.$API.spu.reqSkuList(row.id)
      if (result.code === 200) {
        this.loading = false
        this.skuList = result.data
      }
    },
    // 关闭对话框
    closeDialog() {
      this.spu = {}
      this.skuList = []
      this.loading = true
    }
  }
}
</script>

<style></style>
