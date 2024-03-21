import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../styles/mypage/CustomerService.css";

const CustomerService = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8001/customer-service-post');
        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-service">
      <p className="customer-service-title">고객센터 게시판</p>
      <Link to="/CustomerServicePosts" className="create-post-link">글 생성</Link>
      {posts.length > 0 ? (
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <Link to={`/customer-service/${post.id}`} className="post-link">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content.slice(0, 100)}...</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-posts-message">No posts found.</p>
      )}
    </div>
  );
};

export default CustomerService;
