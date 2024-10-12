import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={'max-width ' + styles['max-width']}>
        <h1>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="두근두근 비밀일기" />
          </Link>
        </h1>
        <div className={styles['login-text']}>
          {/* 유저 정보가 없는 상태 즉, 로그아웃 상태라면 */}
          {!user ? (
            <>
              {location.pathname !== '/login' && (
                <Link to="/login" className={styles['btn-login']}>
                  로그인
                </Link>
              )}
              {location.pathname !== '/signup' && (
                <Link to="/signup" className={styles['btn-join']}>
                  회원가입
                </Link>
              )}
            </>
          ) : (
            <>
              <p>
                환영합니다 <strong>{user.displayName}</strong>님!
              </p>
              <Link to="/" className={styles['btn-logout']} onClick={logout}>
                로그아웃
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
