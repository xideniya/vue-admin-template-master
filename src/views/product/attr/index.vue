<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <CategorySelect :show="!isshowtable" @getcategoryid="getcategoryid"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isshowtable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addattr">添加属性</el-button>
        <!-- 表格展示平台属性 -->
        <el-table style="width: 100%" border :data="attrlist">
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150"> </el-table-column>
          <el-table-column prop="prop" label="属性列表" width="width">
            <template slot-scope="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id" type="success" style="margin: 0 10px">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row }">
              <!-- 修改属性按钮 -->
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateattr(row)"></el-button>
              <!-- 删除属性按钮 -->
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或者修改属性的结构 -->
      <div v-show="!isshowtable">
        <!-- 属性区域 -->
        <el-form ref="form" :inline="true" label-width="80px" :model="attrinfo">
          <el-form-item label="属性名称">
            <el-input v-model="attrinfo.attrName" placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrinfo.attrName" @click="addattrvalue">添加属性值</el-button>
        <el-button @click="isshowtable = true">取消</el-button>
        <!-- 属性值区域 -->
        <el-table style="width: 100%; margin: 20px 0" border :data="attrinfo.attrValueList">
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column header-align="center" align="center" prop="prop" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <!-- 这里的结构相互切换 -->
              <el-input v-if="row.flag" :ref="$index" v-model="row.valueName" placeholder="请输入属性值名称" size="mini" @blur="tolook(row)" @keyup.native.enter="tolook(row)"></el-input>
              <span v-else style="display: block" @click="toedit(row, $index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <!-- 删除属性值按钮 -->
              <el-popconfirm :title="`确定要删除${row.valueName}吗？？`" @onConfirm="confirmdelete(row, $index)">
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存按钮 -->
        <el-button type="primary" :disabled="attrinfo.attrValueList.length < 1" @click="save">保存</el-button>
        <el-button @click="isshowtable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      // 控制table显示和隐藏
      isshowtable: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrlist: [],
      // 添加或修改品牌名称
      attrinfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  methods: {
    // 获取属性列表进行展示
    async getattrList() {
      const result = await this.$API.attr.reqattrlist(this.category1Id, this.category2Id, this.category3Id)
      if (result.code === 200) {
        this.attrlist = result.data
      }
    },
    // 从子组件获取3个级别的ID
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
          this.getattrList()
          break
      }
    },
    // 添加属性
    addattr() {
      // 清除数据
      this.attrinfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id, // 点击按钮时，三级ID已经存在，在这里收集id数据
        categoryLevel: 3
      }
      // 切换显示信息
      this.isshowtable = false
    },
    // 修改属性
    updateattr(row) {
      this.isshowtable = false
      // 将选中的属性赋值给attrinfo 使用深拷贝 lodash方法
      this.attrinfo = cloneDeep(row)
      // 修改属性时，添加上flag，控制input 和span的切换
      this.attrinfo.attrValueList.forEach((item) => {
        this.$set(item, 'flag', false)
      })
    },
    // 添加属性值
    addattrvalue() {
      this.attrinfo.attrValueList.push({
        attrId: this.attrinfo.id, // 修改属性的时候，可以在已有属性值的基础上新增一个，新增时把已有的属性ID带上
        valueName: '',
        flag: true // 用来控制显示input 还是span
      })
      this.$nextTick(() => {
        this.$refs[this.attrinfo.attrValueList.length - 1].focus()
      })
    },
    // input失去焦点的回调
    tolook(row) {
      // 编辑模式变为查看模式
      if (row.valueName.trim() === '') {
        this.$message('请你输入内容')
        return
      }
      // 新增的属性值不能与已有的重复
      const isrepeat = this.attrinfo.attrValueList.some((item) => {
        // 比较时去掉自己
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      if (isrepeat) return
      row.flag = false
    },
    // 点击span标签的回调
    toedit(row, index) {
      row.flag = true
      // 让input自动聚焦, input已经渲染到页面才聚焦
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 删除属性值
    confirmdelete(row, index) {
      // 气泡确认框的回调
      this.attrinfo.attrValueList.splice(index, 1)
    },
    // 添加或修改属性保存按钮回调
    async save() {
      // 整理带给服务器的参数
      // 将属性值空的剔除掉，把字段flag剔除
      this.attrinfo.attrValueList = this.attrinfo.attrValueList.filter((item) => {
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })
      // 发送请求
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrinfo)
        this.isshowtable = true
        this.$message({ type: 'success', message: '保存成功' })
        // 获取最新属性进行展示
        this.getattrList()
      } catch (error) {
        this.$message({ message: '保存失败' })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
