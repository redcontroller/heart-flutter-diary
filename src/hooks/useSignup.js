import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  // 에러정보를 관리합니다.
  const [error, setError] = useState(null);
  // 통신 상태를 관리합니다.
  const [isPending, setIsPending] = useState(false);
  // 유저정보를 전역에서 활용할 수 있도록 dispatch 함수를 통해 업데이트
  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    setError(null); // 아직 에러가 없으니 null
    setIsPending(true); // 통신 중이므로 true
    // 비밀번호 설정, 유저 정보 등록.
    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // 회원 정보를 정상적으로 받지 못할 경우. 실패
        if (!user) {
          throw new Error('회원정보를 불러올수 없습니다.');
        }

        // 회원 정보 업데이트 함수
        // appAuth.currentUser : 현재 로그인한 유저
        updateProfile(appAuth.currentUser, { displayName })
          .then(() => {
            // action으로 전달될 인자를 작성
            dispatch({ type: 'login', payload: user });
            setError(null);
            setIsPending(false);
          })
          .catch((err) => {
            setError(err.message);
            setIsPending(false);
            console.error(err);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
        console.error(err);
      });
  };

  return { error, isPending, signup };
};
