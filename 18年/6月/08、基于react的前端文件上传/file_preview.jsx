/**
 * 文件预览组件
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf/build/entry.noworker';

import { Modal } from 'antd';

import {log} from './common/tool';

//封装组件
class FilePreview extends Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDocumentLoad = this.handleDocumentLoad.bind(this);
        this.state = {
            modal: false,
            numPages: null
        };
    }
    render() {
        const {modal, numPages} = this.state;
        const {path, children} = this.props;
        const match = path.toLowerCase().match(/.(pdf|jpg|jpeg|png|gif)/);
        const suffix = match ? match[1] : '';
        switch(suffix) {
        case 'pdf':
            return (
                <div className="app-file-preview">
                    <div onClick={(e)=>{
                        e.preventDefault();
                        this.setState({
                            modal: true
                        });
                    }}>
                        {children}
                    </div>
                    <Modal
                        title="PDF预览"
                        style={{ top: 10 }}
                        width={800}
                        visible={modal}
                        footer={null}
                        onCancel={this.handleCloseModal}
                    >
                        <div className="app-pdf">
                            <div className="app-pdf-container">
                                <div className="app-pdf-container-document">
                                    <Document
                                        error="载入PDF文件错误"
                                        loading="载入PDF文件中,请稍后"
                                        file={'/file/?path=' + encodeURIComponent(path)}
                                        onLoadSuccess={this.handleDocumentLoad}
                                        onLoadError={log.info}
                                    >
                                        {
                                            Array.from(
                                                new Array(numPages),
                                                (el, index) => (
                                                    <Page
                                                        key={`page_${index + 1}`}
                                                        pageNumber={index + 1}
                                                        onRenderSuccess={this.onPageRenderSuccess}
                                                        width={Math.min(600, document.body.clientWidth - 52)}
                                                    />
                                                )
                                            )
                                        }
                                    </Document>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gift':
            return (
                <div className="app-file-preview">
                    <div onClick={(e)=>{
                        e.preventDefault();
                        this.setState({
                            modal: true
                        });
                    }}>
                        {children}
                    </div>
                    <Modal
                        title="图片预览"
                        visible={modal}
                        footer={null}
                        width="90%"
                        onCancel={this.handleCloseModal}
                    >
                        <div className="app-file-preview-modal-image">
                            <a href={path} target="_blank" rel="noopener noreferrer"><img src={path} /></a>
                        </div>
                    </Modal>
                </div>
            );
        default:
            return (
                <div className="app-file-preview">
                    {children}
                </div>
            );
        }
    }
    handleDocumentLoad({ numPages }) {
        this.setState({ numPages });
    }
    handleCloseModal() {
        this.setState({
            modal: false
        });
    }
}

FilePreview.propTypes = {
    path: PropTypes.string.isRequired, // 文件路径
    children: PropTypes.object.isRequired // 文件子菜单
};

export default FilePreview;