import React from 'react';
import './Container.css'

import MusicPlayer from "./MusicPlayer/MusicPlayer";

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            left: -120,
            right: -120
        }
    }

    _changeBackgroundPosition() {
        // get two number from -120 to -20
        let x, y
        do{
            x = Math.floor(Math.random() * 121);    // 可均衡获取 0 到 100 的随机整数。
            y = Math.floor(Math.random() * 121);
        }while (Math.abs(-this.state.left - x) <= 20 || Math.abs(-this.state.left - y) <= 20);
        this.setState({
            left : -20 - x,
            top : -20 -y
        })
    }

    componentDidMount() {
        let interval = setInterval(() => {
            this._changeBackgroundPosition()
        }, 3000)
        this.setState({interval})
    }

    componentWillUnmount() {
        //todo remove interval
        clearInterval(this.state.interval)
    }

    render() {
        return (
            <div className='container'>
                <div className='background' style={{'left': this.state.left, 'top': this.state.top}}></div>
                <div className='word'>会不会我们的爱，会被风吹向大海</div>
                <div className='info'>
                    <MusicPlayer/>
                </div>
            </div>
        );
    }


}

export default Container