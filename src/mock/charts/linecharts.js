import Mock from 'mockjs2'
import { builder } from '../util'

var Random = Mock.Random
Random.extend({
  constellation: function (date) {
    var constellations = [
      '白羊座',
      '金牛座',
      '双子座',
      '巨蟹座',
      '狮子座',
      '处女座',
      '天秤座',
      '天蝎座',
      '射手座',
      '摩羯座',
      '水瓶座',
      '双鱼座'
    ]
    return this.pick(constellations)
  },
  number: function () {
    var number = Random.natural(60, 100)
    return this.pick(number)
  }
})
Random.natural(10, 100)
var data = Mock.mock({
  'data|8': [
    {
      name: '@CONSTELLATION',
      value: '@number'
    }
  ]
})
console.log('mock数据-------', data)
const lineData = () => {
  return builder(data)
}

Mock.mock(/\/lineData/, 'get', lineData)
