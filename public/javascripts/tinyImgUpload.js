/**
 * tinyImgUpload
 * @param ele [string] [生成组件的元素的选择器]
 * @param options [Object] [对组件设置的基本参数]
 * options具体参数如下
 * path 图片上传的地址路径 必需
 * onSuccess(res) 文件上传成功后的回调 参数为返回的文本 必需
 * onFailure(res) 文件上传失败后的回调 参数为返回的文本 必需
 * @return [function] [执行图片上传的函数]
 * 调用方法
 * tinyImgUpload('div', options)
 */

function tinyImgUpload(ele, options) {
    // 判断容器元素合理性并且添加基础元素
    var eleList = document.querySelectorAll(ele);
    if(eleList.length == 0){
        console.log('绑定的元素不存在');
        return;
    }else if(eleList.length>1){
        console.log('请绑定唯一元素');
        return;
    }else {
        eleList[0].innerHTML ='<div id="img-container" >'+
                '<div class="img-up-add  img-item"> <span class="img-add-icon">+</span> </div>'+
                '<input type="file" name="files" id="img-file-input" multiple>'+
                '</div>';
        var ele = eleList[0].querySelector('#img-container');
        ele.files = [];   // 当前上传的文件数组
    }

    // 为添加按钮绑定点击事件，设置选择图片的功能
    var addBtn = document.querySelector('.img-up-add');
    addBtn.addEventListener('click',function () {
        document.querySelector('#img-file-input').value = null;
        document.querySelector('#img-file-input').click();
        return false;
    },false)

    // 预览图片
    //处理input选择的图片
    function handleFileSelect(evt) {
        var files = evt.target.files;

        for(var i=0, f; f=files[i];i++){
            // 过滤掉非图片类型文件
            if(!f.type.match('image.*')){
                continue;
            }
            // 过滤掉重复上传的图片
            var tip = false;
            for(var j=0; j<(ele.files).length; j++){
                if((ele.files)[j].name == f.name){
                    tip = true;
                    break;
                }
            }
            if(!tip){
                // 图片文件绑定到容器元素上
                // console.log(options.imgNum);
                if($('#img-container').children().length>options.imgNum+1){
                  alert('no');
                }
                else{
                  ele.files.push(f);

                  var reader = new FileReader();
                  reader.onload = (function (theFile) {
                      return function (e) {
                          var oDiv = document.createElement('div');
                          oDiv.className = 'img-thumb img-item';
                          // 向图片容器里添加元素
                          oDiv.innerHTML = '<img class="thumb-icon" src="'+e.target.result+'" />'+
                                          '<a href="javscript:;" class="img-remove">x</a>'

                          ele.insertBefore(oDiv, addBtn);
                      };
                  })(f);

                  reader.readAsDataURL(f);
                }


            }
        }
    }
    document.querySelector('#img-file-input').addEventListener('change', handleFileSelect, false);

    // 删除图片
    function removeImg(evt) {
        if(evt.target.className.match(/img-remove/)){
            console.log('3',ele.files);
            // 获取删除的节点的索引
            function getIndex(ele){

                if(ele && ele.nodeType && ele.nodeType == 1) {
                    var oParent = ele.parentNode;
                    var oChilds = oParent.children;
                    for(var i = 0; i < oChilds.length; i++){
                        if(oChilds[i] == ele)
                            return i;
                    }
                }else {
                    return -1;
                }
            }
            // 根据索引删除指定的文件对象
            var index = getIndex(evt.target.parentNode);
            ele.removeChild(evt.target.parentNode);
            if(index < 0){
                return;
            }else {
                ele.files.splice(index, 1);
            }
            console.log('4',ele.files);
        }
    }
    ele.addEventListener('click', removeImg, false);

    // 上传图片
    function uploadImg() {
        // console.log(ele.files);

        var formData = new FormData();

        // console.log($("input[name='cname']").val());


        formData.append('cname', $("input[name='cname']").val());
        formData.append('cprice', $("input[name='cprice']").val());
        formData.append('id', Date.now());
        for(var i=0, f; f=ele.files[i]; i++){//遍历文件
            formData.append('upload', f);//压入
            formData.append('imgIndex', i);

            $.ajax({        //使用Ajax进行数据传送
                url: options.path,
                type: 'POST',
                data: formData,
                cache: false,
                async:false, //异步ajax进行处理
                contentType: false, //不可缺参数
                processData: false, //不可缺参数
                success: function(data) {
                    console.log(data);
                },
                error: function() {
                    console.log('error');
                }
            });

            formData.delete('upload', f);//删除文件 避免重复上传
            formData.delete('imgIndex', i);
            // formData.delete('imgIndex', i);

        }


    }
    return uploadImg;
}
