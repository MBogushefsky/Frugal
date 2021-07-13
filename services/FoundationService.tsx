import environment from '../environment/environment';
import BankAccount from '../models/BankAccount';

export enum AmountType {
    POSITIVE,
    ZERO,
    NEGATIVE
}

export function GetAmountType(value: number) {
    if (value > 0) {
        return AmountType.POSITIVE;
    }
    else if (value < 0) {
        return AmountType.NEGATIVE;
    }
    else {
        return AmountType.ZERO;
    }
}

export function ConvertToCurrency(value: number) {
    let amountType = GetAmountType(value);
    if (amountType == AmountType.POSITIVE || amountType == AmountType.ZERO) {
        return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    else {
        return '-$' + Math.abs(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}

export function ScrambleBankAccountsIfNeeded(bankAccounts: BankAccount[]) {
    if (environment.scrambleData) {
        for (let bankAccount of bankAccounts) {
            bankAccount.currentBalance *= 6.35;
            bankAccount.availableBalance *= 6.35;
        }
    }
    return bankAccounts;
}

export function GetBankAccountWorth(bankAccount: BankAccount) {
    if (bankAccount.type == 'depository') {
        return bankAccount.currentBalance;
    }
    else if (bankAccount.type == 'credit') {
        return -1 * bankAccount.currentBalance;
    }
    else {
        return bankAccount.currentBalance;
    }
}

export function GetBankAccountSubTypeText(subType: string) {
    if (subType == 'checking') { return 'Checking'; }
    if (subType == 'credit card') { return 'Credit Card'; }
    if (subType == 'savings') { return 'Savings'; }
}