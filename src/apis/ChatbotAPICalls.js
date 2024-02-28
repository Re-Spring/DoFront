// import axios from 'axios';
// import OpenAI from "openai";
// import { Configuration, OpenAIApi} from 'https://cdn.skypack.dev/openai';
// import { GET_CHATBOT_SUCCESS } from '../modules/ChatbotModule';

// export const callGetChatbotAPI = (userInput) => {

//     return async (dispatch) => {
//         try {
//             const configuration = new Configuration({
//                 apiKey: process.env.REACT_APP_OPENAI_API_KEY,
//             });
//             console.log("API 키 확인 : ", apiKey);

//             const openai = new OpenAIApi(configuration);

//             const response = await openai.createChatCompletion({
//                 model: "gpt-3.5-turbo",
//                 messages: [{
//                     role: "user",
//                     content: userInput,
//                 }],
//             });
//             console.log('[ChatbotAPICalls] callGetChatbotAPI RESULT : ', response);
//             // 디스패치를 통해 챗봇 응답을 Redux 스토어로 전송
//             dispatch({ 
//                 type: GET_CHATBOT_SUCCESS, 
//                 payload:{userMessage : userInput, botResponse : response.data.choices[0].message.content}
//             });
            
//         } catch (error) {
//             console.error("Error fetching response from OpenAI : ", error)
//         }
//     };
// }
