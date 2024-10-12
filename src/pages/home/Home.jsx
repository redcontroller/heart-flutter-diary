import React from 'react';
import styles from './Home.module.css';
import DiaryForm from '../../components/DiaryForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import DiaryList from '../../components/DiaryList';
import formatDate from '../../util/formatDate';

export default function Home() {
  const timestamp = Date.now(); // 현재
  const today = formatDate(timestamp);
  const { user } = useAuthContext();
  // eslint-disable-next-line no-unused-vars
  const { documents, err } = useCollection('diary', ['uid', '==', user.uid]);
  // console.log(err);

  return (
    <main className={styles['main'] + ' max-width'}>
      <section className={styles['main-form']}>
        <h2 className={styles['heart-title']}>{today}의 비밀일기</h2>
        <DiaryForm uid={user.uid} />
      </section>
      <section className={styles['main-diary']}>
        <h2 className="a11y-hidden">일기 목록</h2>
        {documents && documents.length !== 0 ? (
          <DiaryList diaries={documents} />
        ) : (
          <span className={styles.message}>
            작성한 일기가 아직 없네요. 새로운 일기를 작성해 볼까요? 🤗
          </span>
        )}
        {/* {err && <strong>{String(err)}</strong>} */}
        {err && (
          <strong className={styles.message}>
            에러가 발생 했어요... 관리자에게 문의하세요 😥
          </strong>
        )}
      </section>
    </main>
  );
}
