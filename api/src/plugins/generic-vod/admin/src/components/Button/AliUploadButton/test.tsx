// import React, {Component} from 'react';
// import {Button, Col, Form, Icon, Input, message, Modal, Row, Select, Switch, Upload} from 'antd';
// import {
//   loadServiceCourseDataSet,
//   loadUploadVideoAuth,
//   reloadUploadVideoAuth,
//   updateServiceCourseItem
// } from '../../../service/course';
// import LazyLoad from 'react-lazy-load';
//
// const FormItem = Form.Item;
//
// // 创建 上传实例 变量，多次尝试后放在这里才靠谱
// var uploader;
//
// class Update extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fileList: [],
//       aliVideoAuthDto: {
//         requestId: '',
//         uploadAddress: '',
//         uploadAuth: '',
//         videoId: ''
//       },
//       upload_progress: ''
//     }
//   }
//
//   componentDidMount() {
//
//     let _this = this;
//
//     uploader = new VODUpload({
//       // 文件上传失败
//       'onUploadFailed': function (uploadInfo, code, message) {
//         message.fail('上传失败，请稍后再试');
//         //console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
//       },
//       // 文件上传完成
//       'onUploadSucceed': function (uploadInfo) {
//         _this.setState({uploading: false})
//         message.success('上传成功');
//         //console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
//       },
//       // 文件上传进度
//       'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
//         //console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(uploadedSize * 100 / totalSize) + "%");
//         _this.setState({upload_progress: Math.ceil(uploadedSize * 100 / totalSize) + "%"})
//       },
//       // STS临时账号会过期，过期时触发函数
//       'onUploadTokenExpired': function () {
//         message.success('上传凭证过期，请重试');
//         //console.log("onUploadTokenExpired");
//       },
//       // 开始上传
//       'onUploadstarted': function (uploadInfo) {
//         _this.setState({uploading: true});
//         uploader.setUploadAuthAndAddress(uploadInfo, _this.state.aliVideoAuthDto.uploadAuth, _this.state.aliVideoAuthDto.uploadAddress);
//       }
//     });
//     uploader.init();
//   }
//
//   normFile = (e) => {
//     console.log('Upload event:', e);
//     if (Array.isArray(e)) {
//       return e.file;
//     }
//     return e && e.fileList;
//   }
//
//   doUpload = () => {
//     console.log('start');
//     uploader.startUpload();
//   };
//
//   render() {
//     const {getFieldDecorator} = this.props.form;
//
//     const formItemLayout = {
//       labelCol: {
//         xs: {span: 24},
//         sm: {span: 4},
//       },
//       wrapperCol: {
//         xs: {span: 24},
//         sm: {span: 18},
//       },
//     };
//
//     const uploadProps = {
//       action: '//jsonplaceholder.typicode.com/posts/',
//       onRemove: (file) => {
//         this.setState(({fileList}) => {
//           const index = fileList.indexOf(file);
//           const newFileList = fileList.slice();
//           newFileList.splice(index, 1);
//           return {
//             fileList: newFileList,
//           };
//         });
//       },
//       beforeUpload: (file) => {
//         let userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
//
//         console.log(file);
//
//         this.setState({videoSize: file.size})
//
//         uploader.addFile(file, null, null, null, userData);
//
//         // 获取上传凭证
//         loadUploadVideoAuth({
//           courseItemId: this.props.data.id,
//           videoName: file.name,
//           videoTitle: file.name,
//           videoTags: file.name,
//           videoDesc: file.name,
//         }).then(data => {
//           this.setState({aliVideoAuthDto: data.data.aliVideoAuthDto});
//         });
//
//         this.setState(({fileList}) => ({
//           fileList: [...fileList, file],
//         }));
//
//         return false;
//       },
//       fileList: this.state.fileList,
//     };
//
//     return (
//       <Modal title="更新" visible={this.props.show} onCancel={this.props.onCancel} footer={null} width={'80%'}>
//         <Row type='flex' style={{marginBottom: '5px'}}>
//
//           <Col span={24}>
//             <FormItem {...formItemLayout} label="课程视频">
//               <Upload {...uploadProps}>
//                 <Button>
//                   <Icon type="upload"/> 选择文件
//                 </Button>
//               </Upload>
//               <Button type="primary" onClick={this.doUpload} disabled={this.state.fileList.length === 0}
//                       loading={this.state.uploading}>
//                 {this.state.uploading ? this.state.upload_progress : '开始上传'}
//               </Button>
//             </FormItem>
//           </Col>
//         </Row>
//         <FormItem wrapperCol={{span: 12, offset: 4}}>
//           <Button type="primary" onClick={this.handleSubmit}>提交更新</Button>
//         </FormItem>
//       </Modal>
//     )
//   }
// }
//
// export default Form.create()(Update);
