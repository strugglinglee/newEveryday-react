import React, { Component } from 'react';
import { Head } from '../../components/Head';
import { InputItem,Toast,Picker,List,WingBlank,Tag,WhiteSpace,Button} from 'antd-mobile';
import "./index.less"
import { distinct } from '../../assets/scripts/distinct';
import { connect } from 'react-redux';
import { setaddress, getaddress } from '../../actions';

@connect(
    state=>{
        return{
            ...state
        }
    }
)
class Address extends Component {
    state={
        nameError: false,
        telError: false,
        addressError: false,
        name: '',
        usertel: '',
        locat:'',
        address:'',
        floor:'',
        floorError: false,
        taglist:[
            {txt:"公司",tag:'公',selected:false},
            {txt:"住处",tag:'住',selected:false},
            {txt:"学校",tag:'学',selected:false},
            {txt:"其他",tag:'其',selected:false},
        ],
        tag:""
    } 
    onErrorClick = (tips) => {
        Toast.info(tips);
    } 
    changename=(name)=>{
        if (name.length >=2) {
            this.setState({
                nameError: false,
                });
        }else {
            this.setState({
                nameError: true,
            })
        }
        this.setState({
            name,
        });
    }
    tagclick=(index)=>{
        var newtaglist=this.state.taglist.map((item,i)=>{
            if(i==index){
                item.selected=true
            }else{
                item.selected=false
            }
            return item
        })
        this.setState({
            taglist:newtaglist,
            tag:this.state.taglist[index].txt
        })
    }
    changeadd=(address)=>{
        if (address.length >=3) {
            this.setState({
                addressError: false,
                });
        }else {
            this.setState({
                addressError: true,
            })
        }
        this.setState({
            address,
        });
    }
    changefloor=(floor)=>{
        if (floor.length >=3) {
            this.setState({
                floorError: false,
                });
        }else {
            this.setState({
                floorError: true,
            })
        }
        this.setState({
            floor,
        });
    }
    onChange = (usertel) => {
        if (usertel.replace(/\s/g, '').length < 11) {
            this.setState({
            telError: true,
            });
        } else {
            this.setState({
            telError: false,
            });
        }
        this.setState({
                usertel,
            });
    }  
    saveadd=()=>{
        var addressinfo={}
        var {nameError,usertel,telError,floor,name,addressError,locat,address,floorError,tag}=this.state
        if(!nameError&&!telError&&!addressError&&locat&&!floorError&&tag){
            addressinfo.name=name;
            addressinfo.tel=usertel;
            addressinfo.usertel=localStorage.usertel;
            addressinfo.locat=locat;
            addressinfo.address=address+floor;
            addressinfo.tag=tag;
            this.props.dispatch(setaddress(addressinfo))
            this.props.history.push("/order")
        }else{
            Toast.info("错误，请仔细核对所填信息！")
        }
        
    } 
    render() {
        var tag=this.state.taglist.map((item,index)=>(
            <Tag key={index} data-seed={item.text} selected={item.selected} onChange={()=>this.tagclick(index)}>{item.tag}</Tag>))
        return(
            
            <div style={{marginTop:".9rem"}}>
                <Head show={true} title={"编辑收货地址"} {...this.props}></Head>
                <WhiteSpace></WhiteSpace>
                <List>
                    <InputItem
                        placeholder="请输入收货人姓名"
                        error={this.state.nameError}
                        onErrorClick={()=>{this.onErrorClick("请输入正确的收货人姓名")}}
                        onChange={this.changename}
                        value={this.state.name}
                        >收货人
                    </InputItem>
                </List>
                <List>
                    <InputItem
                        type="phone"
                        placeholder="请输入11位有效手机号"
                        error={this.state.telError}
                        onErrorClick={()=>{this.onErrorClick("请输入11位有效手机号")}}
                        onChange={this.onChange}
                        value={this.state.usertel}
                        >手机号码
                    </InputItem>
                </List>
                <List>
                <Picker extra={this.state.locat?this.state.locat:"请选择[可选]"}
                data={distinct}
                title="选择城市"
                onOk={e => this.setState({
                    locat:e.join("")
                })}
                onDismiss={e => console.log('dismiss', e)}
                >
                <List.Item arrow="horizontal">所在城市</List.Item>
                </Picker>
                </List>
                <List>
                    <InputItem
                        placeholder="请输入您的具体地址"
                        error={this.state.addressError}
                        onErrorClick={()=>{this.onErrorClick("请输入有效地址")}}
                        onChange={this.changeadd}
                        value={this.state.address}
                        >收货地址
                    </InputItem>
                </List>
                <List>
                    <InputItem
                        placeholder="请输入您的楼号门牌"
                        error={this.state.floorError}
                        onErrorClick={()=>{this.onErrorClick("请输入有效楼号门牌")}}
                        onChange={this.changefloor}
                        value={this.state.floor}
                        >楼号门牌
                    </InputItem>
                </List>
                <List>
                    <WhiteSpace></WhiteSpace>
                    <WingBlank>
                        <span className="adtype">地址类型</span>
                        {tag}
                    </WingBlank>
                    <WhiteSpace></WhiteSpace>
                </List>
                <WhiteSpace />
                <WingBlank>
                <Button type="primary" onClick={this.saveadd} className="savebtn">保存收货地址</Button><WhiteSpace />
                <Button>删除收货地址</Button><WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

export { Address }


