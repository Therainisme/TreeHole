import React from 'react';
import './MusicPlayer.css'
import axios from "axios";

class MusicPlayer extends React.Component {
    constructor() {
        super();
        this.state = {
            duration: 208,
            currentTime: 10,
            words: null,
            wordsIndex: 0
        }
    }

    _getWordsFromUrl() {
        axios.get(this.props.wordsUrl)
            .then((res) => {
                this.setState({words: res.data.split('\n')})
            }).catch((error) => {
        })
    }

    _getProgressBottomLeft() {
        return (this.state.currentTime / this.state.duration) * (935 - 245) + 245
    }

    _getProgressBeforeWidth() {
        return (this.state.currentTime / this.state.duration) * 100 + '%'
    }

    _getWordsTimeStr(word) {
        let regex = /\[(.+?)\]/g;
        return (regex.exec(word))[1]
    }

    _changeWordByCurrentTime(currentTime) {

        if (this.state.words !== null) {
            let timeStr = this._getWordsTimeStr(this.state.words[this.state.wordsIndex])
            const word = this.state.words[this.state.wordsIndex].substring(timeStr.length + 2, this.state.words[this.state.wordsIndex].length)
            const wordTime = this._parseWordsTimeStr(timeStr)
            if (currentTime >= wordTime - 0.5) {
                this.props.changeWordFuntion(word)
                this.setState({wordsIndex: this.state.wordsIndex + 1})
            }
        }
    }

    _parseWordsTimeStr(timeStr) {
        const minutes = timeStr.split(':')[0]
        const seconds = timeStr.split(':')[1].split('.')[0]
        const milliseconds = timeStr.split(':')[1].split('.')[1]
        return (~~minutes * 60 + ~~seconds) + ~~milliseconds / 100
    }

    handleClickProgressButton(e) {
        const will = ~~(e.nativeEvent.offsetX / 691 * 208)
        this.setState({
            currentTime: will
        })
        document.getElementById('music').currentTime = will
        // 定位歌词
        if (this.state.words !== null) {
            for (let i = 0; i < this.state.words.length; ++i) {
                if (will <= this._parseWordsTimeStr(this._getWordsTimeStr(this.state.words[i]))) {
                    if (i === 0) i = 1
                    this.setState({wordsIndex: i - 1})
                    break
                }
            }
        }
    }

    componentDidMount() {
        this._getWordsFromUrl()
        // 开始播放
        window.onload = () => {
            // 这里懒直接操作dom吧
            const mask = document.getElementById('mask')
            mask.style.opacity = 0;
            setInterval(() => {
                document.getElementById('music').play();
            }, 1000)
            setInterval(() => {
                mask.style.zIndex = -1
            }, 2000)
            const musicInterval = setInterval(() => {
                const target = document.getElementById('music')
                this._changeWordByCurrentTime(target.currentTime)
                this.setState({
                    currentTime: ~~target.currentTime
                })
            }, 100)
            this.setState({musicInterval})
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.musicInterval)
    }

    render() {
        return (
            <div className='player'>
                <div className='cd'>
                    <div className='img'>
                        <img src={this.props.posterUrl} alt=""/>
                    </div>
                </div>
                <audio id='music' src={this.props.audioUrl}></audio>
                <div className='panel'>
                    <div className='name'>{this.props.name}</div>
                    <div className='control'>
                        <div className='function'></div>
                        <div className='progress' onClick={this.handleClickProgressButton.bind(this)}>
                            <div className='progress_before'
                                 style={{'width': this._getProgressBeforeWidth()}}
                            ></div>
                            <div className='progress_button' style={{'left': this._getProgressBottomLeft()}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicPlayer