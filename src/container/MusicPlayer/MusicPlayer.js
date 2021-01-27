import React from 'react';
import './MusicPlayer.css'

class MusicPlayer extends React.Component{
    render() {
        return(
            <div className='player'>
                <div className='cd'>
                    <div className='img'>
                        <img src="http://therainisme.com:1225/Therainisme/img/yourname.jpg" alt=""/>
                    </div>
                </div>
                <div className='panel'>
                    <div className='name'>星辰大海 - 黄霄云</div>
                    <div className='control'>
                        <div>暂停、播放、音量</div>
                        <div className='progress'>
                            <div className='progress_top'></div>
                            <div className='progress_bottom'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicPlayer