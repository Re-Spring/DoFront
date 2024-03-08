import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RequireAuth({ children }) {
  // 로딩 상태와 사용자 상태를 가져옵니다.
  const { user, loading } = useAuth();
  console.log("AuthContext user : ", user);

  // 로딩 중인 경우, 로딩 인디케이터 혹은 아무것도 렌더링하지 않음
  if (loading) {
    // 실제 앱에서는 로딩 인디케이터 컴포넌트를 사용할 수 있습니다.
    return <div>Loading...</div>; 
  }
  
  // 로딩이 완료되었으나 사용자가 로그인하지 않은 경우, 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // 사용자가 로그인한 경우, 자식 컴포넌트를 렌더링
  return children;
}

export function PublicRoute({ children }) {
  const { user } = useAuth();
  
  if (user) {
    // 이미 로그인한 사용자는 홈 페이지로 리다이렉트
    return <Navigate to="/" />;
  }
  
  return children;
}