import React, { useState, useEffect } from 'react';
import "../../styles/mypage/CustomerServicePosts.css";
import axios from 'axios';

const CustomerServicePosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const adjustTextareaHeight = (e) => {
    e.target.style.height = 'inherit'; // 높이 초기화
    e.target.style.height = `${e.target.scrollHeight}px`; // 새 높이 설정
  };
  // 기존의 게시글을 불러오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/customer-service-posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // 글 생성 함수
  const createPost = async () => {
    try {
      const response = await axios.post('/api/customer-service-posts', {
        title: newPostTitle,
        content: newPostContent
      });
      setPosts([...posts, response.data]);
      setNewPostTitle('');
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating a post', error);
    }
  };

  // 글 삭제 함수
  const deletePost = async (boardCode) => {
    try {
      await axios.delete(`/api/customer-service-posts/${boardCode}`);
      setPosts(posts.filter(post => post.boardCode !== boardCode));
    } catch (error) {
      console.error('Error deleting a post', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        {/* onChange 이벤트 핸들러에 adjustTextareaHeight 함수 호출 추가 */}
        <textarea
          className="input-field"
          value={newPostContent}
          onChange={(e) => {
            setNewPostContent(e.target.value);
            adjustTextareaHeight(e);
          }}
          placeholder="Content"
          style={{ resize: 'none' }} // 크기 조절 기능 비활성화
        />
        <button className="button create-post" onClick={createPost}>글 생성</button>
      </div>
      {posts.length > 0 ? (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.boardCode} className="post-item">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.content}</p>
              <button className="button delete-button" onClick={() => deletePost(post.boardCode)}>글 삭제</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
};


export default CustomerServicePosts;
