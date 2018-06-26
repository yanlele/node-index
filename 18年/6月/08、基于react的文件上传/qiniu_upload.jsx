import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Upload, message } from 'antd';

import {getUploadToken, uploadUrl} from './common/tool';

const excludeProps = ['beforeUpload', 'qiniuOpt'];

//封装组件
class QiuniuUpload extends Component {
    constructor(props) {
        super(props);
        this.handleBeforeUpload = this.handleBeforeUpload.bind(this);
        this.handleGetData = this.handleGetData.bind(this);
    }
    render() {
        const props = this.props;
        let newProps = {};
        Object.keys(props).forEach(function(key) {
            if(excludeProps.indexOf(key) < 0) newProps[key] = props[key];
        });
        return (
            <Upload
                action={uploadUrl}
                data={this.handleGetData}
                beforeUpload={this.handleBeforeUpload}
                {...newProps}
            />
        );
    }
    handleBeforeUpload(file, fileList) {
        const {qiniuOpt, beforeUpload} = this.props;
        let uploadPromise = true;
        // 是否有前置函数
        if(beforeUpload) uploadPromise = beforeUpload(file, fileList);
        if(typeof uploadPromise !== 'function') {
            if(uploadPromise) uploadPromise = Promise.resolve();
            else uploadPromise = Promise.reject();
        }
        return uploadPromise.then(function() {
            return getUploadToken(file, qiniuOpt);
        })
            .then((data) => {
                if(data.success) {
                    const fileInfo = data.data[0];
                    // 写入信息到文件对象中
                    file.qiniu = {
                        'key': fileInfo.key,
                        'domainName': fileInfo.domainName,
                        'token': fileInfo.token
                    };
                    return Promise.resolve();
                }
                message.error(data.description);
                return Promise.reject(new Error(data.description));
            }).catch(function(err) {
                message.error(err.message);
                return Promise.reject(err);
            });
    }
    handleGetData(file) {
        // 获取文件对象中的key
        return {
            token: file.qiniu.token,
            key: file.qiniu.key
        };
    }
}

QiuniuUpload.propTypes = {
    beforeUpload: PropTypes.func,
    qiniuOpt: PropTypes.object
};

export default QiuniuUpload;