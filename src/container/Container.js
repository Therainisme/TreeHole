import React from 'react';
import './Container.css'

import MusicPlayer from "./MusicPlayer/MusicPlayer";

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            left: -120,
            right: -120,
            word: ''
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

    _changeWord(word){
        this.setState({word})
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
                <div className='mask' id='mask'></div>
                <div className='word'>{this.state.word}</div>
                <div className='info'>
                    <MusicPlayer
                        changeWordFuntion={this._changeWord.bind(this)}
                        name={'星辰大海 - 黄霄云'}
                        wordsUrl={'/static/星辰大海.lrc'}
                        audioUrl={'/static/星辰大海.m4a'}
                        posterUrl={'/static/poster.jpg'}
                    />
                </div>
            </div>
        );
    }


}

export default Container