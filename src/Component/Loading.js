// Loading.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css'; // Import the CSS for animations

const Loading = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to the /result page after 3 seconds
        const timer = setTimeout(() => {
            navigate('/result');
        }, 5000);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="loading-container">
            <div className="loading-message">기록 저장 중...</div>
            <div className="Advice">
                Tip, 녹차, 커피, 콜라는 이뇨작용을 촉진하며 도뇨 시간을 단축해야 하거나 더 자주 소변이 마려울 수 있습니다.
            </div>
        </div>
    );
};

export default Loading;
