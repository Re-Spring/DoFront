import React, { useState, useEffect } from 'react';
import "../../styles/mypage/CustomerServicePostDetail.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 코멘트 상태 추가
  const [loading, setLoading] = useState(false);
  const { boardCode } = useParams(); // URL 파라미터에서 boardCode를 가져옵니다.

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true);
      try {
        const postResponse = await axios.get(`http://localhost:8001/customer-service-posts/${boardCode}`);
        if (!postResponse.data || postResponse.data.error) {
          throw new Error('Post not found.');
        }
        setPost(postResponse.data);
        // 게시글의 댓글 가져오기 로직은 백엔드에 해당 엔드포인트가 구현되어 있어야 합니다.
        // const commentsResponse = await axios.get(`http://localhost:8001/customer-service-posts/${boardCode}/comments`);
        // setComments(commentsResponse.data || []);
        setComments(postResponse.data.comments || []);
      } catch (error) {
        setPost(null);
        setComments([]);
      }
      setLoading(false);
    };
  
    fetchPostDetail();
  }, [boardCode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>게시글을 불러올 수 없습니다.</div>;
  }

  // 상세 내용을 보여주는 UI를 반환합니다.
  return (
    <div className="inquireDetail">
      <div className='inquireDetailBox'>
        <div>
          <input value={post.title} className="writeTitle" />
        </div>
        <div>
          <input value={post.content} className="writeContent" />
        </div>
        <div className='adminComentBox'>
          <div><p>관리자 답글</p></div>
          <div className="adminComent">
            {(post.comment && post.comment != null) ? (
              <div key={post.id}>
                    <p>{post.comment}</p>
                  </div>
              ) : (
                <p>답글이 아직 없습니다.</p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
