import React , {Component} from "react";
import { Tabs} from 'antd-mobile';
import "./Homenav.less"

class Homenav extends Component{
    constructor(props){
        super(props)
        this.state={
            navlist:[
                {
                    "categoryType": "首页频道",
                    "internalId": "hz-newsy",
                    "default": 1,
                    "icon": "https://j-image.missfresh.cn/mis_img_20181212225018771.png?mryxw=120&mryxh=120",
                    "isNewUserPage": 0,
                    "title": "热卖",
                    "isHome": 1
                },
                {
                    "internalId": "hz-shucai",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190221105256983.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "蔬菜",
                    "isHome": 0
                },
                {
                    "internalId": "hz-roudan",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190128165546274.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "肉蛋",
                    "isHome": 0
                },
                {
                    "internalId": "hz-shuiguo",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190221104110815.png?mryxw=130&mryxh=136",
                    "isNewUserPage": 0,
                    "title": "水果",
                    "isHome": 0
                },
                {
                    "internalId": "hz-crd-huoguo",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20181213213122803.png?mryxw=138&mryxh=135",
                    "isNewUserPage": 0,
                    "title": "火锅",
                    "isHome": 0
                },
                {
                    "internalId": "hz-liangyou",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190210103554416.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "粮油",
                    "isHome": 0
                },
                {
                    "internalId": "hz-lingshi",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190210092258843.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "零食",
                    "isHome": 0
                },
                {
                    "internalId": "crd-hz-shuichan",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190225122927943.jpg?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "水产",
                    "isHome": 0
                },
                {
                    "internalId": "hz-crd-sushi",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190209163454009.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "速食",
                    "isHome": 0
                },
                {
                    "internalId": "hz-rupin",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190221102355967.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "乳品",
                    "isHome": 0
                },
                {
                    "internalId": "hz-crd-jiuyin",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190209163204684.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "酒饮",
                    "isHome": 0
                },
                {
                    "internalId": "HZ-crd-shushi",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190209164444541.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "熟食",
                    "isHome": 0
                },
                {
                    "internalId": "hz-ribai",
                    "default": 0,
                    "icon": "https://j-image.missfresh.cn/mis_img_20190221102525353.png?mryxw=140&mryxh=140",
                    "isNewUserPage": 0,
                    "title": "日百",
                    "isHome": 0
                }
            ]
        }
    }
    render(){
        return(
            <div>
                <Tabs tabs={this.state.navlist}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} page={7} />}
                initialPage={1}
                onChange={(tab, index) => { console.log('onChange', index); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index) }}
                >
                    {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of third tab
                    </div> */}
                </Tabs>
            </div>
        )
    }

}
export {Homenav}

