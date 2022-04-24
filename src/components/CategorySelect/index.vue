<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1id" placeholder="请选择" :disabled="show" @change="handler1">
          <el-option v-for="c1 in Category1List" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2id" placeholder="请选择" :disabled="show" @change="handler2">
          <el-option v-for="c2 in Category2List" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3id" placeholder="请选择" :disabled="show" @change="handler3">
          <el-option v-for="c3 in Category3List" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: { show: Boolean },
  data() {
    return {
      Category1List: [],
      Category2List: [],
      Category3List: [],
      // 收集相应的分类id
      cForm: {
        category1id: '',
        category2id: '',
        category3id: ''
      }
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类数据
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code === 200) {
        this.Category1List = result.data
      }
    },
    // 一级分类发生变化，获取二级分类数据
    async handler1() {
      this.Category2List = []
      this.Category3List = []
      this.cForm.category2id = ''
      this.cForm.category3id = ''
      this.$emit('getcategoryid', { categoryid: this.cForm.category1id, level: 1 })
      const result = await this.$API.attr.reqCategory2List(this.cForm.category1id)
      if (result.code === 200) {
        this.Category2List = result.data
      }
    },
    // 二级分类发生变化，获取三级分类数据
    async handler2() {
      this.Category3List = []
      this.cForm.category3id = ''
      this.$emit('getcategoryid', { categoryid: this.cForm.category2id, level: 2 })
      const result = await this.$API.attr.reqCategory3List(this.cForm.category2id)
      if (result.code === 200) {
        this.Category3List = result.data
      }
    },
    handler3() {
      this.$emit('getcategoryid', { categoryid: this.cForm.category3id, level: 3 })
    }
  }
}
</script>

<style></style>
