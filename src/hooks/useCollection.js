import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { appFireStore } from '../firebase/config';

export const useCollection = (transaction, myQuery) => {
  const [documents, setDocuments] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let q;
    if (myQuery) {
      q = query(
        collection(appFireStore, transaction),
        where(...myQuery),
        orderBy('createdTime', 'desc')
      ); // ["uid", "==", user.uid]
    }

    const unsubscribe = onSnapshot(
      myQuery ? q : collection(appFireStore, transaction),
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(result);
      },
      (error) => {
        setErr(error);
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { documents, err };
};
