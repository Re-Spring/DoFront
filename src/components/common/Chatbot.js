import React, { useState } from 'react';
import '../../styles/chatbots/Chatbot.css';
import openIcon from '../../images/chatbot.png';
import closeIcon from '../../images/chatbot.png';
// useSelector 사용이 주석 처리되어 있으므로, 필요한 경우 해당 코드를 활성화해야 합니다.
// import { useSelector } from 'react-redux';
import OpenAI from 'openai'; // OpenAI 라이브러리를 import합니다.

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    // OpenAI 인스턴스는 API 호출 시마다 새로 생성하는 것이 좋습니다.
    // const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY);

    const toggleChatbot = () => setIsOpen(!isOpen);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSend = async () => {
        const currentInputValue = inputValue.trim();
        if (!currentInputValue) return;
        
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
                setMessages(messages => [
                ...messages, 
                // { type: 'user', text: currentInputValue },
                { type: 'bot', text: response.choices[0].message.content } // 'message.content'가 아닌 'text'를 사용
            ]);
        } catch (error) {
            console.error("Error fetching response from OpenAI: ", error);
        }

        setInputValue(''); // 입력 필드 초기화
        };

        // setInputValue(''); // 입력 필드 초기화

    // Enter 키 이벤트 처리 함수입니다. 엔터키를 누를 때 handleSend 함수를 호출합니다.
    const onEnterKeyHandler = (e) => {
        if (e.key === "Enter") {
            console.log('Enter key');
            handleSend();
        }
    }
    console.log("inputValue. =====:" ,inputValue)
    console.log("messages. =====:" ,messages)

    return (
        <>
            <button onClick={toggleChatbot} className="toggleButtonStyle">
                <img src={isOpen ? closeIcon : openIcon} alt="Toggle" className="iconStyle"/>
            </button>
            {isOpen && (
                <div className="chat-content chatContentStyle">
                    {messages.map((msg, index) => (
                        <div className="line" key={index}>
                            <span className={`chat-box ${msg.type === 'user' ? 'mine' : ''}`}>{msg.text}</span>
                        </div>
                    ))}
                    <input
                        className="chat-box inputStyle"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyUp={onEnterKeyHandler} // onKeyUp 대신 onKeyDown을 사용하는 것을 고려할 수 있습니다.
                    />
                    <button id="send" onClick={handleSend} className="sendButtonStyle">전송</button>
                </div>
            )}
        </>
    );
}

export default Chatbot;
