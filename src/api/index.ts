import axios from '@/utils/axios'
import AMapLoader from '@amap/amap-jsapi-loader'

export const getViewData = () => axios.get('/bilibili-api/x/web-interface/view')

/**
 * 获取高德引入结果
 */
export const getAMapData = () => {
  return AMapLoader.load({
    key: '7243d2aa043b480d7b4808c9fd90d78b', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '1.4.15' // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  })
}

export const getAIData = () => axios.get('/ai-api?key=free&appid=0&msg=你好')
