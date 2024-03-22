import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVoiceAPI, expiredVoiceAPI } from '../../apis/AdminAPI';
import Swal from 'sweetalert2';
import "../../styles/admin/admin.css"
import "../../styles/common/Common.css";

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
            showDenyButton: true,
            denyButtonText: "취소"
        }).then(result => {
            if(result.isConfirmed){
                dispatch(deleteVoiceAPI(voiceId));
            }
        });
    }

    return (
        <div className='userInfoBox'>
            <p className='userInfoTitle'>회원 정보 관리</p>
            <h2 className='deleteTitle'>탈퇴 회원 보이스 데이터 삭제</h2>
            <br/>
            <div className='userInfoTable'>
                <div className='userInfoTxt'>
                    <a>만료 보이스 데이터 누적 수 : {expVoices[0]?.no}</a>
                    <a>삭제 처리된 데이터 총 건수 : {expVoices[0]?.no - expVoices?.length}</a>
                </div>
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
                                        <td>{totalItems - (startIndex + index)}</td>
                                        <td>{voices.voiceId.slice(0, -5) + "*****"}</td>
                                        <td>
                                            <button className='deleteBtn' onClick={() => deleteVoiceHandler(voices.voiceId)}>아이디 삭제</button>
                                        </td>
                                    </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="3" style={{textAlign: 'center'}}>
                                    <h6>내역이 존재하지 않습니다.</h6>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ul className='pagination'>
                <li className='icon' onClick={() => handlePageChange(currentPage -1)}><a>&lt;</a></li>
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
                <li onClick={() => handlePageChange(currentPage +1)}><a>&gt;</a></li>
            </ul>
        </div>
    );
};

export default UserInfo;
