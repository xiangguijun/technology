;!function(win){
  'use strict'
  // console.log(window)
  var doc = document, config = {
    modules: {},
    status: {},
    timeout: 10,
    event: {}
  },
  Layui = function(){
    this.v = '2.4.5';  // 版本号
  },

  // 获取当前js所在目录
  // document.scripts返回全部script的HTMLCollection对象,这个对象类似数组,但是并不是真正的数组
  getPath = function(){
    var jsPath = doc.currentScript? doc.currentScript.src : function(){
      var js = doc.scripts, last = js.length -1, src;
      for(var i = last; i > 0; i--){
        if(js[i].readyState === 'interactive'){
          src = js[i].src;
          break;
        }
      }
      return src || js[last].src;
    }();
    return jsPath.substring(0,jsPath.lastIndexOf('/') + 1);
  }(),

  // 异常提示
  error = function(msg){
    win.console && console.error && console.error('Layui hint: ' + msg);
  },
  
  // 是否为opera类型浏览器
  isOpera = typeof opera !=='undefined' && opera.toString() === '[object Opera]',

  //内置模块
  modules = {
    layer: 'modules/layer', // 弹层
    laydate: 'module/laydate', // 日期
    laypage: 'modules/laypage', //分页
    laytpl: 'modules/laytpl', //模板引擎
    layim: 'modules/layim', //web通讯
    layedit: 'modules/layedit', //富文本编辑器
    form: 'modules/form', //表单集
    upload: 'modules/upload', //上传
    tree: 'modules/tree', //树结构
    table: 'modules/table', //表格
    element: 'modules/element', //常用元素操作
    rate: 'modules/rate',  //评分组件
    colorpicker: 'modules/colorpicker', //颜色选择器
    slider: 'modules/slider', //滑块
    carousel: 'modules/carousel', //轮播
    flow: 'modules/flow', //流加载
    util: 'modules/util', //工具块
    code: 'modules/code', //代码修饰器
    jquery: 'modules/jquery', //DOM库（第三方)

    mobile: 'modules/mobile', //移动大模块
    'layui.all': '../layui.all' //PC模块合并版
  };

  //记录基础数据
  Layui.prototype.cache = config;

  //定义模块
  Layui.prototype.define = function(deps, factory){
    var that = this,              // this === Layui.prototype
    type = typeof deps === 'function',    //模块是否为一个函数队形
    callback = function(){
      var setApp = function(app, exports){
        layui[app] = exports;
        config.status[app] = true;
      };
      typeof factory === 'function' && factory(function(app, exports){
        setApp(app, exports);
        config.callback[app] = function(){
          factory(setApp)
        }
      });
      return this;
    };

    type && (factory = deps, deps = []);

    if(layui['layui.all'] || (!layui['layui.all'] && layui['layui.mobile'])){
      return callback.call(that)
    }

    that.use(deps, callback);
    return that;
  }


  Layui.prototype.define('', '')

  //console.log(config)

  win.layui = new Layui();
  //console.log(new Layui())
}(window)
