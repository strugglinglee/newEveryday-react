import React , {Component} from "react";

import { Carousel, WingBlank } from 'antd-mobile';
import "../assets/css/ban.less"

class Ban extends Component {
    state = {
        imgs:["https://j-image.missfresh.cn/img_20180830112849033.jpg?iopcmd=convert&amp;dst=webp",
            "https://j-image.missfresh.cn/img_20180731120141452.jpg?iopcmd=convert&amp;dst=webp",
            "https://j-image.missfresh.cn/img_20180720135808716.jpg?iopcmd=convert&amp;dst=webp"
        ]
    }

    componentDidMount() {
    // simulate img loading
    setTimeout(() => {
        this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        });
    }, 100);
    }
    render(){
        let domlist=this.state.imgs.map((item,i)=>(
            <div key={i} className="ban">
                <img src={item} alt="" style={{width:"100%",height:"100%"}} onClick={
                    ()=>{
                        this.props.history.push("/app/classify")
                    }
                }/>
                <p className="banp">{i+1}/3</p>
            </div>
        ))
        return (
            <WingBlank>
              <Carousel
                autoplay={true}
                infinite
              >
              {domlist}
              </Carousel>
            </WingBlank>
        )
    }
}
export {Ban}