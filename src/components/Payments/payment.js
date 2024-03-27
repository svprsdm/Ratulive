import React, { useState } from 'react';
import { View, Button, Text, Image } from 'react-native';
import stripe from 'tipsi-stripe';
import { useAuth } from '../../hooks/Auth';
import users from '../../storage/storage';
import { makePayment, updateUserPurchasedcrowns, selectUser, updateWallet } from '../../utils/api';
import styles from './payment.styles';
stripe.setOptions({
  publishableKey:'pk_test_51HlsuKBGhy6l8fryIQyrXAuJLJz3zcnBdyGyra0BNVqzaZTT9JLYbMvO9HUyX3smue4recKfc7wS6nRbxvfyCq9J00TAJsK3eD',
});
function Payment(props) {
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const amount = props.route.params.amount;
  const crowns = props.route.params.crowns;
  const { uid } = auth?.user;
  const [balance, setBalance] = useState(0);
  const [ratuid, setRatuid] = useState(0);
  const usercrowns = Number(crowns) + Number(balance);
  // const [usercrowns, setUsercrowns] = useState(0);
  React.useEffect(() => {
    fetchuserDetails();
  }, [])
  async function fetchuserDetails() {
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
       setBalance(userinfo[0].wallet);
       setRatuid(userinfo[0].userno)
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  const requestPayment = () => {
    setIsPaymentPending(true);
    const updatepurchasedcrowns = async () => {
      try {
        await updateUserPurchasedcrowns({
          uid: uid,
          crowns: crowns
        });
        
      } catch (error) {
        console.log('Error while adding details', error);
      }
    }
    const updateUserWallet = async () => {
      try {
        await updateWallet({
          uid: uid,
          wallet: usercrowns
        });
       
      } catch (error) {
        console.log('Error while adding details', error);
      }
    }
    return stripe
      .paymentRequestWithCardForm()
      .then((stripeTokenInfo) => {
        console.log('Stripe resolved object',{stripeTokenInfo});
        const paymentData = {
          amount: parseInt(amount) * 100,
          tokenId: stripeTokenInfo.id,
          uid: uid,
          orderid: ratuid,
          crowns: crowns,
        };
        return makePayment(paymentData);
      })
      .then(async (e) => {        
        if (e.success) {
          // Code to be executed when e.success is true (not need to compare to true explicitly)
          setSuccess(true);
          setError(null);
          setIsPaymentPending(false);
          await updateUserWallet();
          await updatepurchasedcrowns();
          console.warn('Payment succeeded!', { e });
        } else {
          // Code to be executed when e.success is false
          setFailed(true);
          setError(null);
          console.warn('Payment Declined!', { e });
        }
       
      })
      .catch((e) => {
        setError(JSON.stringify(e));
        console.warn('Payment failed', { e });
      })
      .finally(() => {
        setIsPaymentPending(false);
      });
  };
  if (error) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/crown.png')}
          style={styles.crownIcon}
        />
        <Text style={styles.errorText}>
        An error occurred during the payment process. Please try again later.
        </Text>
        <Button
          title={`Pay $${amount}`}
          onPress={requestPayment}
          disabled={isPaymentPending}
        />
      </View>
    );
  }
  if (failed) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/crown.png')}
          style={styles.crownIcon}
        />
        <Text style={styles.errorText}>
        Your card was declined. Please check your card details and try again.
        </Text>
        <Button
          title={`Pay $${amount}`}
          onPress={requestPayment}
          disabled={isPaymentPending}
        />
      </View>
    );
  }
  if (success) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/crown.png')}
          style={styles.crownIcon}
        />
        <Text style={styles.successText}>
          Your payment is success. You have purchased&nbsp;
          {crowns}&nbsp;crowns.
        </Text>
        <Button
          title={`Check your wallet`}
          onPress={() => props.navigation.navigate('Wallet', {
            usercrowns: crowns,
          })}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/crown.png')}
        style={styles.crownIcon}
      />
      <Text style={styles.normalText}>
        {' '}
        Purchase {props.route.params.crowns} crowns
      </Text>
      <Button
        title={
          !isPaymentPending
            ? `Make a payment of $${props.route.params.amount}`
            : 'Processing payment...'
        }
        onPress={requestPayment}
        disabled={isPaymentPending}
      />
    </View>
  );
}
export default Payment;
