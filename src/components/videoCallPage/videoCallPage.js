import React from 'react';

import './videoCallPage.css';

const VideoCallPage = () => {

    return (
        <div className="video-call-page">
            <div className="video-call-box">
                <h2 className='video-call-header'>Video Call</h2>
                <div className="video-call-container">
                    <div className="video-call-video-container">
                        <video className='video-output' id="videoOutput" autoplay width="489px" height="480px"></video>
                    </div>
                </div>
                <div className='video-input-container'>
                    <video className='video-input' id="videoInput" autoPlay muted></video>
                </div>
            </div>
            <div className='bottom-bar'>
            </div>
        </div>
    )
}

export default VideoCallPage;