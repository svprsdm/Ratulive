import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styles from './Wallet.style';
import CustomFields from './CustomFields';
import useFetchCrowns from '../../hooks/useFetchCrowns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { selectUser, getrecentlogs } from '../../utils/api';
import { useAuth } from '../../hooks/Auth';
const Wallet = (props) => {
  const { allCrowns, fetchCrowns } = useFetchCrowns();
  const [crowns, setCrowns] = React.useState(allCrowns);
  const auth = useAuth();
  const { uid } = auth?.user;
  const [usercrowns, setUsercrowns] = React.useState(0);
  const [logdata, setlogdata] = React.useState('');
  const [logdataa, setlogdataa] = React.useState([]);
  const [logdataaa, setlogdataaa] = React.useState('');
  const obj = {};
  const array = [];
  //const usercrowns = props.route.params;
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      const crwns = await fetchCrowns();
      setCrowns(crwns);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [allCrowns, fetchCrowns, props.navigation]);
  React.useEffect(() => {
    fetchuserDetails();
    fetchrecentlogs();
  });
  const fetchrecentlogs = async () => {
    try {
      const userlogs = await getrecentlogs({ uid });
      if (userlogs.error) {
        // console.log('error');
      } else {
        // console.log('userlogs',userlogs);
        // console.log('userlogs',userlogs.data.purchasedCrowns);
        setlogdataa(userlogs.data.purchasedCrowns.reverse());
        //   setlogdata(userlogs.data.purchasedCrowns);
        //   console.log('userlogs',logdata);
        //   var r= Object.entries(userlogs.data.purchasedCrowns);
        //   var len=r.length;
        //   var logData=[];
        //   if(len>0){
        //   for(var i=0; i<len; i++){
        // var s1= r[i][0];
        // var date=new Date(s1).toDateString();
        // var time=new Date(s1).toTimeString();
        // var s2= r[i][1];
        // var xc={};console.log("data");
        // xc["time"]=time;
        // xc["date"]=date;
        // xc["money"]=s2; 
        // logData.push(xc);
        //  }
        //  setlogdataa(logData);
        //  console.log('final data', Date(r[0][0]));
        //  console.log('final data',logdataa);
        // }
        // const slicedd=Object.entries(userlogs.data.purchasedCrowns).slice(0).map(entry => entry[0]);
        // const sliced=Object.entries(userlogs.data.purchasedCrowns).slice(1).map(entry => entry[1]);
        // console.log('logs',sliced);
        // setlogdataa(sliced);
        // setlogdataaa(slicedd);
        // console.log('logs',sliced);
        // console.log('logs',slicedd);
        // console.log('logs',sliced.length);
        // const arr=[];
        // for(let i=0;i<=logdata.length;i++){
        //   obj.time = logdataa[i];
        //   obj.crowns = logdataaa[i];
        //   arr.push(obj);
        // }
        // console.log('userlogs',array);
        // fetchuserDetails(userfollowerinfo[0].follower);
      }
    } catch (error) {
      // console.log('Error while fetching user logs', error);
    }
  }
  async function fetchuserDetails() {
    /*for getting user info*/
    // console.log('select user');
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        // console.log('error');
      } else {
        // console.log('Response',userinfo);
        setUsercrowns(userinfo[0].wallet);
      }
    } catch (error) {
      // console.log('Error while fetching user data', error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={{ padding: 20, width: '100%', display: 'flex', flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-start', flex: 1 }}>
            <View>
              <Image source={CustomFields.variables.Wallet} />
            </View>
            <View style={{ marginLeft: 50, marginTop: -45 }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                {usercrowns} Crowns
              </Text>
              <Text style={{ fontSize: 16, paddingLeft: 6, paddingTop: 1 }}>
                Wallet balance
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('topup')}>
              {/* <Image source={CustomFields.variables.Add} /> */}
              <Text style={{ fontSize: 16, backgroundColor: '#000', color: '#fff', padding: 10, borderRadius: 10 }}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 0, marginLeft: 20 }}>
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Withdraw')}>
              <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#000', width: 140, padding: 10, borderRadius: 10 }}>
                <View style={{ alignContent: 'flex-start' }}>
                  <Image source={CustomFields.variables.Withdraw} style={{ width: 35, height: 35 }} />
                </View>
                <View style={{ alignContent: 'flex-end', alignItems: 'center', alignSelf: 'center' }}>
                  <Text style={{ fontSize: 16, paddingLeft: 10, color: '#fff' }}>Withdraw</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.popular}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            marginBottom: 8,
            marginLeft: 20,
          }}>
          Recent logs
        </Text>
        <FlatList
          data={logdataa}
          style={{ borderTopColor: 'grey', borderTopWidth: 0.5, }}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 0.5,
                padding: 15,
              }}>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: '#fff', fontSize: 15 }}>
                  Purchased {item.money} Crowns
                </Text>
                <Text style={{ color: '#fff', fontSize: 15, marginTop: 2 }}>
                  {item.date}
                </Text>
                <Text style={{ color: '#fff', fontSize: 15, marginTop: 2 }}>
                  {item.time}
                </Text>
                {/* <View
                  style={{marginLeft: 300, marginBottom: 10, marginTop: -10}}>
                  {item.transaction_method != 'credit' ? (
                    <Image
                      source={CustomFields.variables.Down}
                      style={{width: 25, height: 25, marginTop: -20}}
                    />
                  ) : (
                    <Image
                      source={CustomFields.variables.Up}
                      style={{width: 25, height: 25, marginTop: -20}}
                    />
                  )}
                </View> */}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Wallet;
