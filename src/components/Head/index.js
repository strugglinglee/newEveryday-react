import React,  {Component} from "react";
import {Popover,NavBar,Icon, Toast,Modal} from "antd-mobile"
import "./index.less"
import { connect } from "react-redux";
const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;


const alert = Modal.alert;
@connect(
    state=>{
        return{
            data:state.data
        }
    }
)
class Head extends Component{
    state = {
        visible:false,
        selected: '',
      };
      onSelect = (opt) => {
        switch(opt.props.value){
            case "1":
            this.props.history.push("/login")
            break
            case "2":
            if(localStorage.userstate){
                this.props.history.push("/myorder")
            }else{
                alert('提示', '您尚未登录，是否跳转至登录页面？', [
                    { text: '取消', onPress: () => (Toast.info("您将继续浏览页面")) },
                    { text: '确认', onPress: () =>{Toast.info("正在为您跳转至登录页面");this.props.history.push("/login")} },
                    ])
            }
            break
            case "3":
            if(localStorage.userstate){
                alert('提示', '您确定要退出？', [
                    { text: '取消', onPress: () => (Toast.info("您将继续浏览页面")) },
                    { text: '确认', onPress: () =>{            localStorage.usertel=""
                    localStorage.userstate="";Toast.info("欢迎您再来");window.location.reload()} },
                    ])
            }else{
                alert('提示', '您尚未登录，是否先去登录？', [
                    { text: '取消', onPress: () => (Toast.info("您将继续浏览页面")) },
                    { text: '确认', onPress: () =>{ Toast.info("正在为您跳转至登录页面");this.props.history.push("/login")} },
                    ])
            }
            break
            default:
            break
        }
        this.setState({
          visible:false,
          selected: opt.props.value,
        });
      };
      handleVisibleChange = (visible) => {
        this.setState({
          visible,
        });
      };
    render(){
        let {title ,show, history } = this.props;
        return (
            <NavBar
            mode="light"
            icon= {show && <Icon type="left" /> }
            onLeftClick={show?() => {history.go(-1)} :console.log("")}
            rightContent={
                <Popover mask
                  overlayClassName="fortest"
                  overlayStyle={{ color: 'currentColor' }}
                  visible={this.state.visible}
                  overlay={[
                (<Item key="3" value="1" icon={<i className="iconfont icon-login"></i>} data-seed="logId" 
                    >登录/注册</Item>),
                    (<Item key="4" value="2" icon={<i className="iconfont icon-order"></i>} style={{ whiteSpace: 'nowrap' }}>我的订单</Item>),
                    (<Item key="5" value="3"  icon={<i className="iconfont icon-exit"></i>} style={{ whiteSpace: 'nowrap' }}>退出登录</Item>),
                    (<Item key="6" value="4"  icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                      <span style={{ marginRight: 5 }}>Help</span>
                    </Item>),
                  ]}
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                  }}
                  onVisibleChange={this.handleVisibleChange}
                  onSelect={this.onSelect}
                >
                  <div style={{
                    height: '100%',
                    padding: '0 15px',
                    marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  >
                    <Icon type="ellipsis" />
                  </div>
                </Popover>}
        > 
            {title}
        </NavBar>
        )
    }
}

export {Head}
