// 定义一些常量
let x_PI = (3.14159265358979324 * 3000.0) / 180.0
let PI = 3.1415926535897932384626
let a = 6378245.0
let ee = 0.00669342162296594323

/**
 * 经度转换
 */
export const transformLng = (lng: number, lat: number): number => {
  let ret =
    300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0
  ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0
  return ret
}

/**
 * 纬度转换
 */
export const transformLat = (lng: number, lat: number): number => {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0
  ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0
  return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 */
export const outOfChina = (lng: number, lat: number): boolean => {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
}

/**
 * WGS84转GCj02(GPS转高德)
 */
export const wgs84ToGcj02 = (lng: number, lat: number): number[] => {
  lng = Number(lng)
  lat = Number(lat)
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  } else {
    let dlat = transformLat(lng - 105.0, lat - 35.0)
    let dlng = transformLng(lng - 105.0, lat - 35.0)
    let radlat = (lat / 180.0) * PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    let sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
    let mglat = lat + dlat
    let mglng = lng + dlng
    return [mglng, mglat]
  }
}

/**
 * WGS84转BD-09
 * GPS转百度
 */
export const wgs84ToBd09 = (lng: number, lat: number): number[] => {
  const gcj02 = wgs84ToGcj02(lng, lat)
  const result = gcj02ToBd09(gcj02[0], gcj02[1])
  return result
}

/**
 * 百度坐标系(BD-09)与火星坐标系(GCJ-02)的转换(百度转谷歌、高德)
 */
export const bd09ToGcj02 = (lng: number, lat: number): number[] => {
  let x = lng - 0.0065
  let y = lat - 0.006
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI)
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI)
  let gg_lng = z * Math.cos(theta)
  let gg_lat = z * Math.sin(theta)
  return [gg_lng, gg_lat]
}

/**
 * 百度坐标系(BD-09)与WGS84(百度转谷歌、高德)
 */
export const bd09ToWgs84 = (lng: number, lat: number): number[] => {
  const gcj02 = bd09ToGcj02(lng, lat)
  const result = gcj02ToWgs84(gcj02[0], gcj02[1])
  return result
}

/**
 * 火星坐标系(GCJ-02)与百度坐标系(BD-09)的转换(谷歌、高德转百度)
 */
export const gcj02ToBd09 = (lng: number, lat: number): number[] => {
  let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI)
  let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI)
  let bd_lng = z * Math.cos(theta) + 0.0065
  let bd_lat = z * Math.sin(theta) + 0.006
  return [bd_lng, bd_lat]
}

/**
 * GCJ02转换为WGS84(高德转换成GPS)
 */
export const gcj02ToWgs84 = (lng: number, lat: number): number[] => {
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  } else {
    let dlat = transformLat(lng - 105.0, lat - 35.0)
    let dlng = transformLng(lng - 105.0, lat - 35.0)
    let radlat = (lat / 180.0) * PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    let sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
    let mglat = lat + dlat
    let mglng = lng + dlng
    return [lng * 2 - mglng, lat * 2 - mglat]
  }
}

/**
 * 计算非规则图形的中点
 */
interface coordinate {
  lng: number
  lat: number
}
export const calculatePolygonGravityCenter = (coordinates: Array<coordinate>) => {
  let area = 0.0 // 多边形面积
  let gravityLat = 0.0 // 重心点 latitude
  let gravityLng = 0.0 // 重心点 longitude
  let count = coordinates.length
  for (let index = 0; index < count; index++) {
    // 1
    let lat = coordinates[index].lat
    let lng = coordinates[index].lng
    let nextLat = coordinates[(index + 1) % count].lat
    let nextLng = coordinates[(index + 1) % count].lng
    // 2
    let tempArea = (nextLat * lng - nextLng * lat) / 2.0
    // 3
    area += tempArea
    // 4
    gravityLat += (tempArea * (lat + nextLat)) / 3
    gravityLng += (tempArea * (lng + nextLng)) / 3
  }
  // 5
  gravityLat = gravityLat / area
  gravityLng = gravityLng / area

  return {
    lng: gravityLng,
    lat: gravityLat
  }
}

/**
 * 高德地址
 */
export const customGetAddress = (
  AMap: any,
  lng: string | number,
  lat: string | number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geocoder', () => {
      new AMap.Geocoder().getAddress([lng, lat], (status: string, result: any) => {
        if (status === 'complete' && result.info === 'OK') {
          const address = result.regeocode.formattedAddress
          resolve(address)
        } else {
          reject(null)
        }
      })
    })
  })
}
