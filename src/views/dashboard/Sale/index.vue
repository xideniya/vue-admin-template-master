<template>
  <el-card class="box-card" style="margin: 10px 0">
    <!-- 头部区域 -->
    <div slot="header" class="clearfix caln">
      <!-- 头部左侧内容 -->
      <el-tabs v-model="activeName" class="tab1">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="rightsale">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <!-- 日期选择器 -->
        <el-date-picker type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"> </el-date-picker>
      </div>
    </div>
    <!-- 内容区域  -->
    <div class="body1">
      <el-row :gutter="10">
        <!-- 左侧柱状图 -->
        <el-col :span="16">
          <div ref="charts" class="charts"></div>
        </el-col>
        <!-- 右侧排名 -->
        <el-col :span="8">
          <div class="rank">
            <div>门店销售额排名</div>
            <ul>
              <li>
                <span class="index">0</span>
                <span>肯德基</span>
                <span class="rvalue">1235554</span>
              </li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted() {
    const mycharts = echarts.init(this.$refs.charts)
    mycharts.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220, 12, 321, 33, 223, 22]
        }
      ]
    })
  }
}
</script>

<style scoped>
.el-card__header >>> {
  border-bottom: 0;
}
.caln {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab1 {
  width: 100%;
}
.rightsale {
  position: absolute;
  right: 0;
}
.rightsale span {
  margin-right: 10px;
  font-size: 14px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
}
.index {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  line-height: 20px;
}
</style>
