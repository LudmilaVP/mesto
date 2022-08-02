export default class Userinfo {
    constructor({ usernameSelector, jobSelector, avatarSelector }) {
        this.usernameSelector = document.querySelector(usernameSelector);
        this.jobSelector = document.querySelector(jobSelector);
        this.avatarSelector = document.querySelector(avatarSelector);
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
        this.avatarSelector.src = data.avatar;
        this.avatarSelector.alt = data.username;
    }
}