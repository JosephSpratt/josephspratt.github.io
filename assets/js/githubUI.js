class UI {
    constructor(){
        this.profile = document.getElementById('profile');
    }

    showProfile(user){
        console.log(user);
        let date = new Date(user.created_at);
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row>
                    <div class="col md-3">
                    <img class="img-fluid mb-2" src="${user.avatar_url}">
                    <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">
                    View Profile</a>
                    </div>
                    <div class=col-md-9">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-primary">Followers: ${user.followers}</span>
                        <span class="badge badge-primary">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company} </li>
                            <li class="list-group-item">Website/Blog: ${user.blog} </li>
                            <li class="list-group-item">Location: ${user.location} </li>
                            <li class="list-group-item">Member Since: ${date.toDateString()} </li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3"> Latest Repos </h3>
            <div id="repos"></div>
        `;
    }

    showAlert(msg, className){
        //Clear remaining alerts 
        this.clearAlertMessage();
        //Create a div
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.searchContainer');
        const search = document.querySelector('.search');
        container.insertBefore(div, search);

        //Timeout after 3 seconds
        setTimeout(()=> this.clearAlertMessage(), 3000);
    }

    showRepos(repos){
        let output = "";
        repos.forEach(function(repo){
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col md-6">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-3">
                            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                            <br><br>
                        </div>
                    </div>
                </div>
                        
            `;
        });
        document.getElementById('repos').innerHTML = output;
    }

    clearProfile(){
        this.profile.innerHTML = '';
    }

    clearAlertMessage(){
        const alert = document.querySelector('.alert');
        if(alert){
            alert.remove();
        }
    }
}