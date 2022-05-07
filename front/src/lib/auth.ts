import Web3 from 'web3';

class Auth {
	public account: Web3 | undefined;

	public accountAddress: string;

	constructor() {
		this.accountAddress = '';
	}

	public async logout(): Promise<void> {
		localStorage.clear();
	}

	public async login(web3: Web3): Promise<void> {
		this.account = web3;
		// eslint-disable-next-line prefer-destructuring
		this.accountAddress = (await this.account.eth.getAccounts())[0];
	}

	public async getAccount(): Promise<Web3 | undefined> {
		return this.account;
	}
}

export default Auth;
