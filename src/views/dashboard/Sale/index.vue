<template>
  <el-card class="box-card" style="margin: 10px 0">
    <!-- 头部区域 -->
    <div slot="header" class="clearfix caln">
      <!-- 头部左侧内容 -->
      <el-tabs v-model="activeName" class="tab1" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="rightsale">
        <span @click="today">今日</span>
        <span @click="thisweek">本周</span>
        <span @click="thismonth">本月</span>
        <span @click="thisyear">本年</span>
        <!-- 日期选择器 -->
        <el-date-picker v-model="value1" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" value-format="yyyy-MM-dd"> </el-date-picker>
      </div>
    </div>
    <!-- 内容区域  -->
    <div class="body1">
      <el-row :gutter="10">
        <!-- 左侧柱状图 -->
        <el-col :span="18">
          <div ref="charts" class="charts"></div>
        </el-col>
        <!-- 右侧排名 -->
        <el-col :span="6">
          <div class="rank">
            <div>门店{{ title }}排名</div>
            <ul>
              <li>
                <span class="index">1</span>
                <span>肯德基</span>
                <span class="rvalue">1235554</span>
              </li>
              <li>
                <span class="index">2</span>
                <span>麦当劳</span>
                <span class="rvalue">123554</span>
              </li>
              <li>
                <span class="index">3</span>
                <span>沙县小吃</span>
                <span class="rvalue">135554</span>
              </li>
              <li>
                <span class="index">4</span>
                <span>拌面</span>
                <span class="rvalue">135554</span>
              </li>
              <li>
                <span class="index">5</span>
                <span>方便面</span>
                <span class="rvalue">125554</span>
              </li>
              <li>
                <span class="index">6</span>
                <span>海底捞</span>
                <span class="rvalue">13554</span>
              </li>
              <li>
                <span class="index">7</span>
                <span>兰州拉面</span>
                <span class="rvalue">12554</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'first',
      mycharts: null,
      // 收集日历数据
      value1: []
    }
  },
  computed: {
    title() {
      return this.activeName === 'first' ? '销售额' : '访问量'
    }
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts)
    this.mycharts.setOption({
      title: {
        text: this.title + '趋势'
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
  },
  methods: {
    handleClick() {
      // 重新修改图表配置数据
      this.mycharts.setOption({
        title: {
          text: this.title + '趋势'
        }
      })
    },
    today() {
      const day = dayjs().format('YYYY-MM-DD')
      this.value1 = [day, day]
    },
    thisweek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.value1 = [start, end]
    },
    thismonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.value1 = [start, end]
    },
    thisyear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.value1 = [start, end]
    }
  }
}
</script>

<style scoped>
>>> .el-card__header {
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
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  line-height: 20px;
  margin-right: 80px;
}
.rvalue {
  float: right;
}
</style>
