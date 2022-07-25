export default class Userinfo {
    constructor({ usernameSelector, jobSelector }) {
        this.usernameSelector = document.querySelector(usernameSelector);
        this.jobSelector = document.querySelector(jobSelector);
    }
    getUserInfo() {
        return {
            username: this.usernameSelector.textContent,
            job: this.jobSelector.textContent,
        }
    }
    setUserInfo(data) {
        this.usernameSelector.textContent = data.username;
        this.jobSelector.textContent = data.job;
    }
}