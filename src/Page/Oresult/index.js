import React,{Component} from "react";
import { WingBlank, WhiteSpace} from "antd-mobile";
import "./index.less"
import { Head } from "../../components/Head";
import { connect } from "react-redux";

@connect()
class Oresult extends Component {
    render(){
        var {address,checkgoods,carNum,_id,date}=this.props.history.location.state;
        return(
            <div style={{marginTop:".9rem"}}>
             <Head show={true} title={"订单详情"} {...this.props}></Head>
            <WingBlank>
            <WhiteSpace/>
            <div id="oresultdiv">
            <div>
                <p>订单号：{_id}</p>
                <p>下单时间：{date.split("T")[0]+" "+date.split("T")[1].slice(0,8)}</p>
                <p>收件人：{address.name}</p>
                <p>电话：{address.usertel}</p>
                <p>地址：{address.locat+address.address}</p>
            </div>
            <div className="info-bottom">
                <div className="imgdiv">
                {checkgoods.map((item,i)=>{
                        return (
                            <img key={i} alt="" src={item.image} />
                    )
                })}
                </div>
                <span className="right-span">
                    共
                    <span>{carNum}</span>
                    件
                </span>
            </div> 
            
            </div>
            <u style={{color:"pink",margin:"auto"}} onClick={()=>{
                        this.props.history.push("/app/home")
                    }}>回首页</u>
            </WingBlank>
            
        </div>)
    }
}
export {Oresult}