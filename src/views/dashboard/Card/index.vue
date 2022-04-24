<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail :title="'总销售额'" count="￥126562">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp; 56.67% </span>
              <span>
                <svg t="1650789158539" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6963" width="16" height="16" style="vertical-align: middle">
                  <path
                    d="M420.864 448.512l-164.864 140.288 0-187.392 185.344-162.816 7.168 8.192 164.864 193.536 197.632-205.824-106.496-105.472 317.44-2.048 0 315.392-107.52-105.472-313.344 326.656-3.072-7.168zM928.768 703.488q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-832.512 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-641.024q0-19.456 7.68-36.864t20.48-30.208 30.208-20.48 37.888-7.68q19.456 0 37.376 7.68t30.72 20.48 20.48 30.208 7.68 36.864l0 481.28 4.096 0-4.096 3.072 0 60.416 736.256 0z"
                    p-id="6964"
                    fill="#d81e06"
                  />
                </svg>
              </span>
              <span>&nbsp;&nbsp;日同比&nbsp;&nbsp; 12.55% </span>
              <span>
                <svg t="1650789253980" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7667" width="16" height="16" style="vertical-align: middle">
                  <path
                    d="M256 366.592l0-187.392 164.864 139.264 179.2-209.92 1.024-3.072 1.024 1.024 1.024-1.024 9.216 11.264 308.224 308.224 101.376-100.352 0 316.416-317.44-3.072 111.616-109.568-201.728-202.752-165.888 194.56-7.168 9.216 0-1.024zM928.768 704.512q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-832.512 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-641.024q0-19.456 7.68-36.864t20.48-30.208 30.208-20.48 37.888-7.68q19.456 0 36.864 7.168t30.208 19.968 20.992 29.696 8.192 36.352l0 546.816 736.256 0z"
                    p-id="7668"
                    fill="#1afa29"
                  />
                </svg>
              </span>
            </template>
            <template slot="footer">
              <span>日销售额 ￥255820</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail :title="'访问量'" count="889640">
            <template slot="charts">
              <lineChart></lineChart>
            </template>
            <template slot="footer">
              <span>日访问量 12250</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail :title="'支付笔数'" count="88460">
            <template slot="charts">
              <barChart></barChart>
            </template>
            <template slot="footer">
              <span>日支付笔数 150</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail :title="'运营活动效果'" count="78%">
            <template slot="charts">
              <progressCharts></progressCharts>
            </template>
            <template slot="footer">
              <span>转化率 55%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressCharts from './progressCharts'
export default {
  name: 'Card',
  components: {
    Detail,
    lineChart,
    barChart,
    progressCharts
  }
}
</script>

<style></style>
