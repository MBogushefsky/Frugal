import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextProps } from './Themed';
import { Text } from 'react-native-paper';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export function SText(props: TextProps) {
  return <Text {...props} style={[props.style, styles.text]} />;
}

export function SSegmentControl(props: any) {
  return <SegmentedControl {...props} 
    style={[props.style, styles.segmentControl]}/>
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System'
  },
  segmentControl: {
    marginHorizontal: 10
  }
});