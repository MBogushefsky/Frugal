import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, Image, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MPrimaryButton, MCard, MCardActions, MCardContent, MTextInput, MSecondaryButton, MActivityIndicator } from '../components/StyledMaterial';
import { Text, View } from '../components/Themed';
import { Login } from '../services/RestApiService';
import * as Crypto from 'expo-crypto';
import { SAlertModal } from '../components/StyledComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');

  function onSubmit() {
    setLoading(true);
    AttemptLogin(navigation, username, password).then((response) => { 
      setLoading(false); 
      if (response.ok) {
        response.json().then((responseJson) => {
          AsyncStorage.setItem('currentUser', JSON.stringify(responseJson)).then(
            () => {
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{ name: 'Root' }]
                })
              );
            }
          )
        })
      }
      else if (response.status == 404) {
        setModalMessage('Incorrect username and password');
      }
      else {
        response.json().then((responseJson) => {setModalMessage(JSON.stringify(responseJson))});
      }
    });
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgb(97, 206, 112)', 'rgb(8, 170, 151)']}
        style={styles.linearGradientBackground}>
        <MCard style={styles.cardLogin}>
          <MCardContent style={styles.cardContentMain}>
            <View style={styles.viewLogo}>
              <Image style={styles.imageLogo} source={require('../assets/images/leaf-icon-small.png')}/>
              <Text style={styles.textCompany}>Frugal</Text>
            </View>
            <View style={styles.viewAction}>
              <Text style={styles.textAction}>Login</Text>
            </View>
          </MCardContent>
          <MCardContent style={styles.cardContentInput}>
            <MTextInput label="Username" 
              autoCapitalize='none' 
              autoCorrect={false} 
              value={username} 
              returnKeyType="next"
              onChangeText={(value: string) => setUsername(value)}/>
            <MTextInput label="Password" 
              value={password} 
              returnKeyType="done"
              onSubmitEditing={() => onSubmit()}
              onChangeText={(value: string) => setPassword(value)} 
              secureTextEntry right={<TextInput.Icon name="eye" />}/>
          </MCardContent>
          <MCardActions style={styles.cardActionsInput}>
            <MPrimaryButton onPress={() => onSubmit()} 
              icon="fingerprint" style={styles.buttonLogin}>Login</MPrimaryButton>
            <MSecondaryButton onPress={() => { navigation.navigate('SignUp')}} 
              style={[styles.buttonSignUp, styles.buttonBorderRadius]} contentStyle={styles.buttonBorderRadius}>Sign Up</MSecondaryButton>
          </MCardActions>
      </MCard>
      {
        loading == true && <MActivityIndicator />
      }
      {
        modalMessage != '' && (<SAlertModal visible={modalMessage != ''} onPress={() => setModalMessage('')}>
          <Text>{modalMessage}</Text>
        </SAlertModal>)
      }
      </LinearGradient>
    </View>
  );
}

function AttemptLogin(navigation: any, username: string, password: string) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,password).then(passwordHash =>
    Login(username, passwordHash).then((response) => response)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  cardLogin: {
    height: '60%',
    maxHeight: 400,
    flexDirection: 'row'
  },
  viewLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAction: {
    paddingVertical: 15
  },
  imageLogo: {
      width: 40,
      height: 40
  },
  textCompany: {
    fontSize: 32,
    paddingLeft: 5,
    color: '#606060'
  },
  textAction: {
    fontSize: 24,
    color: '#606060',
    textAlign: 'center'
  },
  cardContentMain: {
    flex: 3,
    shadowColor: 'rgb(25, 25, 25)',
    shadowOffset: {width: 0, height: 25},
    shadowRadius: 10,
    shadowOpacity: 0.1,
    zIndex: 1
  },
  cardContentInput: {
    flex: 4,
    zIndex: 0
  },
  cardActionsInput: {
    flex: 3
  },
  buttonLogin: {
    height: '50%'
  },
  buttonSignUp: {
    height: '50%'
  },
  buttonBorderRadius: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  }
});
