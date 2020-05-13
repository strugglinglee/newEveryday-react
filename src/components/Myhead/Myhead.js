import React , {Component} from "react";
import "./myhead.less"

class Myhead extends Component{
    render(){
        return(
        <div>
            <div className="headdiv">
                <div className="imgdiv">
                  <img alt="" src="http://47.94.96.162/image/touxiang.gif"/>
                </div>
                <span onClick={()=>{this.props.history.push("/login");console.log(this.props.history)}}>{localStorage.userstate?localStorage.usertel:"登录/注册"}</span>
                <div className="tips"><i className="iconfont icon-laba"></i>会员权益大升级，加入会员，做任务领专属红包</div>
                <div className="vipdiv">
                    <img src="http://47.94.96.162/image/vip.jpeg" alt="" />
                </div>
            </div>
        </div>
        )
    }
}
export {Myhead}