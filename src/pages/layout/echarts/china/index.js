// import * as echarts from 'echarts/core';
// import { MapChart } from 'echarts/charts';
// import { useEffect, useRef, useState } from 'react';
// import { Button } from 'antd';
// const ChinaMap = ()=>{
//     const ref = useRef(null);
//     const [map,setMap] = useState({})
//     const [opts,setOpts] = useState({})
//     let mapInstance = null;
//     const [district,setDistrict] = useState() 
//     const [polygons,setPolygons] = useState([]) 
//     const [chinaMapData,setChinaMapData] = useState([]) 
//     const [cityName,setCityName] = useState('中国');
//     const {cityCode,setCityCode} = useState('100000')
//     const [geoJsonData,setGeoJsonData] = useState('') 
//     const [echartsClickParamsList,setEchartsClickParamsList] = useState([]) 
//     const [mapLoading,setMapLoading] = useState(false);

//     function getData(data, adcode) {
//         setMapLoading(true)
//         const bounds = data.boundaries;
//         // const name = data.name;
//         if (bounds) {
//           for (let i = 0, l = bounds.length; i < l; i++) {
//             // @ts-ignore
//             const polygon = new window.AMap.Polygon({
//               map: map,
//               strokeWeight: 1,
//               strokeColor: '#0091ea',
//               fillColor: '#80d8ff',
//               fillOpacity: 0.2,
//               path: bounds[i],
//             });
//             setPolygons(polygon,...polygons)
//           }
//           map.setFitView();
//         }

//         const subList = data.districtList;
//         if (subList) {
//           // if (name === '上海市' || name === '北京市' || name === '天津市' || name === '重庆市') {
//           //   console.log('直辖市');
//           // } else {
//           // }
//           const curLevel = subList[0].level;
//           if (curLevel === 'street') {
//             const mapJsonList = geoJsonData.features;
//             const mapJson = {} ;
//             for (let i in mapJsonList) {
//               if (mapJsonList[i].properties.name === cityName) {
//                 mapJson.type = 'FeatureCollection';
//                 mapJson.features = [].concat(mapJsonList[i]);
//               }
//             }
//             setChinaMapData ([])
//             setChinaMapData({
//                 name: cityName,
//                 value: Math.random() * 100,
//                 level: curLevel,
//               },...chinaMapData)
//             loadMap(cityName, mapJson);
//             return;
//           }
//           setChinaMapData ([])
//           for (let i = 0, l = subList.length; i < l; i++) {
//             const name = subList[i].name;
//             const cityCode = subList[i].adcode;
//             setChinaMapData({
//                 name: name,
//               value: Math.random() * 100,
//               cityCode: cityCode,
//               level: curLevel,
//               },...chinaMapData)
           
//           }
//           loadMapData(adcode);
//         }
//       }
//       function loadMap(mapName, data) {
//         if (data) {
//         mapInstance = echarts.init(ref.current);
//           echarts.registerMap(mapName, data);
//           mapInstance.setOption({
//             visualMap: [
//               {
//                 min: 0,
//                 max: 100,
//                 left: 'left',
//                 top: 'bottom',
//                 text: ['高', '低'],
//                 calculable: false,
//                 orient: 'horizontal',
//                 inRange: {
//                   color: ['#e0ffff', '#006edd'],
//                   symbolSize: [30, 100],
//                 },
//               },
//             ],
//             tooltip: {
//               trigger: 'item',
//               backgroundColor: 'rgba(0, 0, 0, .6)',
//               textStyle: {
//                 color: '#fff',
//                 fontSize: 12,
//               },
//             },
//             series: [
//               {
//                 name: '总数',
//                 type: 'map',
//                 map: cityName,
//                 selectedMode: 'single',
//                 itemStyle: {
//                   areaColor: '#2f82ce',
//                   borderColor: '#0DAAC1',
//                 },
//                 zoom: 1.2,
//                 data: chinaMapData,
//               },
//             ],
//           });
//         }
//         setMapLoading(false)
//       }

//       function loadMapData(areaCode) {
//         // @ts-ignore
//         window.AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
//           //创建一个实例
//           // @ts-ignore
//           const districtExplorer = (window.districtExplorer = new DistrictExplorer({
//             eventSupport: true, //打开事件支持
//             map: map,
//           }));

//           districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
//             if (error) {
//               console.error(error);
//               return;
//             }
//             const mapJson = {} ;
//             mapJson.type = 'FeatureCollection';
//             mapJson.features = areaNode.getSubFeatures();
//             loadMap(cityName, mapJson);
//             setGeoJsonData(mapJson);
//           });
//         });
//       }
//       function handleBack() {
//         if (mapLoading) return;
//         if (echartsClickParamsList.length === 0) {
//           return;
//         } else {
//             const params = echartsClickParamsList.slice(0,-1)
//             setEchartsClickParamsList(echartsClickParamsList.slice(0,-1))
//           if (!params) {
//             showChinaMap();
//           } else {
//             echartsMapClick(params);
//           }
//         }
//       }
//       function echartsMapClick(params) {
//         if (
//           (echartsClickParamsList[0] &&
//             (echartsClickParamsList[0].name === '上海市' ||
//               echartsClickParamsList[0].name === '北京市' ||
//               echartsClickParamsList[0].name === '重庆市' ||
//               echartsClickParamsList[0].name === '天津市')) ||
//           mapLoading ||
//           params.data.level === 'street'
//         ) {
//           return;
//         }
//         //清除地图上所有覆盖物
//         for (let i = 0, l = polygons.length; i < l; i++) {
//           polygons[i].setMap(null);
//         }
//         setEchartsClickParamsList(params,...echartsClickParamsList)
//         setCityName(params.data.name);
//         setCityCode(params.data.cityCode)
//         district.setLevel(params.data.level); //行政区级别
//         district.setExtensions('all');

//         //行政区查询
//         //按照adcode进行查询可以保证数据返回的唯一性
//         district.search(cityCode, (status, result) => {
//           console.log(result);
//           if (status === 'complete') {
//             getData(result.districtList[0], cityCode);
//           }
//         });
//       }
//       function showChinaMap() {
//         // @ts-ignore
//         setMap(new window.AMap.Map('container', {
//             resizeEnable: true,
//             center: [116.30946, 39.937629],
//             zoom: 3,
//           })) 

//         setOpts({
//             subdistrict: 1, //返回下一级行政区
//             showbiz: false, //最后一级返回街道信息
//           })
//         // @ts-ignore
//         setDistrict(new window.AMap.DistrictSearch(opts))
//         console.log(new window.AMap.DistrictSearch(opts));
//         district.search('中国', (status, result) => {
//           if (status == 'complete') {
//             getData(result.districtList[0], '100000');
//           }
//         });
//       }

//     const renderChart = () => {
//         console.log(window);
//       // 基于准备好的dom，初始化echarts实例
  
  

//     };
//     useEffect(() => {
//       renderChart();

//         showChinaMap()
//     }, [chinaMapData]);
    

    
//     return (
//       <div>
//         <Button type='primary' onClick={()=>handleBack()}>返回</Button>
//         <div style={{ width: "90%", height: "85vh" }} ref={ref}></div>
//       </div>
//     );
// }
const ChinaMap = ()=>{
  return <>
  chinaMap</>
}
export default ChinaMap