import React, { Component } from 'react';
import { Head } from '../../components/Head';
import {NoticeBar, WingBlank, WhiteSpace,Badge, Checkbox, Toast} from "antd-mobile"
import "./index.less"
import { connect } from 'react-redux';
import { getCheckgoods, getCar, getaddress, saveorder } from '../../actions';
import axios from '../../actions/axios';

@connect(
    state=>{
        return{
            ...state
        }
    }
)
class Order extends Component {
    componentWillMount(){
        if(localStorage.userstate){
            let {dispatch}=this.props;
            axios.get("/getaddress",{
                params:{
                    usertel:localStorage.usertel
                }
            }).then(({data})=>{
                dispatch(getaddress(data.address))
            })
            axios.get("/mycar",{
                params:{
                    usertel:localStorage.usertel
                }
            }).then(({data})=>{
                dispatch(getCar(data))
                dispatch(getCheckgoods())
            })
        }
    }
    toAddress=()=>{
        this.props.history.push("/address")
    }
    tobuy=()=>{
        let {dispatch}=this.props
        if(this.props.data.useradd&&this.props.data.total){
            dispatch(saveorder())
            Toast.success("支付成功~")
            this.props.history.push("/myorder")
        }else{
            Toast.info("请填写收货信息！")
        }


        // <u style={{color:"pink",marginLeft:"5px"}} onClick={()=>{
        //     this.props.history.push("/app/classify")
        // }}>去购物</u>
    }
    render() {
        return(
            <div style={{height:"100%",marginTop:".9rem"}}>
                <Head show={true} title={"填写订单"} {...this.props}></Head>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    本地9点-21点下单，2小时送达
                </NoticeBar>
                <WingBlank>
                    <WhiteSpace/>
                    <div className="addressDiv">
                    {
                        this.props.data.useradd && <div onClick={this.toAddress}>
                            <div className="address1">
                                <Badge text={this.props.data.useradd.tag}
                                    style={{
                                    padding: '0 .06rem',
                                    backgroundColor: '#f3f3f3',
                                    borderRadius:".1rem",
                                    color: '#0099FF',
                                    border: '1px solid #0099FF',
                                    }}
                                />
                                <span>{this.props.data.useradd.locat}</span>
                            </div>
                            <p className="address2">{this.props.data.useradd.address}</p>
                            <p className="address3">
                                <span>{this.props.data.useradd.name}</span>
                                <span>{this.props.data.useradd.tel}</span>
                            </p>
                        </div>
                    }
                    {
                        !this.props.data.useradd && 
                        <div className="plusdiv" onClick={this.toAddress}>
                            <i className="iconfont icon-plus">
                            </i>
                        </div>
                    }

                    </div>
                    <WhiteSpace/>
                    <div className="goodsinfo">
                        <h3 className="info-top">
                            2小时达
                            <span>今天2小时内送达[可选]<span style={{marginLeft:"5px"}}>></span></span>
                        </h3>    
                        <div className="info-bottom">
                            <div className="imgdiv">
                            {this.props.data.checkgoods.map((item,i)=>{
                                    return (
                                        <img key={i} alt="" src={item.image} />
                                )
                            })}
                            </div>
                            <span className="right-span">
                                共
                                <span>{this.props.data.carNum}</span>
                                件
                                <span style={{marginLeft:"5px"}}>></span>
                            </span>
                        </div>   
                    </div>
                    <WhiteSpace></WhiteSpace>
                    <div className="goodsinfo">
                        <h3 className="info-top">
                        <Badge text="优享会员"
                            style={{
                            padding: '0 .06rem',
                            backgroundColor: "#8B4513",
                            borderRadius:".1rem",
                            color: '#fff',
                            border: '1px solid #8B4513',
                            }}
                        />
                        </h3>    
                        <div className="info-bottom vipdiv">
                            <span>开通优享会员，本单立省<span style={{color:"#ff4891"}}>3元</span></span>
                            <span style={{fontSize:".26rem"}}><span style={{color:"#ff4891",marginRight:".1rem"}}>8元/月</span>立即开通<Checkbox style={{marginLeft:".1rem"}}></Checkbox></span>
                        </div>   
                    </div>

                    <WhiteSpace></WhiteSpace>
                    <div className="totalDiv">
                        <p className="totalP">
                            <span>商品总计</span>
                            <span>{"￥"+(this.props.data.total/100).toFixed(2)}</span>
                        </p>
                        <p className="totalP">
                            <span>商品促销优惠</span>
                            <span style={{color:"#ff4891"}}>-￥9</span>
                        </p>
                        <div className="quanP">
                            <p className="quandiv">
                                <span>商品券</span><span style={{color:"#999"}}>无可用商品券<span style={{marginLeft:"5px"}}>></span></span>
                            </p>
                            <p className="quandiv">
                                <span>红包</span><span style={{color:"#999"}}>无可用红包<span style={{marginLeft:"5px"}}>></span></span>
                            </p>
                        </div>
                        <div className="bottom_div">
                           <p className="quandiv"><span>商品实付</span> <span>{"￥"+(this.props.data.total/100-9).toFixed(2)}</span></p> 
                           <p className="quandiv"><span>配送费</span> <span>包邮</span></p> 
                           <p className="quandiv"><span></span> <span style={{color:"#ff4891",fontSize:".32rem"}}>{"￥"+(this.props.data.total/100-9).toFixed(2)}</span></p>
                        </div>
                    </div>
                    <WhiteSpace></WhiteSpace>
                </WingBlank>
                <div className="bottomo">
                <span className="funkuanS">付款：<span style={{color:"#ff4891",fontSize:".34rem"}}>{"￥"+(this.props.data.total/100-9).toFixed(2)}</span><span style={{color:"#999",fontSize:".2rem"}}>(为您节省9元)</span></span>
                <span className="funkuanBtn" onClick={this.tobuy}>去支付<i className="iconfont icon-right"></i></span>
                </div>
            </div>
        )
    }
}
export { Order }