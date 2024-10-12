import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  // 에러정보를 관리합니다.
  const [error, setError] = useState(null);
  // 통신 상태를 관리합니다.
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // appAuth 객체를 통해 사용자 정보를 확인
  // console.log(appAuth.currentUser);
  // setInterval(() => {
  //   console.log(appAuth.currentUser);
  // }, 1000);

  const login = (email, password) => {
    setError(null); // 아직 에러가 없으니 null
    setIsPending(true); // 통신 중이니 true

    // 회원가입 처리 함수
    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        // 로그인
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: 'login', payload: user });
        setError(null);
        setIsPending(false);
        // 회원 정보를 정상적으로 받지 못하면 실패
        if (!user) {
          throw new Error('로그인에 실패했습니다.');
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
        console.error(err);
      });
  };

  return { error, isPending, login };
};
