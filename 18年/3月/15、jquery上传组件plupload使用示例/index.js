var uploader = new plupload.Uploader({

    runtimes: 'html5,flash,silverlight,html4',//用来指定上传方式，指定多个上传方式请使用逗号隔开。
    browse_button: 'browse',//触发文件选择对话框的按钮，为那个元素id
    container: container, //用来指定Plupload所创建的html结构的父容器，默认为前面指定的browse_button的父元素。该参数的值可以是一个元素的id,也可以是DOM元素本身。
    max_file_size: '10mb',//最大上传文件
    url: url,//服务器端接收和处理上传文件的脚本地址，可以是相对路径(相对于当前调用Plupload的文档)，也可以是绝对路径

    flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
    filters: [{
        title: "Image files",
        extensions: "jpg,gif,png"
    }],

    init: {
        //当Init事件发生后触发
        PostInit: function () {

        },

        //绑定各种事件，并在事件监听函数中做你想做的事
        FilesAdded: function (up, files) {

        },
        //当队列中的某一个文件正要开始上传前触发
        BeforeUpload: function (up, file) {

        },
        //会在文件上传过程中不断触发，可以用此事件来显示上传进度
        UploadProgress: function (up, file) {


        },
        //当队列中的某一个文件上传完成后触发
        FileUploaded: function (up, file, info) {

            if (info.status === 200) {
                //success

            } else if (info.status === 203) {

                console.log(info);
            } else {

                console.log(info);
            }
            //上传完成 删除图片
            //下次点击才能上传
            uploader.removeFile(file);
        },
        //当发生错误时触发
        Error: function (up, err) {
            if (err.code === -600) {


            } else if (err.code === -601) {


            } else if (err.code === -602) {


            } else {


            }
        }
    }
});

uploader.start();//上传