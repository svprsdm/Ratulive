const CustomFields = {
  validations: {
    ageLimit: 'Age should be more than 18',
  },
  data: [
    { money: 1000, transaction_method: 'credit', purpose: 'From The Event', credit_card: 'xxxxxxxxxxxx99' },
    { money: 600, transaction_method: 'debit', purpose: 'none', credit_card: 'xxxxxxxxxx9899' },
    { money: 1000, transaction_method: 'credit', purpose: 'none', credit_card: 'xxxxxxxxxxx999' },
  ],
  variables: {
    // imageUrl: require('./../../../../assets/ratu.gif'),
    Logo: require('../../../assets/icon.png'),
    Wallet: require('../../../assets/walet.png'),
    Up: require('../../../assets/upIcon.png'),
    Down: require('../../../assets/downIcon.png'),
    Withdraw: require('../../../assets/ratu_icons/withdraw_2.png'),
    Add: require('../../../assets/Combined-Shape.png')
  },
};
export default CustomFields;