import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Badge } from 'react-native-paper';
import { MCard, MCardContent, MDivider, MListItem, MListSection } from '../components/StyledMaterial';
import { SCurrencyBadge, SCurrencyText, SScrollView, SSegmentControl, SText } from '../components/StyledComponents';
import { View } from '../components/Themed';
import BankAccount from '../models/BankAccount';
import { GetBankAccounts } from '../services/RestApiService';
import { ConvertToCurrency, GetBankAccountSubTypeText, GetBankAccountWorth, ScrambleBankAccountsIfNeeded } from '../services/FoundationService';

export default function HomeScreen() {
  const [loadingAccounts, setLoadingAccounts] = React.useState(false);
  const [loadedAccounts, setLoadedAccounts] = React.useState([] as BankAccount[]);

  React.useEffect(() => {
    loadBankAccounts();
  }, []);

  function loadBankAccounts() {
    return GetBankAccounts().then((response) => response.json()).then(
      (bankAccounts: BankAccount[]) => {
        ScrambleBankAccountsIfNeeded(bankAccounts);
        setLoadedAccounts([...bankAccounts]);
        setLoadingAccounts(false);
      }
    );
  }

  function getNetWorth(accounts: BankAccount[]) {
    if (accounts.length > 0) {
      return accounts.map((bankAccount: BankAccount) => GetBankAccountWorth(bankAccount))
        .reduce((prev: number, curr: number) => prev + curr);
    }
    else {
      return 0;
    }
  }

  if (!loadedAccounts) { return null; }

  return (
    <SScrollView isRefreshable={true} refreshing={loadingAccounts} onRefresh={() => loadBankAccounts()}>
      <View style={styles.container}>
        <MCard>
          <MCardContent style={styles.cardContent}>
            <SCurrencyText style={styles.titleCurrency} value={getNetWorth(loadedAccounts)}>
            </SCurrencyText>
          </MCardContent>
          <MDivider />
          <MCardContent>
            <MListSection>
              {
                 loadedAccounts.map((bankAccount: BankAccount) => {
                  return <MListItem 
                    key={bankAccount.Id}
                    title={bankAccount.name} 
                    description={GetBankAccountSubTypeText(bankAccount.subType)}
                    right={() => (<View style={styles.viewAmountBadge}><SCurrencyBadge value={GetBankAccountWorth(bankAccount)} type={bankAccount.type} style={styles.badgeBalance} size={30}>
                    </SCurrencyBadge></View>)}>
                  </MListItem>
                })
              }
              {/* <MListItem 
                title="Day-to-Day" 
                description="Checking"
                right={() => (<View style={styles.viewAmountBadge}><Badge style={styles.badgeBalance} size={30}>$1256.67</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="Amazon" 
                description="Credit Card"
                right={() => (<View style={styles.viewAmountBadge}><Badge style={styles.badgeBalance} size={30}>$943.91</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="College" 
                description="Savings"
                right={() => (<View style={styles.viewAmountBadge}><Badge style={styles.badgeBalance} size={30}>$3764.09</Badge></View>)}>
              </MListItem> */}
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
                left={() => (<View style={styles.viewAmountBadge}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewAmountBadge}><Badge style={styles.badgeBalance} size={30}>$1256.67</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="Amazon" 
                description="Credit Card"
                left={() => (<View style={styles.viewAmountBadge}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewAmountBadge}><Badge style={styles.badgeBalance} size={30}>$943.91</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="College" 
                description="Savings"
                left={() => (<View style={styles.viewAmountBadge}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewAmountBadge}><Badge style={styles.badgeBalance} size={30}>$3764.09</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="College" 
                description="Savings"
                left={() => (<View style={styles.viewAmountBadge}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewAmountBadge}><Badge style={styles.badgeBalance} size={30}>$3764.09</Badge></View>)}>
              </MListItem>
              <MListItem 
                title="College" 
                description="Savings"
                left={() => (<View style={styles.viewAmountBadge}><Image style={styles.imageLogo} source={require('../assets/images/chase-logo.png')}/></View>)}
                right={() => (<View style={styles.viewAmountBadge}><Badge style={styles.badgeBalance} size={30}>$3764.09</Badge></View>)}>
              </MListItem>
            </MListSection>
          </MCardContent>
        </MCard>
      </View>
    </SScrollView>
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
    fontSize: 36
  },
  titleNormal: {
    fontSize: 24,
    color: 'grey'
  },
  listItemBalance: {
    height: 50,
    marginVertical: 5
  },
  viewAmountBadge: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    marginRight: 5
  },
  imageLogo: {
    width: 40,
    height: 40
  },
  badgeBalance: {
    fontSize: 16
  }
});
