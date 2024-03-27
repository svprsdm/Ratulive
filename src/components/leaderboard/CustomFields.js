const CustomFields = {
  tabbatList: [
    { name: 'Daily' },
    { name: 'Weekly' },
    { name: 'Monthly' },
    { name: 'All Times' }
  ],
  // displayAdArray:[ "https://source.unsplash.com/1024x768/?nature",
  // "https://source.unsplash.com/1024x768/?water",
  // "https://source.unsplash.com/1024x768/?girl",
  // "https://source.unsplash.com/1024x768/?tree", ],
  title: 'LeaderBoard',
  // validations: {
  //   ageLimit: 'Age should be more than 18',
  // },
  variables: {
    Logo: require('../../../assets/icon.png'),
    Message: require('../../../assets/ratu_icons/leader_msg.png'),
    Crown: require('../../../assets/crown.png'),
    Girl: require('../../../assets/girl1.png'),
    GoldCrown: require('../../../assets/gold.png'),
    SilverCrown: require('../../../assets/silver.png'),
    BronzeCrown: require('../../../assets/bronze.png'),
    Pentagon1: require('../../../assets/top1a.png'),
    Pentagon2: require('../../../assets/top2a.png'),
    Pentagon3: require('../../../assets/top3a.png'),
  },
};
export default CustomFields;