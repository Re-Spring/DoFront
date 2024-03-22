import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVoiceAPI, expiredVoiceAPI } from '../../apis/AdminAPI';
import Swal from 'sweetalert2';
import "../../styles/admin/admin.css"

function UserInfo() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(expiredVoiceAPI());
    }, []);

    const expVoices = useSelector(state => state.admin);
    console.log("[UserInfo] expVoices 확인 : ", expVoices);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsperPage = 10;
    const totalItems = expVoices?.length;
    const totalPages = Math.ceil(totalItems / itemsperPage);
    const startIndex = (currentPage - 1) * itemsperPage;
    const endIndex = Math.min(startIndex + itemsperPage, totalItems);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    const deleteVoiceHandler = async (voiceId) => {
        Swal.fire({
            icon: 'question',
            title: "삭제하시겠습니까?",
            confirmButtonText: "확인",
            denyButtonText: "취소"
        }).then(result => {
            if(result.isConfirmed){
                dispatch(deleteVoiceAPI(voiceId));
            }
        });
    }

    return (
        <div>
            <p>회원 정보 관리</p>
            <h4>탈퇴 회원 보이스아이디 삭제</h4>
            <table>
                <colgroup>
                    <col width="30%"/>
                    <col width="30%"/>
                    <col width="40%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>VOICE_ID</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {expVoices && expVoices.length > 0 ? (
                        expVoices.slice(startIndex, endIndex).map(
                            (voices, index) => (
                                <tr key={voices.no}>
                                    <td>{index + 1}</td>
                                    <td>{voices.voiceId}</td>
                                    <td>
                                        <button onClick={() => deleteVoiceHandler(voices.voiceId)}>아이디 삭제</button>
                                    </td>
                                </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan="3">
                                <h6>내역이 존재하지 않습니다.</h6>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ul className='pagination'>
                <li className='icon' onClick={() => handlePageChange(currentPage -1)}></li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li
                        key={index}
                        onClick={() => handlePageChange(index +1)}
                    >
                        <a className={currentPage === index +1 ? "active" : ""}>
                            {index +1}
                        </a>
                    </li>
                ))}
                <li onClick={() => handlePageChange(currentPage +1)}></li>
            </ul>
        </div>
    );
};

export default UserInfo;