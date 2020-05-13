import React, { Component } from 'react';
import { Homehead } from '../../components/Homenav/Homehead';
import { Slidenav } from '../../components/Homenav/Sidenav';


class Classify extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return(
            <div style={{height:"93%"}}>
                <Homehead {...this.props}></Homehead>
                <Slidenav {...this.props}></Slidenav>
            </div>
        )
    }
}
export { Classify }


