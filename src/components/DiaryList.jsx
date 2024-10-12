import React from 'react';
import styles from './DiaryList.module.css';
import iconEdit from '../images/icon-edit.svg';
import iconDelete from '../images/icon-delete.svg';
// eslint-disable-next-line no-unused-vars
import { deleteDocument, useFirestore } from '../hooks/useFirestore';
import getToday from '../util/formatDate';

export default function DiaryList({ diaries }) {
  const { deleteDocument } = useFirestore('diary');

  return (
    <ul className={styles['list']}>
      {diaries.map((item) => {
        const milliseconds =
          item.createdTime.seconds * 1000 +
          item.createdTime.nanoseconds / 1000_000;
        const createdDate = getToday(milliseconds);
        return (
          <li key={item.id}>
            <article className={styles['diary-article']}>
              <h3 className={styles['article-title']}>{item.title}</h3>
              <time className={styles['article-time']} dateTime="2023-03-15">
                {createdDate}
              </time>
              <p className={styles['article-content']}>{item.content}</p>

              <div className={styles['button-group']}>
                <button type="button">
                  <img src={iconEdit} alt="수정" />
                </button>
                <span></span>
                <button type="button" onClick={() => deleteDocument(item.id)}>
                  <img src={iconDelete} alt="삭제" />
                </button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
