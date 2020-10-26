//Init github
const github = new GitHub;
//Int UI 
const ui = new UI;
//Search input 
const searchUser = document.getElementById('searchUser');
searchUser.addEventListener('keyup', (e) => {
    const userText = e.target.value;
    if(userText != ""){
        console.log(userText);
        //make http call
        github.getUser(userText)
            .then(data => {
                console.log(data);
                if(data.profile.message === 'Not Found'){
                    //Show alert
                    ui.showAlert("User not found", 'alert alert-danger');
                } else {
                    //Show the profile
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            })
    } else {
        //Clear profile
        ui.clearProfile();
    }
});