import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { MPrimaryButton, MCard, MCardActions, MCardContent, MTextInput, MSecondaryButton } from '../components/StyledMaterial';
import { Text, View } from '../components/Themed';

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgb(97, 206, 112)', 'rgb(8, 170, 151)']}
        style={styles.linearGradientBackground}>
        <MCard style={styles.viewLogin}>
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
            <MTextInput label="Username"/>
            <MTextInput label="Password" secureTextEntry right={<TextInput.Icon name="eye" />}/>
          </MCardContent>
          <MCardActions style={styles.cardActionsInput}>
            <MPrimaryButton onPress={() => { navigation.navigate('Root')}} icon="fingerprint" style={styles.buttonLogin}>Login</MPrimaryButton>
            <MSecondaryButton onPress={() => { navigation.navigate('SignUp')}} 
              style={[styles.buttonSignUp, styles.buttonBorderRadius]} contentStyle={styles.buttonBorderRadius}>Sign Up</MSecondaryButton>
          </MCardActions>
        </MCard>
      </LinearGradient>
    </View>
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
  viewLogin: {
    height: '60%',
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
