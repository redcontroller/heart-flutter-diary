import React, { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';

export default function DiaryForm({ uid }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addDocument, response } = useFirestore('diary'); // 사용자 마음대로 컬랙션의 이름을 설정한다.

  const handleData = (event) => {
    if (event.target.id === 'diary-title') {
      setTitle(event.target.value);
    } else if (event.target.id === 'diary-content') {
      setContent(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDocument({ uid, title, content });
    setTitle('');
    setContent('');
    console.log(title, content);
  };

  useEffect(() => {
    if (response.success) {
      setTitle('');
      setContent('');
    }
  }, [response.success]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label className="a11y-hidden" htmlFor="diary-title">
          일기 제목
        </label>
        <input
          // '컬렉션 이름'-'속성'
          id="diary-title"
          type="text"
          placeholder="제목"
          required
          onChange={handleData}
          value={title}
        />
      </div>
      <div>
        <label className="a11y-hidden" htmlFor="diary-content">
          일기 내용
        </label>
        <textarea
          id="diary-content"
          placeholder="오늘의 비밀은 무엇인가요?"
          onChange={handleData}
          value={content}
        ></textarea>
      </div>
      <button className="black-btn" type="submit">
        작성하기
      </button>
    </form>
  );
}
