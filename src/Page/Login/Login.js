import React, { Component } from 'react';
import { List, InputItem,Toast ,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import axios from '../../actions/axios';
import { Head } from '../../components/Head';
import "./Login.less"
class Login extends Component{
    state={
        telError: false,
        codeError: false,
        usertel: '',
        code: '',
    }
    componentDidMount(){
        this.setState({
            usertel:localStorage.usertel
        })
    }
    onErrorClick = (tips) => {
            Toast.info(tips);
    }    
    onChange = (usertel) => {
        this.setState({
            usertel,
        });
        if (usertel.replace(/\s/g, '').length < 11) {
                this.setState({
                telError: true,
                });
        } else {
            this.setState({
            telError: false,
            });
        }

    }   
    gologin=()=>{
        var {usertel,code}=this.state
        axios.post("/login",{
            usertel,
            userpwd:code
        }).then(({data:{type}})=>{
            if(type){
                Toast.success("登录成功")
                localStorage.userstate=true
                localStorage.usertel=usertel
                this.props.history.push("/app/my")
            }else{
                Toast.info("密码错误，请重试")
            }
        })
    }
    render(){
        return(
            <div style={{marginTop:".9rem"}} className="logindiv">    
                <Head title="登录" show={true} {...this.props}></Head>
                <WhiteSpace/>
                <WingBlank>
                <List>
                    <InputItem
                    type="phone"
                    placeholder="请输入11位有效手机号"
                    error={this.state.telError}
                    onErrorClick={()=>{this.onErrorClick("请输入11位有效手机号")}}
                    onChange={this.onChange}
                    value={this.state.usertel}
                    >手机号码</InputItem>
                </List>
                <WhiteSpace/>
                <List>
                    <InputItem
                    type="password"
                    placeholder="请输入密码"
                    error={this.state.codeError}
                    onErrorClick={()=>{this.onErrorClick("请输入密码")}}
                    value={this.state.code}
                    onChange={(code)=>{this.setState({code})}}
                    >密码</InputItem>
                </List>
                <WhiteSpace />
                    <Button type="primary" onClick={this.gologin}>登录</Button>

                    <WhiteSpace />
                    <Button onClick={()=>{this.props.history.push("/register")}}>去注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

export {Login}


