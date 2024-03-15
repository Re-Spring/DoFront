import React, { useState, useEffect } from 'react';
import '../../styles/chatbots/Chatbot.css';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);

    const toggleChatbot = () => setIsOpen(!isOpen);
    const handleCloseChatbot = () => {
        const shouldClose = window.confirm("닫으면 대화 내용이 사라집니다. 닫으시겠습니까?");
        if (shouldClose) {
            setIsOpen(false);
            setMessages([]);
        }
    };

    const handleChange = (event) => setInputValue(event.target.value);

    const handleSend = async () => {
        if (isSending || !inputValue.trim()) return;
        setIsSending(true);
        const currentInputValue = inputValue.trim();
        setMessages(messages => [...messages, { type: 'user', text: currentInputValue }]);
        
        // OpenAI API 호출을 서버로 대체하는 로직을 구현해야 합니다.
        // 예: 서버 엔드포인트 `/api/chat/response`에 요청을 보내고 응답을 받는 코드

        setInputValue('');
        setIsSending(false);
    };

    const onEnterKeyHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <button onClick={toggleChatbot} className="toggleButtonStyle">
                <img src={isOpen ? '/images/chatbot.png' : '/images/chatbot.png'} alt="Toggle" className="iconStyle"/>
            </button>
            {isOpen && (
                <div className="chat-content chatContentStyle" style={{width: "400px", height:"500px"}}>
                    <div className="message-container">
                        <div className="chatBoxTitle">
                            <div className="boxTitle">도와줘요 리링</div>
                            <div className="boxExit" onClick={handleCloseChatbot}>X</div>
                        </div>
                        <hr />
                        {messages.map((msg, index) => (
                            <div className="line" key={index}>
                                {msg.type === 'user' ? (
                                    <span className="chat-box user"><div>사용자</div>{msg.text}</span>
                                ) : (
                                    <span className="chat-box bot"><div>리링</div>{msg.text} 리링</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            className="chat-box inputStyle"
                            value={inputValue}
                            onChange={handleChange}
                            onKeyUp={onEnterKeyHandler}
                            disabled={isSending}
                        />
                        <button onClick={handleSend} className="sendButtonStyle"><img src='/images/arrow.png' alt="Send"/></button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chatbot;
