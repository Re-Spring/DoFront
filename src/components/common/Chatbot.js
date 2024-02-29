import React, { useState, useEffect } from 'react';
import '../../styles/chatbots/Chatbot.css';
// useSelector 사용이 주석 처리되어 있으므로, 필요한 경우 해당 코드를 활성화해야 합니다.
// import { useSelector } from 'react-redux';
import OpenAI from 'openai'; // OpenAI 라이브러리를 import합니다.
function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false); // 메시지 전송 중 상태 추가

        // 챗봇이 열릴 때 초기 메시지를 설정합니다.
        useEffect(() => {
            if (isOpen) {
                // 챗봇이 열리면 "무엇을 도와드릴까요?" 메시지를 보냅니다.
                setMessages([{ type: 'bot', text: '무엇을 도와드릴까요?' }]);
            }
        }, [isOpen]); // isOpen이 변경될 때마다 이 효과를 실행합니다.
    

    const toggleChatbot = () => setIsOpen(!isOpen);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSend = async (e) => {
        if (isSending || !inputValue.trim()) return; // 이미 전송 중이거나 입력값이 없으면 리턴
        setIsSending(true); // 전송 시작 표시

        const currentInputValue = inputValue.trim();
        // 유저 메시지를 메시지 리스트에 추가
        setMessages(messages => [...messages, { type: 'user', text: currentInputValue }]);

        // if (isSending) return; // 이미 전송 중이면 반환
        // setIsSending(true); // 전송 시작을 표시
        
        // if (!currentInputValue) {
        //     setIsSending(false); // 전송 취소
        //     return;
        // }
        // API 호출 함수 내에서 OpenAI 인스턴스를 생성합니다.
        const openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser : true
        });

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                    "role": "user",
                    "content": currentInputValue
                    }
                ],
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            console.log("OpenAI Response : ", response.choices[0].message.content); //응답 전체를 로깅
            // 응답을 메시지 리스트에 추가
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: response.choices[0].message.content }
            ]);
        } catch (error) {
            console.error("Error fetching response from OpenAI: ", error);
        }
        setInputValue(''); // 입력 필드 초기화
        setIsSending(false); // 전송 완료
    };

        // setInputValue(''); // 입력 필드 초기화

    // Enter 키 이벤트 처리 함수입니다. 엔터키를 누를 때 handleSend 함수를 호출합니다.
    const onEnterKeyHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 이벤트의 기본 동작을 방지
            console.log('Enter key');
            handleSend();
        }
    }

    return (
            <>
                <button onClick={toggleChatbot} className="toggleButtonStyle">
                    <img src={isOpen ? '/images/chatbot.png' : '/images/chatbot.png'} alt="Toggle" className="iconStyle"/>
                </button>
                {isOpen && (
                    <div className="chat-content chatContentStyle" style={{width: "400px", height:"500px"}}>
                        <div className="message-container">
                            <div className="chatBoxTitle">
                                <div className="boxTitle">도와줘요리링~~</div>
                                <div className="boxExit">X</div>
                            </div>
                            <hr />
                            {messages.map((msg, index) => (
                                <div className="line" key={index}>
                                    {msg.type === 'user' ? (
                                        <>
                                        {/* // User message bubble */}
                                        <div className="message-item">
                                        <img src='/images/chatboxUser.png' alt="User" className="message-icon"/>
                                        </div>
                                        <span className="chat-box user"><div>사용자</div>{msg.text}</span>
                                        </>
                                    ) : (
                                        <>
                                        {/* // Bot message bubble */}
                                        <div className="message-item">
                                        <img src='/images/chatbotboxBot.png' alt="Bot" className='message-icon'/>
                                        </div>
                                        <span className="chat-box bot"><div>리링</div>{msg.text}</span>
                                        </>
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
                            disabled={isSending} // 전송 중에는 입력 비활성화
                        />
                        <button id="send" onClick={handleSend} className="sendButtonStyle"><img src='/images/arrow.png'/></button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chatbot;
