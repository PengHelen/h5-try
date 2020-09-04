<template>
  <div>
    <div class="verification">
      <div class="value">
        <a-input id="code_input" size="large" autocomplete="off"></a-input>
      </div>
      <div class="images" @click="getCode()" :style="{width:width+'px',height:height+'px'}">
        <canvas id="imgs_cavanas" :width="width" :height="height"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageCaptcha',
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 30
    },
  },
  data () {
    return {
      imgsArr: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCode()
    })
  },
  methods: {
    // 获取产生的图片验证码
    getCode () {
      this.draw(this.imgsArr)
    },
    // 使用canvas产生图片验证码
    draw (showCodeArr) {
      let box_width = this.width
      let box_height = this.height
      let canvas = document.getElementById('imgs_cavanas')
      // 描绘图片容器
      let context = canvas.getContext('2d')
      canvas.width = box_width
      canvas.height = box_height
      // 产生随机字符串原始字符串和数组
      let codeStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9"
      let codeArr = codeStr.split(",")
      let codeArrLength = codeArr.length
      for (let i = 0; i < 4; i++) {
        let j = Math.floor(Math.random() * codeArrLength)
        let deg = Math.random() - 0.5
        var txt = codeArr[j]
        showCodeArr[i] = txt.toLowerCase()
        // 文字在canvas上的坐标
        var x = 10 + i * 20
        var y = 20 + Math.random() * 8
        context.font = "bold 24px 微软雅黑"
        context.translate(x, y)
        context.rotate(deg)
        context.fillStyle = this.getrandomColor()
        context.fillText(txt, 0, 0)
        context.rotate(-deg)
        context.translate(-x, -y)
      }
      // 验证码上显示线条(干扰)
      for (let i = 0; i <= 5; i++) {
        context.strokeStyle = this.getrandomColor()
        context.beginPath();
        context.moveTo(Math.random() * box_width, Math.random() * box_height)
        context.lineTo(Math.random() * box_width, Math.random() * box_height)
        context.stroke()
      }
      // 验证码上显示小点(干扰)
      for (let i = 0; i <= 30; i++) {
        context.strokeStyle = this.getrandomColor()
        context.beginPath()
        var x = Math.random() * box_width
        var y = Math.random() * box_height
        context.moveTo(x, y)
        context.lineTo(x + 1, y + 1)
        context.stroke()
      }
    },
    // 获取随机颜色
    getrandomColor () {
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      return `rgb(${r},${g},${b})`
    },
    // 校验input框输入的验证码
    checkInput () {
      let value = document.getElementById("code_input").value.toLowerCase()
      let img_value = this.imgsArr.join("")
      if (value == "" || value == undefined) {

        return -1
      } else if (value == img_value) {
        return 1
      } else {
        return 0
      }
    }
    // 引用说明
    // dom：
    // <image-captcha ref="imageCaptcha" :width="100" :height="38"></image-captcha>
    // 引用页面引入组件：
    // import ImageCaptcha from '@xxx'
    // components: {ImageCaptcha},
  }
}
</script>
<style lang="less" scoped>
.verification {
  display: flex;
  flex-direction: row;
  .images {
    margin-left: 16px;
    cursor: pointer;
    background: #ffffff;
  }
  .value {
    flex-grow: 1;
  }
}
</style>