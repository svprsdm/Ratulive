import axios from 'axios';
// the prefix of the URL
// Active
// axios.defaults.baseURL = 'http://139.59.120.48:3000';
// axios.defaults.baseURL = 'http://15.206.159.8:3000';
//axios.defaults.baseURL = 'http://jenkins.ratulive.com:3000';
axios.defaults.baseURL = 'https://bgwebapi.ratulive.com';
// axios.defaults.baseURL = 'http://nodeapp-env.eba-fu97kcqp.ap-south-1.elasticbeanstalk.com/';
axios.defaults.headers.get['Accept'] = 'application/json'; // default header for all get request
axios.defaults.headers.post['Accept'] = 'application/json'; // default header for all POST request
export const makePayment = async (body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const { data } = await axios
      .post('/api/doPayment', body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in making payment', error);
  }
};

export const checkOutPayment = async (body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const { data } = await axios
      .post('/api/doCheckOutPayment', body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in making payment', error);
  }
};

export const addUser = (body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  console.log('User details body on API JS file', body.uid);
  console.log('User details body on API JS file', body.phoneNumber);
  return axios
    .post('/ratu_user/validate', body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in adding user', error);
    });
};
export const deleteUserStory = (uid, moment) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    moment: moment ?? '',
  };
  return axios
    .post(
      `/ratu_user/moments/remove/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user', error);
    });
};
export const updateUser = ({ uid, name, phoneNumberVal, gender, newEmail, newState, country, city, age, dob, userno, udob, uuserno, uage, displayName, email, phoneNumber }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    name: name || displayName,
    phone: phoneNumberVal || phoneNumber,
    gender: gender ?? '',
    email: newEmail || email,
    address: newState ?? '',
    country: country ?? '',
    city: city ?? '',
    age: age ?? uage,
    dob: dob ?? udob,
    userno: userno ?? uuserno,
  };
  return axios
    .post(
      `/ratu_user/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user', error);
    });
};
export const updateAgent = ({ username, uid, icnumber, companyname, mobile, gender, useremail, address,userno }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    name: username || '',
    uid: uid || '',
    ic_number: icnumber || '',
    company_name: companyname || '',
    mobile: mobile || '',
    gender: gender ?? '',
    email: useremail || '',
    address: address ?? '',
    userno: userno ?? 0,
  };
  return axios
    .post(
      '/agent/add', body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating Agent', error);
    });
};
export const streamerrequestforagent = ({ uid, streameruid,streamerid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    streamerid: streameruid ?? '',
    streameruid: streamerid ?? '',
  };
  return axios
    .post(
      `/agent/streamer_requests/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating streamer_requests', error);
    });
};
export const updateUserPic = ({ uid, displayimage }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    profile_pic: displayimage ?? '',
  };
  return axios
    .post(
      `/ratu_user/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user', error);
    });
};
export const updatefollower = ({ uid, vieweruid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    followers: vieweruid ?? '',
  };
  return axios
    .post(
      `/followers/ratu_user/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating follower', error);
    });
};
export const updatefollowing = ({ uid, streameridd }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    following: streameridd ?? '',
  };
  return axios
    .post(
      `/following/ratu_user/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating following', error);
    });
};
export const updatekickout = ({ id, userid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    kickedoutuser: userid ?? '',
  };
  return axios
    .post(
      `/publisher/kickedoutuser/app/update/${id}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating kickedoutuser', error);
    });
};

export const updateekickout = ({ id, userid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    kickedoutuser: userid ?? '',
  };
  return axios
    .post(
      `/active_streamers/kickedoutuser/app/update/${id}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating kickedoutuser', error);
    });
};

export const updatereport = ({ id, userid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    reporteduser: userid ?? '',
  };
  return axios
    .post(
      `/publisher/reporteduser/app/update/${id}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating reporteduser', error);
    });
};
export const deletefollowing = ({ uid, streameridd }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    followerId: streameridd ?? '',
  };
  return axios
    .post(
      `/following/remove/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in deleting following', error);
    });
};
export const deletefollower = ({ uid, vieweruid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    followerId: vieweruid ?? '',
  };
  return axios
    .post(
      `/follower/remove/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in deleting follower', error);
    });
};
export const getfollowingdetails = async ({ uid, followinginfo }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    follow: followinginfo ?? '',
  };
  return await axios
    .post(
      `/following/ratu_user/details/${uid}`, body, { headers })
    .then(async ({ data }) => {
      return await data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating following', error);
    });
};
export const getfollowerdetails = async ({ uid, followerinfo }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    followers: followerinfo ?? '',
  };
  return await axios
    .post(
      `/followers/ratu_user/details/${uid}`, body, { headers })
    .then(async ({ data }) => {
      return await data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating following', error);
    });
};
export const updateViewergifts = async ({ token_id, userid, pearl }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    userid: userid ?? '',
    pearl: pearl ?? ''
  };
  return await axios
    .post(
      `/streamer_gift/publisher/update/${token_id}`, body, { headers })
    .then(async ({ data }) => {
      return await data;
    })
    .catch((error) => {
      return Promise.reject('Error in updateViewergifts', error);
    });
};
export const getviewerlistdetails = async ({ viewerlistinfo }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    viewerlist: viewerlistinfo ?? '',
  };
  return await axios
    .post(
      '/viewerlist/details', body, { headers })
    .then(async ({ data }) => {
      return await data;
    })
    .catch((error) => {
      return Promise.reject('Error in viewerlist', error);
    });
};
export const getfollower = ({ uid }) => {
  return axios
    .get(`/ratu_user/followers/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching user follower', error);
    });
};
export const getrecentlogs = ({ uid }) => {
  return axios
    .get(`/ratu_user/purchased_crowns/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching recent logs', error);
    });
};

export const getstreaminglogs = ({ uid }) => {
  return axios
    .get(`/ratu_user/received_crowns/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching recent logs', error);
    });
};

export const getpaidviewer = ({ id }) => {
  return axios
    .get(`/publisher/paidviewer/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching user follower', error);
    });
};
export const getfollowing = ({ uid }) => {
  return axios
    .get(`/ratu_user/following/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching user following', error);
    });
};

export const updateWithdrawformm = ({uid,fullname,amount,bankname,accountnumber,branchname,swiftcode,email,phonenumber,status,ringgitbalance,address,userid}) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body ={
    uid:uid,
    fullname:fullname || '',
    amount:amount || '',
    bankname:bankname || '',
    accountnumber:accountnumber || '',
    branchname:branchname || '',
    swiftcode:swiftcode || '',
    email:email || '',
    phonenumber:phonenumber || '',
    status:status,
    ringgitbalance:ringgitbalance || '',
    address:address || '',
    userid:userid || '',
  };
  return axios
    .post(
    '/withdraw/validate',body,{headers})
    .then(({data}) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user', error);
    });
};

export const updateBindNumber = ({ uid, phone }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    phone: phone ?? '',
  };
  return axios
    .post(
      `/ratu_user/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user', error);
    });
};
export const updateWithdrawnringgit = ({ uid, ringgits_earned }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    ringgits_earned: ringgits_earned  ?? 0,
  };
  return axios
    .post(
      `/ratu_user/update/withdrawnringgit/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user', error);
    });
};

export const updateWallet = async ({ uid, wallet }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    wallet: wallet ?? 0,
  };
  return await axios
    .post(
      `/ratu_user/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user', error);
    });
};
export const updateMoments = async ({ uid, url }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    moments: url ?? '',
  };
  return await axios
    .post(
      `/api/v1/moments/ratu_user/moments/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user moments', error);
    });
};
export const updatePearlCount = async ({ uid, pearl_count }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    pearl_count: pearl_count ?? 0,
  };
  try {
    const { data } = await axios
      .post(
        `/pearl_count/update/ratu_user/${uid}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating user pearl', error);
  }
};

export const ReplacePearlCount = ({ uid, pearl_count }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    pearl_count: pearl_count ?? 0,
  };
  return axios
    .post(
      `/pearl_count/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating user pearl', error);
    });
};

export const updateRinggitEarned = async ({ uid, ringgitearned }) => {
  
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    ringgits_earned: ringgitearned ?? 0,
  };
  try {
    const { data } = await axios
      .post(
        `/ringgits_earned/update/ratu_user/${uid}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating user pearl', error);
  }
};

export const updateUserPearlAndRinggit = async ({ uid, pearl_count, token_id, ringgitearned }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const pearlCountBody = {
    pearl_count: pearl_count ?? 0,
  };
  const ringgitEarnedBody = {
    ringgits_earned: ringgitearned ?? 0,
  };

  try {
    const [pearlCountResponse, ringgitEarnedPublisherResponse, ringgitEarnedResponse] = await Promise.all([
      axios.post(`/pearl_count/update/ratu_user/${uid}`, pearlCountBody, { headers }),
      axios.post(`/ringgits_earned/update/publisher/${token_id}`, ringgitEarnedBody, { headers }),
      axios.post(`/ringgits_earned/update/ratu_user/${uid}`, ringgitEarnedBody, { headers })
    ]);

    return {
      pearlCount: pearlCountResponse.data,
      ringgitEarnedPublisher: ringgitEarnedPublisherResponse.data,
      ringgitEarned: ringgitEarnedResponse.data
    };
  } catch (error) {
    throw new Error('Error in updating user pearl and ringgit', error);
  }
};


export const updategiftingbalance = ({ uid, wallet }) => {
  
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    wallet: wallet ?? 0,
  };
  return axios
    .post(
      `/wallet/update/ratu_user/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating gifting balance', error);
    });
};

export const updateRinggitEarnedPublisher = async ({ token_id, ringgitearned }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    ringgits_earned: ringgitearned ?? 0,
  };
  try {
    const { data } = await axios
      .post(
        `/ringgits_earned/update/publisher/${token_id}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating user pearl', error);
  }
};

export const updateCurrentLocation = ({ uid, city }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    locationData: city ?? '',
  };
  return axios
    .post(
      `/ratu_user/update/current_location/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating current location', error);
    });
};

export const updateUserPurchasedcrowns = ({ uid, crowns }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    crowns: crowns ?? '',
  };
  return axios
    .post(
      `/purchased_crowns/ratu_user/update/${uid}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating purchased crowns', error);
    });
};
export const updateUserReceivedcrowns = async ({ uid, pearls }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    pearls: pearls ?? '',
  };
  try {
    const { data } = await axios
      .post(
        `/received_crowns/ratu_user/update/${uid}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating received pearls', error);
  }
};
export const selectUser = async ({ uid }) => {
  try {
    const { data } = await axios
      .get(`/ratu_user/${uid}`);
    return data;
  } catch (error) {
    return await Promise.reject('Error in fetching user', error);
  }
};
export const getUserDetails = ({ agentcode }) => {
  return axios
    .get(`/ratu_user/userno/${agentcode}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching user data via userno', error);
    });
};

export const getAgentData = ({ id }) => {
  return axios
    .get(`/getagentdata/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching agent data', error);
    });
};

export const deleteInactiveActivestreamer = ({ id }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post(`/activestreamers/remove/inactiveData/${id}`, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in deleting user', error);
    });
};

export const getMoments = ({ uid }) => {
  return axios
    .get(`/api/v1/moments/ratu_user/followers/moments/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching user', error);
    });
};
export const getUserMoments = ({ uid }) => {
  return axios
    .get(`/api/v1/moments/ratu_user/moments_list/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching user', error);
    });
};
export const getStreamer = async ({ id }) => {
  try {
    const { data } = await axios
      .get(`/publisher/${id}`);
    return data;
  } catch (error) {
    return await Promise.reject('Error in fetching publisher data', error);
  }
};
export const getExistingstream = (uid) => {
  return axios
    .get(`/activestreamers/exist/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching user', error);
    });
};
export const getUserCrowns = () => {
  return axios
    .get('/user_crowns')
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching user crowns', error);
    });
};
export const getMasterCrowns = () => {
  return axios
    .get('/crowns')
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching master crowns', error);
    });
};
export const addPublisher = async (body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const { data } = await axios
      .post('/publisher/add', body, { headers });
      console.log('return Data object from publisher insert', data);
    return data;
  } catch (error) {
    console.log('error Data object from publisher insert', data);
    return await Promise.reject('Error in adding publisher', error);
  }
};
export const addPublishers = async (body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const { data } = await axios
      .post('/publisher/add/activeData', body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in adding publisher active users', error);
  }
};

export const getActiveStreams = () => {
  return axios
    .get('/publisher/get/activeStreamerData')
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching active streams', error);
    });
};
export const getFollowActiveStreams = (uid) => {
  //const x = '/api/v1/user/secure/active-follow/' + uid;
  const headers = {
    'Content-Type': 'application/json',
  };
  
   return axios
    .post(`/publisher/get/activeStreams/follow/${uid}`,  {headers})   
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching following active streams', error);
    });
};
export const getLocationActiveStreams = (uid) => {
  const headers = {
    'Content-Type': 'application/json',
  }; 
  return axios
    .post(`/publisher/get/activeStreams/location/${uid}`, {headers})
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching location based active streamss', error);
    });
};
export const getPopularActiveStreams = (uid) => {
  const x = '/api/v1/user/secure/active-popular/' + uid;
  return axios
    .get(x)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching popular based active streamss', error);
    });
};
export const getActiveStreamsEndedpage = () => {
  return axios
    .get('/endedpage/activeStreams')
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching active streams', error);
    });
};
export const getstreamergifts = (token_id) => {
  return axios
    .get(`/publisher/streamer_gift/${token_id}`)
    // .get('/publisher/streamer_gift/tok_XUW8YJvNJYM0qaWr')
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching streamergifts', error);
    });
};
export const getActivesubscriber = ({ id }) => {
  return axios
    .get(`/subscribers/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching active subscriber', error);
    });
};
export const getstreamerlistdetails = ({ id }) => {
  return axios
    .get(`/publisher/get/viewers/${id}`)
    .then(({data}) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching subscriber details', error);
    });
};
export const updatesubscriberstatus = ({ id, status, userid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    status: status ?? '',
    userid: userid ?? '',
  };
  return axios
    .put(
      `/subscriber/exitStream/${id}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in updating subscriber', error);
    });
};
export const updatesubscriberpaidstatus = async ({ id, subscriber }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    paidviewer: subscriber ?? '',
  };
  try {
    const { data } = await axios
      .post(
        `/publisher/paidviewer/app/update/${id}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating subscriber', error);
  }
};

export const updateesubscriberpaidstatus = async ({ id, subscriber }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    paidviewer: subscriber ?? '',
  };
  try {
    const { data } = await axios
      .post(
        `/active_streamers/paidviewer/app/update/${id}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating subscriber', error);
  }
};

export const updateSubscriberPaidStatus = async ({ id, subscriber, endpoint }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    paidviewer: subscriber ?? '',
  };
  try {
    const { data } = await axios.post(endpoint, body, { headers });
    return data;
  } catch (error) {
    return Promise.reject('Error in updating subscriber', error);
  }
};

export const updateviewerlist = async ({ id, viewerlist }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    viewerlist: viewerlist ?? '',
  };
  try {
    const { data } = await axios
      .post(
        `/publisher/viewerlist/app/update/${id}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating viewerlist', error);
  }
};
export const deleteviewerlist = ({ id, vieweruid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    viewerid: vieweruid ?? '',
  };
  return axios
    .post(
      `/viewerlist/remove/${id}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in deleting viewerlist', error);
    });
};
export const updateHeartCount = async ({ id, heart_count, earnedcrowns, earnedpearls, pausestatus }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    heart_count: heart_count ?? 0,
    earned_crowns: earnedcrowns ?? '',
    earned_pearls: earnedpearls ?? '',
    pause_status: pausestatus ?? '',
  };
  try {
    const { data } = await axios
      .post(
        `/publisher/update/${id}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating heart count', error);
  }
};
export const getLeaderboard = (type) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    type: type ? type : 'week'
  };
  return axios
    .post(
      '/ratu_user/leader_board/details', body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in Leaderboard data', error);
    });
};
export const updatePrivatePearl = async ({ id, privateearnedpearl }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    pearls_via_private: privateearnedpearl ?? 0
  };
  try {
    const { data } = await axios
      .post(
        `/publisher/update/${id}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating user private pearl count in publisher', error);
  }
};

export const updateePrivatePearl = async ({ id, privateearnedpearl }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    pearls_via_private: privateearnedpearl ?? 0
  };
  try {
    const { data } = await axios
      .post(
        `/active_streamers/update/${id}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in updating user private pearl count in activestrems', error);
  }
};

export const updatePrivatePearlCounts = async ({ id, privateearnedpearl }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    pearls_via_private: privateearnedpearl ?? 0
  };
  
  try {
    const [publisherResponse, activeStreamersResponse] = await Promise.all([
      axios.post(`/publisher/update/${id}`, body, { headers }),
      axios.post(`/active_streamers/update/${id}`, body, { headers })
    ]);

    return {
      publisher: publisherResponse.data,
      activeStreamers: activeStreamersResponse.data
    };
  } catch (error) {
    throw new Error('Error in updating user private pearl count', error);
  }
};

// To update ended live status to publisher 
export const deleteActivePublisher = async ({ id,  uid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {   
    uid: uid ?? ''
  };
  try {
    const { data } = await axios
      .put(
        `/publisher/endStream/${id}`, body, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in fetching deleting active streamer', error);
  }
};

export const deletePublisherAndActivePublisher = async ({ id, earned_crowns, uid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const deletePublisherEndpoint = `/publisher/remove/activeData/${id}`;
  const deleteActivePublisherEndpoint = `/publisher/endStream/${id}`;

  const deletePublisherRequest = axios.post(deletePublisherEndpoint, { headers });
  const deleteActivePublisherRequest = axios.put(deleteActivePublisherEndpoint, {earned_crowns: earned_crowns ?? '0', uid: uid ?? '' }, { headers });

  try {
    await Promise.all([deletePublisherRequest, deleteActivePublisherRequest]);

    // Both requests completed successfully

    // You can return any relevant data or perform further actions here

  } catch (error) {
    throw new Error('Error in deletePublisherAndActivePublisher', error);
  }
};


// Update the Pearls and status in user table, publisher table while streamer end live
export const updateCrownsAndRinggitEarned = async ({ uid, pearls, token_id, earned_crowns,ringgitearned }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const updateCrownsEndpoint = `/received_crowns/ratu_user/update/${uid}`;
  const updateRinggitEarnedEndpoint = `/ringgits_earned/update/publisher/endlive/${token_id}`;     

  const updateCrownsRequest = axios.post(updateCrownsEndpoint, { pearls: pearls ?? '' }, { headers });
  const updateRinggitEarnedRequest = axios.post(updateRinggitEarnedEndpoint, {earned_crowns: earned_crowns ?? '', ringgits_earned: ringgitearned ?? 0 }, { headers });

  try {
    await Promise.all([updateCrownsRequest, updateRinggitEarnedRequest]);

    // Both requests completed successfully

    // You can return any relevant data or perform further actions here

  } catch (error) {
    throw new Error('Error in updateCrownsAndRinggitEarned', error);
  }
};

// Delete the record in active_streamers when streamer end live  - Not using
export const deletePublisher = async ({ id }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const { data } = await axios
      .post(`/publisher/remove/activeData/${id}`, { headers });
    return data;
  } catch (error) {
    return await Promise.reject('Error in deleting user', error);
  }
};

export const addSubscriber = (body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post('/subscriber/add', body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in adding subscriber', error);
    });
};

export const deleteActiveSubscriber = ({ id, earned_crowns, uid }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    crowns_spent: earned_crowns ?? 0,
    stream_token_id: uid ?? '',
  };
  return axios
    .put(`/subscriber/exitStream/${id}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject(
        'Error in fetching deleting active subscriber',
        error,
      );
    });
};
export const createSessionToken = async (body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post('/session_tokens', body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching session token', error);
    });
};
export const addGiftToDb = ({ id, crowns_spent, stream_token_id }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    crowns: crowns_spent ?? 0,
    stream_token_id: stream_token_id ?? '',
  };
  return axios
    .post(`/user_gifted/${id}`, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject('Error in adding gift to db', error);
    });
};
export const getStreamerEarnedCrowns = ({ id }) => {
  return axios
    .get(`/earned_crowns_active/${id}`)
    .then(({ data }) => {
      return data?.totalCrowns;
    })
    .catch((error) => {
      return Promise.reject('Error in fetching getStreamerEarnedCrowns', error);
    });
};
