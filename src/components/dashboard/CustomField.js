const CustomFields = {
  variables: {
    tabbatList: [
      // {name: 'None'},
      { name: 'Popular' },
      { name: 'Follow' },
      // {name: 'New'},
      { name: 'Nearby' },
    ],
    displayAdArray: [
      require('../../../assets/ratu_banner_1.webp'),
      require('../../../assets/ratu_banner_2.jpg'),
      require('../../../assets/hear.jpg'),
      require('../../../assets/areuready.jpg'),
      // require('../../../assets/meetnew.png'),
      // 'https://source.unsplash.com/1024x768/?water',
      // 'https://source.unsplash.com/1024x768/?girl',
      // 'https://source.unsplash.com/1024x768/?tree',
    ],
    imageList: [
      {
        author: 'Lisa',
        download_url: require('../../../assets/girl1.png'),
        id: '102',
        url: 'https://www.google.com'
      },
      {
        author: 'Andrea',
        download_url: require('../../../assets/girl2.png'),
        id: '103',
      },
      {
        author: 'Sona',
        download_url: require('../../../assets/girl3.png'),
        id: '104',
      },
      {
        author: 'Linda',
        download_url: require('../../../assets/girl4.png'),
        id: '105',
      },
      {
        author: 'Ben Moore',
        download_url: require('../../../assets/girl5.png'),
        id: '106',
      },
      {
        author: 'Asin',
        download_url: require('../../../assets/girl6.png'),
        id: '107',
      },
      {
        author: 'Nayanthara',
        download_url: require('../../../assets/girl7.png'),
        id: '108',
      },
      {
        author: 'Hanisika',
        download_url: require('../../../assets/girl8.png'),
        id: '109',
      },
      {
        author: 'Anushka',
        download_url: require('../../../assets/girl9.png'),
        id: '110',
      },
    ],
    title: 'Kuala Lumpur',
    noGPS: ' No GPS connection ',
    PhoneNumber: 'Enable Location',
    Logo: require('../../../assets/icon.png'),
    live: require('../../../assets/live.png'),
    location: require('../../../assets/editState.png'),
    search: require('../../../assets/search.png'),
    notification: require('../../../assets/notification.png'),
  },
};
export default CustomFields;
