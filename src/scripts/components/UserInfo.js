export default class UserInfo {
    constructor( usernameSelector, jobSelector, avatarSelector ) {
        this.usernameSelector = document.querySelector(usernameSelector);
        this.jobSelector = document.querySelector(jobSelector);
        this.avatarSelector = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this.usernameSelector.textContent,
            about: this.jobSelector.textContent,
        }
    }
    setUserInfo(data) {
        this.usernameSelector.textContent = data.name;
        this.jobSelector.textContent = data.about;
        this.avatarSelector.src = data.avatar;
        this.avatarSelector.alt = data.name;
    }
}