class GitHub {
    constructor() {
        this.client_id = "be7b0ffb8e9cd1281c79";
        this.client_secret = "31dde6c21586004f580ac71e7bbaa019e13046d2";
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repoRensponse =   await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profileData = await profileResponse.json();
        const repos = await repoRensponse.json();

        return {
            profile: profileData,
            repos: repos
        }
    }
}