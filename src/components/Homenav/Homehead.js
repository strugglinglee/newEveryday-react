import React , {Component} from "react";
import {WingBlank} from 'antd-mobile';
import "./Homenav.less"


class Homehead extends Component{
    render(){
        return (
            <WingBlank  style={{height:"8.5%"}}>
                <div className="homehead">
                <img src="https://j-image.missfresh.cn/img_20161026155951214.png?mryxw=170&mryxh=41" alt=""/>
                
                    <div className="inputdiv">
                        <input className="searchbar" onFocus={()=>{
                            this.props.history.push("/search")
                        }}/>
                        <i className="iconfont icon-search"></i>
                    </div>
                </div>
            </WingBlank>
        )
    }
}

export  {Homehead}