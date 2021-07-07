import environment from '../environment/environment';

const apiHost = environment.apiServer;

export function Login(username: string, passwordHash: string) {
    return fetch(apiHost + "/login?username=" + username + "&passwordHash=" + passwordHash);
}
