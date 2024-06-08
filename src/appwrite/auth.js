import {Client, Account, ID} from "appwrite";
import conf from "../conf/conf.js"

class Auth {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    /*
     * Create a user account
     *
     * @param {String} email User input email
     * @param {String} password User input password
     * @param {String} name User input name
     * @returns {Object} Returns the login response if account creation is successful, otherwise throws an error
     */
    async createAccount({email, password, name}) {
        try {
            let response = await this.account.create(ID.unique(), email, password, name);
            if (response) {
                return await this.loginAccount({email, password});
            }
            return console.error('Account creation failed. Please try again.');
        } catch (err) {
            console.error('Error creating account:', err);
            throw err;
        }
    }

    /*
     * Login to a user account
     *
     * @param {String} email User input email
     * @param {String} password User input password
     * @returns {Object} Returns the Session data if login is successful, otherwise throws an error
     */
    async loginAccount({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (err) {
            console.error('Error logging in:', err);
            throw err;
        }
    }

    /*
    * Get logged-in user information
    *
    * @returns {Object} Returns the logged-in user information if successful, otherwise throws an error
    */
    async getUserInfo() {
        try {
            return await this.account.get();
        } catch (err) {
            console.error('Error fetching user information:', err);
            throw err;
        }
    }


    /*
    * Log out of a user account
    *
    * @returns {Object} Returns the result of the logout operation if successful, otherwise throws an error
    */
    async logoutAccount() {
        try {
            return await this.account.deleteSessions();
        } catch (err) {
            console.error('Error logging out:', err);
            throw err;
        }
    }

}

const authService = new Auth();

export default authService;