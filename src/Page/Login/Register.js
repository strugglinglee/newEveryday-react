import React, { Component } from 'react';
import { List, InputItem,Toast ,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import axios from "../../actions/axios"
import { Head } from '../../components/Head';

class Register extends Component{
    state={
        telError: false,
        nameError: false,
        pwdError: false,
        pwdError1: false,
        usertel: '',
        username:"",
        pwd:"",
        pwd1:""
    }
    onErrorClick = (tip) => {
        if (this.state.telError||this.state.nameError||this.state.pwdError||this.state.pwdError1) {
            Toast.info(tip);
        }
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
    onChangename = (username) => {
      if (username.replace(/\s/g, '').length >=2&&username.replace(/\s/g, '').length <=10) {
          this.setState({
            nameError: false,
            });
      } else {
        this.setState({
          nameError: true,
          });
      }
    this.setState({
            username,
        });
    }
    onChangepwd = (pwd) => {
      if (pwd.replace(/\s/g, '').length >=6&&pwd.replace(/\s/g, '').length <=12) {
          this.setState({
          pwdError: false,
          });
    } else {
        this.setState({
        pwdError: true,
        });
    }
    this.setState({
            pwd,
        });
    }
    onChangepwd1 = (pwd1) => {
      if (this.state.pwd==pwd1) {
          this.setState({
            pwdError1: false,
          });
    } else {
        this.setState({
        pwdError1: true,
        });
    }
    this.setState({
            pwd1,
        });
    }
    register=()=>{
      var {telError,nameError,pwdError,pwdError1,username,usertel,pwd,pwd1}=this.state;
      if(username&&usertel&&pwd&&pwd1){
        if(!telError&&!nameError&&!pwdError&&!pwdError1){
          axios.post("/register",{username,usertel,userpwd:pwd})
          .then(({data})=>{
              if(data.type){
                Toast.success("注册成功");
                localStorage.usertel=usertel
                this.props.history.push("/login")
              }else{
                Toast.info("该手机号已被注册，请直接登录");
                localStorage.usertel=usertel
                this.props.history.push("/login")
              }
          })
        }
      }else{
        Toast.info("请先输入完整的用户信息");
      }
    }
    render(){
        return(
            <div style={{marginTop:".9rem"}}>  
                <Head title="注册" show={true} {...this.props}></Head>
                <WhiteSpace/>
                <WingBlank>
                <List>
                    <InputItem
                    type="phone"
                    placeholder="请输入手机号"
                    error={this.state.telError}
                    onErrorClick={()=>{this.onErrorClick("请输入11位有效手机号")}}
                    onChange={this.onChange}
                    value={this.state.usertel}
                    >手机号</InputItem>
                </List>
                <WhiteSpace/>
                <List>
                    <InputItem
                    placeholder="请输入用户名"
                    error={this.state.nameError}
                    onErrorClick={()=>{this.onErrorClick("长度必须在2-10之间")}}
                    onChange={this.onChangename}
                    value={this.state.username}
                    >用户名</InputItem>
                </List>
                <WhiteSpace/>
                <List>
                    <InputItem
                    type="password"
                    placeholder="请输入6-12位密码"
                    error={this.state.pwdError}
                    onErrorClick={()=>{this.onErrorClick("长度必须在6-12之间")}}
                    onChange={this.onChangepwd}
                    value={this.state.pwd}
                    >密码</InputItem>
                </List>
                <WhiteSpace/>
                <List>
                    <InputItem
                    type="password"
                    placeholder="请再次输入密码"
                    error={this.state.pwdError1}
                    onErrorClick={()=>{this.onErrorClick("两次输入的密码不一致")}}
                    onChange={this.onChangepwd1}
                    value={this.state.pwd1}
                    >确认密码</InputItem>
                </List>
                <WhiteSpace/>
                    <Button type="warning" onClick={this.register}>注册</Button>

                    <WhiteSpace />
                    <Button onClick={()=>{this.props.history.push("/login")}}>去登录</Button>
                <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

export {Register}


