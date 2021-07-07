import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Badge, Button, Card, Divider, List, Paragraph, Text } from 'react-native-paper';
import { MCard, MCardContent, MDivider, MListItem, MListSection } from '../components/StyledMaterial';
import { SSegmentControl, SText } from '../components/StyledComponents';
import { View } from '../components/Themed';

export default function HomeScreen() {
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <MCard>
          <MCardContent style={styles.cardContent}>
            <SText style={styles.titleCurrency}>$5,975.94</SText>
          </MCardContent>
          <MDivider />
          <MCardContent>
            <MListSection>
              <MListItem 
                title="Day-to-Day" 
                description="Checking"
                left={() => (<View style={styles.viewCentered}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewCentered}><Badge style={styles.badgeBalance} size={30}>$1256.67</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="Amazon" 
                description="Credit Card"
                left={() => (<View style={styles.viewCentered}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewCentered}><Badge style={styles.badgeBalance} size={30}>$943.91</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="College" 
                description="Savings"
                left={() => (<View style={styles.viewCentered}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewCentered}><Badge style={styles.badgeBalance} size={30}>$3764.09</Badge></View>)}>
              </MListItem>
            </MListSection>
          </MCardContent>
        </MCard>
        <MCard>
          <MCardContent style={styles.cardContent}>
            <SText style={styles.titleNormal}>Recent Transactions</SText>
          </MCardContent>
          <SSegmentControl values={['Past Week', 'Past Month', 'All']}/>
          <MDivider />
          <MCardContent>
            <MListSection>
              <MListItem 
                title="Day-to-Day" 
                description="Checking"
                left={() => (<View style={styles.viewCentered}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewCentered}><Badge style={styles.badgeBalance} size={30}>$1256.67</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="Amazon" 
                description="Credit Card"
                left={() => (<View style={styles.viewCentered}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewCentered}><Badge style={styles.badgeBalance} size={30}>$943.91</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="College" 
                description="Savings"
                left={() => (<View style={styles.viewCentered}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewCentered}><Badge style={styles.badgeBalance} size={30}>$3764.09</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="College" 
                description="Savings"
                left={() => (<View style={styles.viewCentered}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewCentered}><Badge style={styles.badgeBalance} size={30}>$3764.09</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="College" 
                description="Savings"
                left={() => (<View style={styles.viewCentered}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewCentered}><Badge style={styles.badgeBalance} size={30}>$3764.09</Badge></View>)}>
              </MListItem>
            </MListSection>
          </MCardContent>
        </MCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: 10
  },
  titleCurrency: {
    fontSize: 36,
    color: 'green'
  },
  titleNormal: {
    fontSize: 24,
    color: 'grey'
  },
  listItemBalance: {
    height: 50,
    marginVertical: 5
  },
  viewCentered: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center'
  },
  imageLogo: {
    width: 40,
    height: 40
  },
  badgeBalance: {
    fontSize: 16,
    backgroundColor: 'green'
  }
});
