'use strict';
const { logIn } = require('./utils/auth/user.login');
const { logOut } = require('./utils/auth/login.utils');
const { realTimeClient } = require('./utils/auth/realTime');
const { IgApiClient } = require('instagram-private-api');
const { withRealtime } = require('instagram_mqtt');
class Instagram {
  #igClient = withRealtime(new IgApiClient());
  #authUser = null;
  #inSystem = false;
  login = async (...data) => {
    [ this.#authUser, this.#igClient, this.#inSystem ] = await logIn(this.#igClient, ...data);
    await this._listen();
  }
  logout = () => logOut(this.#igClient);
  _listen = async () => realTimeClient(this.#igClient);
  get checkAuth() {
    return this.#inSystem;
  }
  get userId() {
    return this.#igClient.state.cookieUserId;
  }
  get IgClient() {
    return this.#igClient;
  }
}
const Insta = new Instagram();
module.exports = Insta;