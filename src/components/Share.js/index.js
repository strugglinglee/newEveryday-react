import React,{Component} from "react"

import { ActionSheet,Toast } from 'antd-mobile';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Share extends Component {
    constructor() {
      super();
      this.state = {
        clicked: 'none',
        clicked1: 'none',
        clicked2: 'none',
      };
    }
  
    dataList = [
      { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
      { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
      { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
      { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
      { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
    ].map(obj => ({
      icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
      title: obj.title,
    }));
  
    showShareActionSheet = () => {
      ActionSheet.showShareActionSheetWithOptions({
        options: this.dataList,
        // title: 'title',
        message: '推荐给朋友，各得49减10元红包',
      },
      (buttonIndex) => {
        this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
        // also support Promise
        return new Promise((resolve) => {
          setTimeout(resolve, 600);
        });
      });
    }
  
    render() {
      return (
        <span onClick={this.showShareActionSheet}>去分享</span>)
    }
  }
  
  export {Share}