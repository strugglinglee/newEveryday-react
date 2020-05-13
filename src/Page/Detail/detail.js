import React,{Component} from "react"
import axios from "../../actions/axios";
import { getDetail, getCar } from "../../actions";
import { connect } from "react-redux";
import "./index.less"
import { Modal,Badge,WingBlank,WhiteSpace, Toast} from "antd-mobile"
import { Share } from "../../components/Share.js";
import judgetype from "../../assets/scripts";
import { Head } from "../../components/Head";

const alert = Modal.alert;
@connect(
    state=>{
        return{
            data:state.data
        }
    }
)
class Detail extends Component{
    componentDidMount(){
        let {dispatch}=this.props;
        var {goodsid}=this.props.match.params
        axios.get("/detail",{
            params:{
                _id:goodsid
            }
        }).then(({data:{result}})=>{
            dispatch(getDetail(result[0]))
        })
        if(localStorage.userstate){
            axios.get("/mycar",{
                params:{
                    usertel:localStorage.usertel
                }
            }).then(({data})=>{
                dispatch(getCar(data))
            })
        }
    }
    render(){
        let content=this.props.data.detail;
        if(content.normalProducts){
            var price1=content.normalProducts.pricePro.noVip.price/100;
            var {_id,secondGroupId,normalProducts:{stock,name,subtitle,image,pricePro:{noVip:{price}}}}=content;
        }
        return (
            
            <div style={{marginTop:".9rem"}}>
                <Head title="商品详情" show={true} {...this.props}></Head>
                {content.normalProducts &&
                <div>
                    <div className="imgDiv">
                        <img alt="" src={image}/>
                    </div>
                    <div className="contentDiv">
                        <WingBlank>
                        <p className="namep">{name}</p>
                        <p className="descp">{subtitle}</p>
                        <p className="price">{"￥"+price1.toFixed(2)}</p>
                        <p className="vipprice">{"￥"+(price1*.8).toFixed(2)}
                        <span>会员8折</span>
                        <u className="stock">已售{stock}份</u>
                        </p>
                        <div className="tips">
                            <span>·产地中国</span>
                            <span>·2小时达</span>
                            <span>·实付满69包邮</span>
                        </div>
                        </WingBlank>
                    </div>
                    <WhiteSpace></WhiteSpace>
                    <div className="youhui">
                        <WingBlank>
                        <h3>优惠<span className="r-span">详情<span>></span></span></h3>
                        <p className="p1">
                        <Badge text="限购"
                        style={{
                        marginRight: 5,
                        padding: '0 3px',
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        color: '#f19736',
                        border: '1px solid #f19736',
                        }}></Badge>
                        每人每天购买不超过3件，享受此优惠</p>
                        <div className="shareDiv">
                            <div className="imgdiv">
                                <img src="https://j-image.missfresh.cn/img_20171029215450695.png" alt=""/>
                                <span>该商品分享可领49减10红包</span>
                            </div>
                            <span className="span1"><Share></Share><span style={{marginLeft:"5px"}}>></span></span>
                        </div>
                        <p className="p1">已经有99+人分享了该商品 </p>
                        </WingBlank>
                    </div>
                    <div className="youhui bottom">
                        <WingBlank>
                        <h3>商品详情</h3>
                        <p className="p1">种类：{judgetype(secondGroupId)}</p>
                        <p className="p1">名称：{name}</p>
                        <p className="p1">描述：{subtitle}</p>
                        </WingBlank>
                    </div>
                    <WhiteSpace></WhiteSpace>
                    <div className="detail-bottom">
                        <span>
                        <Badge text={this.props.data.count}>
                        <i className="iconfont icon-car" onClick={()=>{
                            if(localStorage.userstate){
                                this.props.history.push("/app/car")
                            }else{
                                alert('提示', '您尚未登录，是否跳转至登录页面？', [
                                    { text: '取消', onPress: () => (Toast.info("您将继续浏览页面")) },
                                    { text: '确认', onPress: () =>{Toast.info("正在为您跳转至登录页面");this.props.history.push("/login")} },
                                    ])
                            }
                        }}/>
                        </Badge>
                        </span>
                        <span className="carbutton" onClick={()=>{
                            if(localStorage.userstate){
                                axios.get("/car",{
                                    params:{
                                        id:_id,
                                        name,
                                        price,
                                        secondGroupId,
                                        image,
                                        count:1,
                                        usertel:localStorage.usertel
                                    }
                                }).then(({data:result})=>{
                                   if(result.type){
                                    axios.get("/mycar",{
                                        params:{
                                            usertel:localStorage.usertel
                                        }
                                    }).then(({data})=>{
                                        let {dispatch}=this.props;
                                        dispatch(getCar(data))
                                        Toast.success("宝贝已成功放入购物车")
                                    })
                                   }else{
                                       Toast.info("哎呦，服务器正在开小差，请稍后再试")
                                   }
                                })
                                
                            }else{
                                alert('提示', '您尚未登录，是否跳转至登录页面？', [
                                { text: '取消', onPress: () => (Toast.info("您将继续浏览页面")) },
                                { text: '确认', onPress: () =>{Toast.info("正在为您跳转至登录页面");this.props.history.push("/login")} },
                                ])
                            }
                        }}>加入购物车</span>
                    </div>
                </div>
                }
            </div>
        )

    }
}


export {Detail}






