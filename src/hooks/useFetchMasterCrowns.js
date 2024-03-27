import React, { useState, useEffect } from 'react';
import { getMasterCrowns } from '../utils/api';
import { useAuth } from './Auth';
export default function useFetchMasterCrowns() {
  const [allMasterCrowns, setAllMasterCrowns] = useState(0);
  const auth = useAuth();
  useEffect(() => {
    if (auth?.user) {
      fetchMasterCrowns();
    }
  }, [auth?.user, fetchMasterCrowns]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMasterCrowns = async () => {
    try {
      const response = await getMasterCrowns();
      console.log(
        '🚀 ~ file: Wallet.js ~ line 22 ~ fetchMasterCrowns ~ crowns',
        response,
      );
      setAllMasterCrowns(response);
    } catch (error) {
      console.log('error fetching crowns useFetchMasterCrowns', error);
    }
  };
  return {
    allMasterCrowns,
    fetchMasterCrowns,
  };
}
