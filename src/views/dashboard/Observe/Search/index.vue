<template>
  <el-card>
    <div slot="header">
      <span>线上热门搜索</span>
      <el-dropdown>
        <span class="el-dropdown-link"> <i class="el-icon-more"></i> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="date" label="排名" width="180"> </el-table-column>
      <el-table-column prop="keyword" label="关键字" width="180"> </el-table-column>
      <el-table-column prop="name" label="搜索用户数" sortable width="180"> </el-table-column>
      <el-table-column prop="address" label="周涨幅" :formatter="formatter" sortable> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import lineCharts from './lineCharts'
export default {
  name: 'Search',
  components: { lineCharts },
  data() {
    return {
      tableData: [
        {
          date: 1,
          keyword: '辣条',
          name: 9000,
          address: '25%'
        },
        {
          date: 2,
          keyword: '香蕉',
          name: 7000,
          address: '10%'
        },
        {
          date: 3,
          keyword: '苹果',
          name: 900,
          address: '6%'
        },
        {
          date: 4,
          keyword: '梨',
          name: 100,
          address: '9%'
        }
      ]
    }
  },
  methods: {
    formatter(row, column) {
      return row.address
    }
  }
}
</script>

<style scoped>
>>> .el-card__header .el-dropdown {
  float: right;
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
