/**
 * Created by cattong on 2018-01-23.
 */

(function ($) {

    var AreaCascade = function(element, options){
        this._options = options;
        this._element = element;
        this._initSelectedState = [true, true, true];
        //console.log(options);
        this.init();
    };

    //支持三级
    AreaCascade.prototype.init = function() {
        var selectors = this._options['selectors'];
        //console.log(selectors);
        var selector1 = selectors[0];
        var selector2 = selectors[1];
        var selector3 = selectors[2];

        var dataUrl = this._options['dataUrl'];
        var paramName = this._options['paramName'];
        var initSelectedVals = this._options['initSelectedVals'];
        if (initSelectedVals) {
            for (var i=0; i<initSelectedVals.length; i++) {
                if (initSelectedVals[i] == '') {
                    this._initSelectedState[i] = true;
                } else {
                    this._initSelectedState[i] = false;
                }
            }
        }

        var _this = this;
        $(selector1).change(function () {
            //$(selector2).empty();
            //$(selector3).empty();

            _this.toggleFun(selector1, selector2);

        });

        $(selector2).change(function (e) {
            //$(selector3).empty();

            _this.toggleFun(selector2, selector3);
        });

        var initRequest = this._options['initRequest'];
        var initVal = this._options['initVal'];
        if (initRequest) {
            var datas = {format: 'raw'};
            datas[paramName] = initVal;
            //var datas = {paramName: selectorVal, format: 'raw'}; //key参数无效
            $.getJSON(dataUrl,  datas, function(data) {

                if (data.code != 1) {
                    swal('查询失败', data.msg, 'error');
                    return;
                }

                var list = data.data;

                $(selector1).empty();
                $("<option></option>").val("-1").text("请选择").appendTo($(selector1));
                $.each(list, function(i, item) {
                    $("<option></option>").val(item['area_code']).text(item['area_name']).appendTo($(selector1));
                });

                //确实是否进行值选中
                if (!_this._initSelectedState[0]) {
                    $(selector1).val(initSelectedVals[0]).trigger('change');
                    _this._initSelectedState[0] = true;
                }
            });
        }
    };

    AreaCascade.prototype.toggleFun = function(selector1, selector2) {
        var _this = this;
        var dataUrl = this._options['dataUrl'];
        var paramName = this._options['paramName'];
        var selectors = this._options['selectors'];
        var initSelectedVals = this._options['initSelectedVals'];

        var arrIndex = selectors.indexOf(selector2);
        var selectorVal = $(selector1 + " option:selected").val();
        //console.log('select val:' + selectorVal);
        $(selector2).empty();

        var datas = {format: 'raw'};
        datas[paramName] = selectorVal;
        $.getJSON(dataUrl,  datas, function(data) {
            if (data.code != 1) {
                swal('查询失败', data.msg, 'error');
                return;
            }

            var list = data.data;

            $("<option></option>").val("-1").text("请选择").appendTo($(selector2));
            $.each(list, function(i, item) {
                $("<option></option>").val(item['area_code']).text(item['area_name']).appendTo($(selector2));
            });

            //确实是否进行值选中
            if (!_this._initSelectedState[arrIndex]) {
                $(selector2).val(initSelectedVals[arrIndex]);
                $(selector2).trigger('change');
                _this._initSelectedState[arrIndex] = true;
            }
        });
    }

    /**
     * {
     *  'selectors', 级别选择器数组
     *  'dataUrl',  数据更新请求地址
     *  'paramName', 请求参数名
     *  'initValue', 初始化数据
     *  'initRequest', 初始化是否做请求
     * }
     */
    $.fn.areacascade = function(option) {
        var $this, data;
        $this = $(this);
        data = $this.data('areacascade');
        var options = typeof option === 'object' && option;
        // 如果没有初始化过, 就初始化它
        if (!data) $this.data('areacascade', (data = new AreaCascade(this, options)));
        if (option == 'toggle') {
            data.toggle();
        } else {
           //(option) data.setState(option);
        }

    }

})(window.jQuery);
