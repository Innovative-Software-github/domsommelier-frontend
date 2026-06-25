'use client';

import { useEffect, useState } from 'react';
import { getLatestNews } from '@/services/news/requests';
import { INews } from '@/services/news/interfaces';

/** Клиентская загрузка свежих новостей для свайпера на главной. */
export const useLatestNews = (limit = 10) => {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getLatestNews(limit)
      .then((items) => {
        if (active) setNews(items);
      })
      .catch(() => {
        if (active) setNews([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [limit]);

  return { news, loading };
};
