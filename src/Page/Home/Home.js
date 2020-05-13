import React, { Component } from 'react';
import { Ban } from '../../components/Ban';
import { Homehead } from '../../components/Homenav/Homehead';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import "./index.less"
import { GoodList } from '../../components/Goodlist/Goodlist';
import axios from '../../actions/axios';
import { connect } from 'react-redux';
import judgetype from '../../assets/scripts';
import { getGoods } from '../../actions';
import { Head } from '../../components/Head';

@connect(
    state=>{
        return{
            data:state.data
        }
    }
)
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toplist:[
                {icon:"https://j-image.missfresh.cn/img_20170627185311186.png",text:"优鲜严选"},
                {icon:"https://j-image.missfresh.cn/img_20170627184654084.png",text:"安心检测"},
                {icon:"https://j-image.missfresh.cn/img_20170718194948016.png",text:"佩服保障"},
            ],
            imglist:[
                {icon:"https://j-image.missfresh.cn/img_20181210023155241.jpg",text:"39减20"},
                {icon:"https://j-image.missfresh.cn/img_20181210023513163.png",text:"储值有礼"},
                {icon:"https://j-image.missfresh.cn/img_20181210023548857.png",text:"一元开卡"},
            ],
            headerlist:[
                {type:"hz-jinriremai",img:"https://j-image.missfresh.cn/mis_img_20190307111419529.jpg?mryxw=750&mryxh=180"},
                {type:"hz-shucai",img:"https://j-image.missfresh.cn/mis_img_20190311002233885.jpg?mryxw=750&mryxh=260"},
                {type:"hz-shuiguo2",img:"https://j-image.missfresh.cn/mis_img_20190224234353316.jpg?mryxw=750&mryxh=182"},
                {type:"hz-roudan",img:"https://j-image.missfresh.cn/mis_img_20190128165115811.png?mryxw=1125&mryxh=270"},
                {type:"hz-rupin",img:"https://j-image.missfresh.cn/mis_img_20190210102424351.png?mryxw=1125&mryxh=270"},
                {type:"hz-shuichan",img:"https://j-image.missfresh.cn/mis_img_20190211121624568.jpeg?mryxw=1125&mryxh=270"},
                {type:"hz-liangyou",img:"https://j-image.missfresh.cn/mis_img_20190210105358129.png?mryxw=750&mryxh=180"},
                {type:"hz-lingshi",img:"https://j-image.missfresh.cn/mis_img_20190210100635629.png?mryxw=1125&mryxh=270"},
                {type:"hz-jiuyinribai",img:"https://j-image.missfresh.cn/mis_img_20190305184427216.png?mryxw=1125&mryxh=270"}
            ]
        };
    }
    componentDidMount(){
        let {dispatch}=this.props;
        axios.get("/goodsinfo").then(({data:{result}})=>{
            dispatch(getGoods(result))
        })
    }
    render() {
        let {goods}=this.props.data;
        let domlist=this.state.headerlist.map((item,index)=>(
            <div key={index}>
                <WhiteSpace></WhiteSpace>
                <div className="header-img" onClick={()=>{
                    this.props.history.push("/app/classify")
                }}>
                    <img src={item.img} alt=""/>
                </div>
                <WingBlank>
                    <GoodList type={item.type} goods={goods} {...this.props}></GoodList>
                </WingBlank>
            </div>
        ))
        return(
            <div style={{marginTop:".9rem"}}>

                <Head show={true} title={"首页"} {...this.props}></Head>
                <Homehead {...this.props}></Homehead>
                <Ban {...this.props}></Ban>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <ul className="top1">
                    {this.state.toplist.map((item,index)=>(
                        <li key={index}>
                            <img alt="" src={item.icon} />
                            <span>{item.text}</span>
                        </li>
                    ))}
                    </ul>
                    <WhiteSpace></WhiteSpace>
                    <ul className="top2">
                    {this.state.imglist.map((item,index)=>(
                        <li key={index}>
                            <img alt="" src={item.icon} />
                            <span>{item.text}</span>
                        </li>
                    ))}
                    </ul>
                    <WhiteSpace></WhiteSpace>
                    <div className="top3">
                        <img alt="" src="https://j-image.missfresh.cn/img_20181216230147518.png"/>
                        <img alt="" src="https://j-image.missfresh.cn/img_20181216225925074.png"/>
                    </div>
                </WingBlank>
                <WhiteSpace></WhiteSpace>
                <div className="displayDiv">
                    {domlist}
                </div>
            </div>
        )
    }
}
export { Home }


