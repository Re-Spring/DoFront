import React, { useCallback ,useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import "../../styles/common/Common.css";
import "../../styles/mybook/Make.css";
import { jwtDecode } from "jwt-decode";
import { MakeAPI } from "../../apis/MakeAPI";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


function Make(){

    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
    // 로컬 스토리지에서 토큰 가져오기
    const storedToken = localStorage.getItem('fcmToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
    console.log("토큰값", token)

    const [title, setTitle] = useState('');
    const [character, setCharacter] = useState('');
    const [genre, setGenre] = useState('');
    const [keyword, setKeyword] = useState('');
    const [lesson, setLesson] = useState('');
    const [page, setPage] = useState('6');
    const [voice, setVoice] = useState('echo');
    const [titleMsg, setTilteMsg] = useState("");

    const titleHandler = useCallback(async (e) => {
        const entTitle = e.target.value;
        setTitle(entTitle);
    }, []);

    const characterHandler = useCallback(async (e) => {
        const entCharacter = e.target.value;
        setCharacter(entCharacter)
    }, []);

    const genreHandler = useCallback(async (e) => {
        const entGenre = e.target.value;
        setGenre(entGenre)
    }, []);

    const keywordHandler = useCallback(async (e) => {
        const entKeyword = e.target.value;
        setKeyword(entKeyword)
    }, []);

    const lessonHandler = useCallback(async (e) => {
        const entLesson = e.target.value;
        setLesson(entLesson)
    }, []);

    const pageHandler = useCallback(async (e) => {
        const entPage = e.target.value;
        setPage(entPage)
    }, []);

    const voiceHandler = useCallback(async (e) => {
        const entVoice = e.target.value;
        setVoice(entVoice)
    }, []);



    const user  = jwtDecode(localStorage.getItem("accessToken"));
    const userId = user.userId
    const userCode = user.userCode
    console.log(userId)
    const tempVoiceCode = localStorage.getItem('tempVoiceCode');

    const makeHandler = async (e) => {
            // 폼 제출 이벤트 방지
            e.preventDefault();
            console.log("test",title, character, genre, keyword, lesson, page, voice);
            console.log("token", token)

            if (title === '') {
                alert('제목을 입력해주세요');
                return; // 제목이 비어있으면 여기서 함수 실행을 중단
            } else if (genre === '') {
                alert('장르를 선택해주세요');
                return; // 장르가 비어있으면 여기서 함수 실행을 중단
            }else{
                const makeData = {
                    title: title,
                    character: character,
                    genre: genre,
                    keyword:keyword,
                    lesson:lesson,
                    page:'7',
                    voice:voice,
                    userId:userId,
                    userCode:userCode,
                    token:token
            };
            Swal.fire({
                icon: 'success',
                title: "동화 생성 중입니다...✨",
                text: "🛎️동화가 생성되면 알람으로 알려드려요!🛎️",
                confirmButtonText: "확인"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/"); // 사용자가 확인 버튼을 클릭하면 메인 페이지로 이동
                }
            });
            dispatch(MakeAPI({
                makeData, navigate
        }));
        }
    }

    return (
        <>
            <div className='makeBox'>
                <p className='fairyTaleMake'>동화 만들기</p>
                <form onSubmit={makeHandler}>
                    <div className='promptBox'>
                        <div>
                            <p className='textName'><label htmlFor="title">제목</label></p>
                            <input type="text" className='inputBox' id="title" placeholder="원하는 제목을 입력해주세요." value={title} onChange={titleHandler}/>
                        </div>
                        <div className='choice'>
                            <p className='textName'><label htmlFor="genre">장르</label></p>
                            <select id="genre" className='optionBox' value={genre} onChange={genreHandler}>
                                <option value='' default disabled hidden>선택해주세요</option>
                                <option value="romance">로맨스</option>
                                <option value="folktale">전래동화</option>
                                <option value="fantasy">판타지</option>
                                <option value="adventure">모험</option>
                                <option value="fable">우화</option>
                                <option value="family">가족</option>
                            </select>
                        </div>
                        <div>
                        <p className='textName'><label htmlFor="character">주인공</label></p>
                            <input type="text" className='inputBox' id="character" placeholder="원하는 주인공을 입력해주세요." value={character} onChange={characterHandler}/>
                        </div>

                        <div>
                            <p className='textName'><label htmlFor="keyword">키워드</label></p>
                            <input type="text" className='inputBox' id="keyword" value={keyword} placeholder="원하는 키워드를 입력해주세요." onChange={keywordHandler}/>
                        </div>
                        <div>
                            <p className='textName'><label htmlFor="lesson">교훈</label></p>
                            <input type="text" className='inputBox' id="lesson" placeholder="교훈을 입력해주세요." value={lesson} onChange={lessonHandler}/>
                        </div>
                        <div className='choice'>
                            <p className='textName'><label htmlFor="voice">목소리 선택</label></p>
                            <select id="voice" className='optionBox' value={voice} onChange={voiceHandler}>
                                <optgroup label="인공지능 목소리">
                                    <option value="echo">Echo</option>
                                    <option value="alloy">Alloy</option>
                                    <option value="fable">Fable</option>
                                    <option value="onyx">Onyx</option>
                                    <option value="nova">Nova</option>
                                    <option value="shimmer">Shimmer</option>
                                </optgroup>
                                {tempVoiceCode || (user.userVoiceId && user.userVoiceId != null) ? (
                                    <optgroup label="등록한 목소리">
                                        <option value="myVoice">내 목소리</option>
                                    </optgroup>
                                ) : (
                                    <optgroup label="등록한 목소리가 없어요"></optgroup>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='makeBtnBox'>
                        <button type="submit" className='makeBtn'>만들기</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Make;