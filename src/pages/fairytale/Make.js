import React, { useCallback ,useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MakeAPI } from "../../apis/Makebook";


function Make(){

    // dispatch 쓰기 위해서 한 것
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [character, setCharacter] = useState('');
    const [genre, setGenre] = useState('');
    const [keyword, setKeyword] = useState('');
    const [lesson, setLesson] = useState('');
    const [page, setPage] = useState('6');

    const titleHandler = useCallback(async (e) => {
        const entTitle = e.target.value;
        setTitle(entTitle)
    });

    const characterHandler = useCallback(async (e) => {
        const entCharacter = e.target.value;
        setCharacter(entCharacter)
    });

    const genreHandler = useCallback(async (e) => {
        const entGenre = e.target.value;
        setGenre(entGenre)
    });

    const keywordHandler = useCallback(async (e) => {
        const entKeyword = e.target.value;
        setKeyword(entKeyword)
    });

    const lessonHandler = useCallback(async (e) => {
        const entLesson = e.target.value;
        setLesson(entLesson)
    });

    const pageHandler = useCallback(async (e) => {
        const entPage = e.target.value;
        setPage(entPage)
    });

    const makeHandler = async (e) => {
            // 폼 제출 이벤트 방지
            e.preventDefault();
            console.log("test",title, character, genre, keyword, lesson, page);

            const makeData = {
                title: title,
                character: character,
                genre: genre,
                keyword:keyword,
                lesson:lesson,
                page:page
            }
            dispatch(MakeAPI({
                makeData
        }));
    }

    return (
        <>
             <div>
                <h2>동화 만들기</h2>
                <form onSubmit={makeHandler}>

                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" placeholder="원하는 제목을 입력해주세요." value={title} onChange={titleHandler}/><br/>

                    <label htmlFor="character">주인공</label>
                    <input type="text" id="character" placeholder="원하는 주인공을 입력해주세요." value={character} onChange={characterHandler}/><br/>

                    <label htmlFor="genre">장르</label>
                    <select id="genre" value={genre} onChange={genreHandler}>
                        <option value="" default>선택안함</option>
                        <option value="romance">로맨스</option>
                        <option value="folktale">전래동화</option>
                        <option value="fantasy">판타지</option>
                        <option value="adventure">모험</option>
                        <option value="fable">우화</option>
                    </select>
                    <br/>

                    <label htmlFor="keyword">키워드</label>
                    <input type="text" id="keyword" value={keyword} placeholder="원하는 키워드를 입력해주세요." onChange={keywordHandler}/><br/>

                    <label htmlFor="lesson">교훈</label>
                    <input type="text" id="lesson" placeholder="교훈을 입력해주세요." value={lesson} onChange={lessonHandler}/><br/>

                    <label htmlFor="page">페이지 수</label>
                    <select id="page" value={page} onChange={pageHandler}>
                        <option value="6" default>6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select><br/>
                    <button type="submit">만들기</button>
                </form>
             </div>
        </>
    )
}

export default Make;