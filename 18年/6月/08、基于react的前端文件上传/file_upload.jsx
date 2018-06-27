/**
 * 表单内文件展示与上传
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Icon, Spin, Modal, message} from 'antd';

import Upload from './qiniu_upload.jsx';
import FilePreview from './file_preview.jsx';
import {getUploadDownloadPath} from './common/tool';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadLoading: false
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    /**
     * 删除文件
     * @param index
     */
    handleDelete(index) {
        const {value, onChange} = this.props;
        Modal.confirm({
            'title': '是否确认删除该文件?',
            onOk() {
                if(Array.isArray(value)) {
                    let sendValue = value.filter((val, valInd) => {
                        return index !== valInd;
                    });
                    onChange(sendValue);
                }else {
                    onChange('');
                }
            }
        });
    }

    /**
     * 添加文件
     * @param info
     */
    handleOnChange(info) {
        const {onChange, value} = this.props;
        if(info.file.status === 'uploading') {
            this.setState({
                uploadLoading: true
            });
        }
        if(info.file.status === 'done') {
            message.success('上传文件成功');
            this.setState({
                uploadLoading: false
            });
            if(Array.isArray(value)) {
                let sendValue = value.concat([getUploadDownloadPath(info.file)]);
                onChange(sendValue);
            }else {
                onChange(getUploadDownloadPath(info.file));
            }
        }
        if(info.file.status === 'error') {
            message.error('上传文件失败');
            this.setState({
                uploadLoading: false
            });
        }
    }
    render() {
        const { value, preview } = this.props;
        const {uploadLoading} = this.state;
        let list = [];
        if(Array.isArray(value)) {
            list = value;
        }else if(value) {
            list = [value];
        }
        return (
            <Spin spinning={uploadLoading}>
                <div className="app-file-upload">
                    <div className="app-file-upload-preview">
                        {list.map((filePath, index) => {
                            return (
                                <div key={index} className="file-wrapper">
                                    <FilePreview path={filePath}>
                                        <a className='file-link' href={filePath} target='_blank' rel="noopener noreferrer">{/.(jpg|jpeg|png|gif)/i.test(filePath) ? <img src={filePath} /> : '非图片文件'}</a>
                                    </FilePreview>
                                    {!preview ? <Icon type="delete" className="delete-icon" onClick={() => this.handleDelete(index)} /> : null}
                                </div>
                            );
                        })}
                        {!preview ? <Upload
                            showUploadList={false}
                            onChange={this.handleOnChange}
                            multiple={Array.isArray(value) ? true : false}
                        >
                            <div className="app-file-upload-btn">
                                <Icon type="plus" />
                                <div className="ant-upload-text">上传文件</div>
                            </div>
                        </Upload> : null}
                    </div>
                </div>
            </Spin>
        );
    }
}

FileUpload.propTypes = {
    preview: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
};
export default FileUpload;