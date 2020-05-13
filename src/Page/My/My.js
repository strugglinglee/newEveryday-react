import React, { Component } from 'react';
import { Myhead } from '../../components/Myhead/Myhead';
import { WingBlank,WhiteSpace,Flex,Toast,Modal} from 'antd-mobile';

import "./my.less"
import { connect } from 'react-redux';
import { Head } from '../../components/Head';

const alert = Modal.alert;
@connect(
    state=>{
        return{
            data:state.data
        }
    }
)
class My extends Component {
    state={
        divList1:[
            {txt:"余额",count:0},
            {txt:"红包",count:0},
            {txt:"商品券",count:0},
            {txt:"积分兑换",count:0}
        ],
        divList2:[
            {txt:"待付款",icon:"icon-fukuan"},
            {txt:"待发货",icon:"icon-fahuo"},
            {txt:"配送中",icon:"icon-peisong"},
            {txt:"已完成",icon:"icon-finish"}
        ],
        divList3:[
            {txt:"我的拼团",icon:"icon-pintuan"},
            {txt:"储值有礼",icon:"icon-lipin"},
            {txt:"福利积分",icon:"icon-jifen"},
            {txt:"收货地址",icon:"icon-address"},
            {txt:"客服帮助",icon:"icon-kefu"},
            {txt:"设置",icon:"icon-shezhi"}
        ]
    }
    render() {
        let domlist1=this.state.divList1.map(({txt,count},i)=>(
            <li key={i}>
                {i==0 && <div>{"￥"+count}</div>}
                {i!=0 && <div>{count}</div>}
                <div className="bottom1">{txt}
                {i==0 && <img src="https://j-image.missfresh.cn/img_20180205201631182.gif"/>}
                </div>
            </li>
        ))
        let domlist2=this.state.divList2.map(({txt,icon},i)=>(
            <li key={i}>
                <div className="divi"><i className={"iconfont "+icon}/></div>
                <div>{txt}</div>
            </li>
        ))
        let domlist3=this.state.divList3.map(({txt,icon},i)=>(
            <li key={i}>
                <div className="divi"><i className={"iconfont "+icon}/></div>
                <div>{txt}</div>
            </li>
        ))
        return(
            <div style={{background:"#f4f4f4",marginTop:".9rem"}}>
                <Head show={true} title={"我的"} {...this.props}></Head>
                <Myhead {...this.props}></Myhead>
                <WhiteSpace size="lg" />
                <WingBlank>
                <ul className="div1">
                    {domlist1}
                </ul>
                <WhiteSpace size="lg" />
                <div className="dingdan" onClick={()=>{
                            if(localStorage.userstate){
                                this.props.history.push("/myorder")
                            }else{
                                alert('提示', '您尚未登录，是否跳转至登录页面？', [
                                    { text: '取消', onPress: () => (Toast.info("您将继续浏览页面")) },
                                    { text: '确认', onPress: () =>{Toast.info("正在为您跳转至登录页面");this.props.history.push("/login")} },
                                    ])
                            }
                        }}>
                    <h3>我的订单
                        <span className="span1" >全部订单<span>></span></span>
                    </h3>
                    <ul className="div1 divul">
                        {domlist2}
                    </ul>
                </div>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item className="flex">
                        <img src="https://j-image.missfresh.cn/img_20190301102507419.png" alt="" />
                    </Flex.Item>
                    <Flex.Item className="flex">
                        <img src="https://j-image.missfresh.cn/img_20190211164642915.png" alt=""/>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <div className="dingdan fuwu">
                    <h3>我的服务
                    </h3>
                    <ul className="divul">
                        {domlist3}
                    </ul>
                </div>
                <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        )
    }
}
export { My }