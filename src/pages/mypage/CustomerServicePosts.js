import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // 변경된 import 문
import "../../styles/mypage/CustomerServicePosts.css";
import axios from 'axios';

const CustomerServicePosts = () => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  
  const navigate = useNavigate();

  // 게시글 생성 함수
  const createPost = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }

      const decoded = jwtDecode(accessToken);
      const userCode = decoded.userCode;

      await axios.post('http://localhost:8001/customer-service-posts', {
        title: newPostTitle,
        content: newPostContent,
        userCode: userCode,
      });

      // 입력 필드를 초기화합니다.
      setNewPostTitle('');
      setNewPostContent('');

      // 게시글 리스트 페이지로 이동
      navigate('/CustomerService');
    } catch (error) {
    }
  };

  return (
    <div className="customer-service">
      <p>1대1 문의 글 작성</p>
      <div className="input-group">
        <input
          className="input-field"
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="input-field"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Content"
          style={{ resize: 'none' }}
        />
        <button className="button create-post" onClick={createPost}>글 생성</button>
      </div>
    </div>
  );
};

export default CustomerServicePosts;
