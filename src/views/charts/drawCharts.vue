<template>
  <div>
    <div>折线图</div>
    <div ref="line" :style="{width:'1000px',height:'400px'}"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      xData: [],
      yData: []
    }
  },
  created () {
    this.getLineData()
  },
  computed: {
    lineOption () {
      let that = this
      let lineOption = {
        xAxis: {
          type: 'category',
          data: that.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: that.yData,
            type: 'line'
          },
          {
            data: that.yData,
            type: 'bar',
            itemStyle: {
              width: '30%'
            }
          }
        ],
      }
      return lineOption;
    },

  },
  methods: {
    getLineData () {
      this.$http.get('/lineData')
        .then(res => {
          console.log('获得数据-------', res)
          res.result.data.forEach(element => {
            this.xData.push(element.name)
            this.yData.push(element.value)
          });
          this.drawLine()
        })
    },
    drawLine () {
      let lineChart = echarts.init(this.$refs.line)
      lineChart.setOption(this.lineOption)
    }
  }
}
</script>
<style lang="less" scoped>
</style>