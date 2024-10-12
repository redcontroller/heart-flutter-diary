import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  // 에러정보를 관리합니다.
  const [err, setError] = useState(null);
  // 현재 서버와 통신 상태를 관리합니다.
  const [isPending, setIsPending] = useState(false);
  // 유저정보를 전역에서 활용할 수 있도록 dispatch 함수를 통해 업데이트
  // 여기서 유저의 상태를 로그아웃으로 업데이트
  const { dispatch } = useAuthContext();

  // 로그아웃
  const logout = () => {
    setError(null); // 에러가 없으니 null
    setIsPending(true); // 통신 중이므로 true
    // firebase 로그아웃
    signOut(appAuth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: 'logout' });
        setError(null);
        setIsPending(false);
      })
      .catch((error) => {
        // An error happened.
        setError(error.message);
        setIsPending(false);
        console.error(error);
      });
  };

  return { err, isPending, logout };
};
