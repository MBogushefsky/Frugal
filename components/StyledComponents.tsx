import * as React from 'react';
import { Modal, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { TextProps } from './Themed';
import { Badge, Text } from 'react-native-paper';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { MActivityIndicator } from './StyledMaterial';
import { ConvertToCurrency, GetAmountType, AmountType } from '../services/FoundationService';

export function SView(props: any) {
  return <View {...props} style={[styles.view, props.style]}>
    {props.children}
    {
      props.loading == true && <MActivityIndicator />
    }
    {
      props.modalMesage != null && (<SAlertModal visible={props.modalMesage != null} onPress={props.onPress}>
        <SText>{props.modalMesage}</SText>
      </SAlertModal>)
    }
  </View>;
}

export function SScrollView(props: any) {
  return <ScrollView {...props} style={[styles.scrollView, props.style]}
    contentContainerStyle={[styles.scrollViewContent, props.contentContainerStyle]}
    refreshControl={
      props.isRefreshable ?
      <RefreshControl
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
      /> : null
    }>
    {props.children}
  </ScrollView>
}

export function SText(props: TextProps) {
  return <Text {...props} style={[styles.text, props.style]}>
    {props.children}
  </Text>;
}

export function SSegmentControl(props: any) {
  return <SegmentedControl {...props} 
    style={[styles.segmentControl, props.style]}/>
}

export function SAlertModal(props: any) {
  return <Modal {...props} 
    animationType="slide"
    transparent={true}
    visible={props.visible}
    onRequestClose={props.onRequestClose}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {props.children}
        <View style={styles.modalText}></View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={props.onPress}>
          <Text style={styles.textStyle}>OK</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
}

export function SCurrencyText(props: any) {
  let currencyValue = props.value;
  let amountType = GetAmountType(currencyValue);
  let styleToUse = styles.textCurrencyZero;
  if (amountType == AmountType.POSITIVE) {
    styleToUse = styles.textCurrencyPositive;
  }
  else if (amountType == AmountType.NEGATIVE) {
    styleToUse = styles.textCurrencyNegative;
  }
  return <SText {...props} style={[styleToUse, props.style]}>
      { ConvertToCurrency(currencyValue) }
  </SText>;
}

export function SCurrencyBadge(props: any) {
  let currencyValue = props.value;
  let amountType = GetAmountType(currencyValue);
  let styleToUse: any = styles.badgeCurrencyZero;
  if (props.type != null && props.type == 'credit') {
    styleToUse = styles.badgeCurrencyCredit;
  }
  else if (amountType == AmountType.POSITIVE) {
    styleToUse = styles.badgeCurrencyPositive;
  }
  else if (amountType == AmountType.NEGATIVE) {
    styleToUse = styles.badgeCurrencyNegative;
  }
  return <Badge {...props} style={[styleToUse, styles.badgeCurrency, props.style]}>
      { ConvertToCurrency(currencyValue) }
  </Badge>;
}

const styles = StyleSheet.create({
  view: {
  },
  scrollView: {
    width: '100%'
  },
  scrollViewContent: {
  },
  text: {
    fontFamily: 'System'
  },
  segmentControl: {
    marginHorizontal: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 200,
    justifyContent: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 200
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textCurrencyPositive: {
    color: 'green'
  },
  textCurrencyZero: {
    color: 'grey'
  },
  textCurrencyNegative: {
    color: 'red'
  },
  badgeCurrency: {
    minWidth: 85
  },
  badgeCurrencyPositive: {
    backgroundColor: 'green'
  },
  badgeCurrencyZero: {
    backgroundColor: 'grey',
    color: 'white'
  },
  badgeCurrencyCredit: {
    backgroundColor: '#2C778F',
    color: 'white'
  },
  badgeCurrencyNegative: {
    backgroundColor: 'red'
  }
});