import React, { useState, useEffect } from 'react';
import "../../styles/mypage/CustomerServicePosts.css";
import axios from 'axios';

const CustomerServicePosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  // 관리자 여부를 확인하는 상태 (실제 앱에서는 인증 시스템으로부터 이 값을 결정해야 함)
  const [isAdmin, setIsAdmin] = useState(false);

  // 텍스트 영역 높이 자동 조절 함수
  const adjustTextareaHeight = (e) => {
    e.target.style.height = 'inherit'; // 높이 초기화
    e.target.style.height = `${e.target.scrollHeight}px`; // 새 높이 설정
  };

  // 게시글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8001/customer-service-posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
      setLoading(false);
    };

    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin'); // 로컬 스토리지에서 관리자 여부를 가져옵니다.
      setIsAdmin(adminStatus === 'true'); // 'true' 문자열을 boolean으로 변환합니다.
    };


    fetchPosts();
    checkAdminStatus(); // 관리자 여부를 확인하는 함수를 호출합니다.
  }, []);

  // 게시글 생성 함수
  const createPost = async () => {
    const userCode = localStorage.getItem('userCode'); // 로컬 스토리지에 저장된 사용자 코드를 가져옵니다.
    try {

      const response = await axios.post('http://localhost:8001/customer-service-post', {
        title: newPostTitle,
        content: newPostContent,
        userCode: userCode // 서버로 보낼 요청에 userCode를 포함합니다.
      });
      setPosts([...posts, response.data]); // 새 게시글 배열에 추가
      setNewPostTitle('');
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating a post', error);
    }
  };

  // 게시글 삭제 함수
  const deletePost = async (boardCode) => {
    try {
      await axios.delete(`http://localhost:8001/customer-service-post/${boardCode}`);
      setPosts(posts.filter(post => post.boardCode !== boardCode)); // 삭제된 게시글 제외하고 배열 업데이트
    } catch (error) {
      console.error('Error deleting a post', error);
    }
  };

  // 로딩 중 화면
  if (loading) {
    return <div>Loading...</div>;
  }

  // 주 UI 반환
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
          onChange={(e) => {
            setNewPostContent(e.target.value);
            adjustTextareaHeight(e);
          }}
          placeholder="Content"
          style={{ resize: 'none' }}
        />
        {/* 관리자가 아닐 때만 글 생성 버튼을 보여줌 */}
        {!isAdmin && (
          <button className="button create-post" onClick={createPost}>글 생성</button>
        )}
      </div>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.boardCode} className="post-item">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <button className="button delete-button" onClick={() => deletePost(post.boardCode)}>글 삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerServicePosts;
