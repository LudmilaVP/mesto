export default class Userinfo {
    constructor({ usernameSelector, jobSelector }) {
        this._usernameSelector = document.querySelector(usernameSelector);
        this._jobSelector = document.querySelector(jobSelector);
    }
    getUserInfo() {
        return {
            username: this._usernameSelector.textContent,
            job: this._jobSelector.textContent,
        }
    }
    setUserInfo(data) {
        this._usernameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
    }
}