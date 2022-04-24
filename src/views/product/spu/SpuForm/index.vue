<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="spu名称">
        <el-input v-model="spu.spuName" placeholder="spu名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="item in trademarklist" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input v-model="spu.description" type="textarea" rows="4" placeholder="spu描述"></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <!-- 照片墙 -->
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="spuimagelist" :on-success="handlerImageUploadSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 图片放大显示框 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attridandname" :placeholder="`还有${unselectsaleattr.length}项未选择`">
          <el-option v-for="item in unselectsaleattr" :key="item.id" :value="`${item.id}:${item.name}`" :label="item.name"> </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" style="margin-left: 20px" :disabled="!attridandname" @click="addSaleAttr">添加销售属性</el-button>
        <!-- 使用表格展示售卖属性和属性值 -->
        <el-table :data="spu.spuSaleAttrList" style="width: 100%">
          <el-table-column prop="prop" label="序号" width="80" type="index" align="center"> </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width"> </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <!-- 动态编辑标签 -->
            <template slot-scope="{ row }">
              <el-tag v-for="tag in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" @close="handleClose(tag, row)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input v-if="row.inputVisible" ref="saveTagInput" v-model="row.inputValue" class="input-new-tag" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm(row)"> </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <!-- 删除属性按钮 -->
            <template slot-scope="{ $index }">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index, 1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <!-- 保存和取消按钮 -->
        <el-button type="primary" @click="addorUpadatespu">保存</el-button>
        <el-button @click="goscene">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: '',
        id: 0,
        spuImageList: [
          {
            id: 0,
            imgName: '',
            imgUrl: '',
            spuId: 0
          }
        ],
        spuName: '',
        spuSaleAttrList: [],
        tmId: ''
      },
      trademarklist: [],
      spuimagelist: [],
      attrlist: [],
      attridandname: '', // 收集未选择的销售属性
      // 动态编辑标签
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    // 计算出还未选择的销售属性
    unselectsaleattr() {
      const result = this.attrlist.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => item1.saleAttrName !== item.name)
      })
      return result
    }
  },
  methods: {
    // 照片墙删除图片触发
    handleRemove(file, fileList) {
      // file删除的 filelist 剩下的图片
      // 收集数据
      this.spuimagelist = fileList
    },
    // 照片墙预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 照片墙上传成功回调
    handlerImageUploadSuccess(response, file, fileList) {
      this.spuimagelist = fileList
    },
    // 取消按钮的回调函数
    goscene() {
      // 清理数据
      Object.assign(this._data, this.$options.data())
      this.$emit('changescene', { scene: 0, flag: '修改' })
    },
    // 初始化spuform的数据
    async initSpudata(row) {
      const spuresult = await this.$API.spu.reqSpu(row.id)
      if (spuresult.code === 200) {
        this.spu = spuresult.data
      }
      const trademarkresult = await this.$API.spu.reqTrademark()
      if (trademarkresult.code === 200) {
        this.trademarklist = trademarkresult.data
      }
      const imagelistresult = await this.$API.spu.reqSpuImageList(row.id)
      if (imagelistresult.code === 200) {
        const arr = imagelistresult.data
        // 照片墙需要的数据格式是数组，数组里的元素要有name 和url字段
        // 需要对服务器返回的数据进行整理
        arr.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        // 把整理好的数据赋值（新增了2个属性）
        this.spuimagelist = arr
      }
      // 获取销售属性
      const attrlistresult = await this.$API.spu.reqAttrList()
      if (attrlistresult.code === 200) {
        this.attrlist = attrlistresult.data
      }
    },
    // 点击属性值叉子标签
    handleClose(tag, row) {
      const num = row.spuSaleAttrValueList.indexOf(tag)
      row.spuSaleAttrValueList.splice(num, 1)
    },
    // 点击添加属性值
    addAttrValue(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    // 属性值输入框失去焦点回调
    handleInputConfirm(row) {
      row.inputVisible = false
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim() === '') {
        this.$message('属性值不能为空')
        return
      }
      // 属性值不能重复
      const result = row.spuSaleAttrValueList.some((item) => item.saleAttrValueName === inputValue)
      if (result) {
        this.$message('属性值不能重复')
        return
      }
      // 新增的属性值整理数据
      const newobj = { baseSaleAttrId, saleAttrValueName: inputValue }
      // 把新增的属性值加入数组
      row.spuSaleAttrValueList.push(newobj)
    },
    // 添加新的销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attridandname.split(':')
      const newobj = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spu.spuSaleAttrList.push(newobj)
      // 置空选择框数据
      this.attridandname = ''
    },
    // 保存按钮的回调
    async addorUpadatespu() {
      // 整理参数，整理照片墙的数据
      // 需要携带imagename imageURL
      this.spu.spuImageList = this.spuimagelist.map((item) => {
        return {
          imgName: item.name,
          // 新图的图片服务器地址在response里，url里是本地地址
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      const result = await this.$API.spu.reqAddorUpdatespuinfo(this.spu)
      if (result.code === 200) {
        this.$message({ message: '保存成功', type: 'success' })
        this.$emit('changescene', { scene: 0, flag: this.spu.id ? '修改' : '添加' })
      }
      Object.assign(this._data, this.$options.data())
    },
    // 父组件点击新增后，子组件需要获取品牌和属性
    async addSpudata(category3Id) {
      const trademarkresult = await this.$API.spu.reqTrademark()
      if (trademarkresult.code === 200) {
        this.trademarklist = trademarkresult.data
      }
      const attrlistresult = await this.$API.spu.reqAttrList()
      if (attrlistresult.code === 200) {
        this.attrlist = attrlistresult.data
      }
      // 收集来自父组件的3级分类ID
      this.spu.category3Id = category3Id
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
