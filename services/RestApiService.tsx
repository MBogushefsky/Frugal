import environment from '../environment/environment';

const apiHost = environment.apiServer;

export function Login(username: string, passwordHash: string) {
    return fetch(apiHost + "/login?username=" + username + "&passwordHash=" + passwordHash);
}

export function CreateLinkToken() {
    return fetch(apiHost + "/tokens/link/create");
}

export function SavePublicToken(publicToken: string) {
    return fetch(apiHost + "/tokens/link?token=" + publicToken, { method: 'POST'});
}

export function GetBankAccounts() {
    return fetch(apiHost + "/accounts");
}