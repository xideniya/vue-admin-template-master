<template>
  <el-card>
    <div slot="header" class="top">
      <span>销售额类别占比</span>
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div ref="echarts" class="echarts"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      radio1: '全部渠道'
    }
  },
  mounted() {
    const myecharts = echarts.init(this.$refs.echarts)
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
    option && myecharts.setOption(option)
  }
}
</script>

<style scoped>
>>> .el-card__header .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.echarts {
  width: 100%;
  height: 350px;
}
</style>
