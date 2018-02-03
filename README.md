# jquery-areacascade
a jquery plugin for area cascade select
动态级联下拉jquery插件；

## usage使用方法:

```
//级联下拉初始化值
 var initSelectedVals = ["", "",""];
 $('select[name=province_code]').areacascade({
     'selectors': ['select[name=province_code]', 'select[name=city_code]', 'select[name=district_code'], //下拉选择器数组
     'dataUrl': "{:url('DataQuery/areas')}", //ajax 请求地址
     'paramName': 'areaCode', //ajax请求参数
     'initVal': '0', //第一级联请求值 
     'initRequest': true, //第一级联是否初始化请求
     'initSelectedVals': initSelectedVals, //级联下拉初始值
 });
```
