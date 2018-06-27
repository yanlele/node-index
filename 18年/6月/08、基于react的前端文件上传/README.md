# 基于react - antd的前端文件上传(七牛云)

[主入口文件](./file_upload.jsx)

- 依赖组件
    - [qiniu_upload: 上传核心代码](./qiniu_upload.jsx)
    - [file_preview: 图片回显功能](./file_preview.jsx)
    
    

使用示范：               
```jsx harmony
<FormItem
    validateStatus={filesError ? 'error' : ''}
    help={filesError || (
        <p className="m-b">格式:jpg/png/pdf/word/zip.最多可上传10个附件. </p>
    )}
    label='附件'
    {...formItemLayoutLg}
    >
    {getFieldDecorator('files', {
        rules: [{
            type: 'array',
            validator: function(rule, value, cb) {
                if(value && value.length > 10) return cb('超过10个附件');
                cb();
            },
            message: '请上传附件!最多可上传10个附件.'
        }],
        initialValue: defaultValue.files || []
    })(
        <FileUpload />
    )}
</FormItem>
```