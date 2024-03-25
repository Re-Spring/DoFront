import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../styles/mypage/CustomerService.css";

const CustomerService = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8001/customer-service-posts?page=${currentPage - 1}&limit=${postsPerPage}`);
        setPosts(res.data.posts);
        setTotalPosts(res.data.totalItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="customer-service">
      <div className="customer-service-header">
        <p className="customer-service-title">고객센터 게시판</p>
        <div className="button-container">
          <Link to="/CustomerServicePosts" className="create-post-link">글 생성</Link>
        </div>
      </div>
  
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>게시일</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map(post => (
              <tr key={post.boardCode}>
                <td>{post.boardCode}</td>
                <td>
                  <Link to={`/customer-service/${post.boardCode}`} className="post-title">
                    {post.title}
                  </Link>
                </td>
                <td>{new Date(post.postedDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <nav className="pagination-nav">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
              <li key={number} className={number === currentPage ? "page-item active" : "page-item"}>
                <a onClick={() => paginate(number)} href="#!" className="page-link">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default CustomerService;
