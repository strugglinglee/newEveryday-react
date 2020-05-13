import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../actions/axios';
import { getorder } from '../../actions';

import { Tabs, WhiteSpace, Badge,WingBlank} from 'antd-mobile';

import "./index.less"
import { Head } from '../../components/Head';
const tabs = [
    { title: <Badge>全部</Badge> },
    { title: <Badge>待付款</Badge> },
    { title: <Badge>待发货</Badge> },
    { title: <Badge>配送中</Badge> },
    { title: <Badge>待评价</Badge> }
];

@connect(
    state=>{
        return{
            data:state.data
        }
    }
)
class Myorder extends Component {
    componentWillMount(){
        let {dispatch}=this.props
        axios.get("/getorder",{
            params:{
                usertel:localStorage.usertel
            }
        }).then(res=>{
            dispatch(getorder(res.data.result))
        
        })
    }
    toOresult=(item)=>{
        console.log(item)
        this.props.history.push("/oresult",item)
    }
    render() {
        let orderlist=this.props.data.order.map((item,index)=>{
            return(
            <div className="orderdiv" key={index}>
                <WhiteSpace />
                <div style={{ backgroundColor: '#fff' }}>
                    <WingBlank>
                    <h3>2小时达 <span>{item.date.split("T")[0]+" "+item.date.split("T")[1].slice(0,8)}</span></h3>
                    <div className="imgdiv">
                        {item.checkgoods.map((g,i)=>(
                            <img src={g.image} alt="" key={i}/>
                        ))}
                    </div>
                    <p>
                        <span>共{item["carNum"]}件</span>
                        <span>实付款<span>{"￥"+(item.total/100).toFixed(2)}</span></span>
                    </p>
                    <div className="detaildiv">
                       <span onClick={()=>this.toOresult(item)}>查看详情</span>
                    </div>
                    </WingBlank>
                </div>
            </div>)
        })
        return(

            <div style={{marginTop:".9rem"}}>
                <Head title="我的订单" show={true} {...this.props}></Head>
                
                <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div>
                    {orderlist.length>0?orderlist:<div style={{color:"#999",textAlign:"center",fontSize:".3rem"}}>
                    <WhiteSpace></WhiteSpace>
                    这里什么也没有，寸草不生
                    <u  style={{color:"pink",marginLeft:"5px"}} onClick={()=>{
                        this.props.history.push("/app/classify")
                    }}>去购物</u>
                    </div>}
                </div>
                <div>
                    暂无
                </div>
                <div>
                {orderlist.length>0?orderlist:<div style={{color:"#999",textAlign:"center",fontSize:".3rem"}}>
                    <WhiteSpace></WhiteSpace>
                    这里什么也没有，寸草不生
                    <u style={{color:"pink",marginLeft:"5px"}} onClick={()=>{
                        this.props.history.push("/app/classify")
                    }}>去购物</u>
                    </div>}
                </div>
                <div>
                    暂无
                </div>
                <div>
                    暂无
                </div>
                </Tabs>
                <WhiteSpace />
            </div>
        )
    }
}
export { Myorder }

