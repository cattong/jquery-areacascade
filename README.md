# jquery-areacascade
a jquery plugin for area cascade select


usage:

 var initSelectedVals = ["", "",""];
 $('select[name=province_code]').areacascade({
     'selectors': ['select[name=province_code]', 'select[name=city_code]', 'select[name=district_code'],
     'dataUrl': "{:url('DataQuery/areas')}",
     'paramName': 'areaCode',
     'initVal': '0',
     'initRequest': true,
     'initSelectedVals': initSelectedVals,
 });
