import React, { useState, useEffect } from 'react';
import { getUserCrowns } from '../utils/api';
import { useAuth } from './Auth';
export default function useFetchCrowns() {
  const [allCrowns, setAllCrowns] = useState(0);
  const auth = useAuth();
  useEffect(() => {
    if (auth?.user) {
      fetchCrowns();
    }
  }, [auth?.user, fetchCrowns]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCrowns = async () => {
    try {
      const [{ crowns }] = await getUserCrowns({
        uid: auth?.user,
      });
      console.log(
        '🚀 ~ file: Wallet.js ~ line 24 ~ fetchCrowns ~ crowns',
        crowns,
      );
      setAllCrowns(crowns);
      return crowns;
    } catch (error) {
      console.log('useFetchcrowns', error);
    }
  };
  return {
    allCrowns,
    fetchCrowns,
  };
}
