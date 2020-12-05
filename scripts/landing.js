const landing = document.querySelector(".landing");
const context = document.querySelector(".context");
const user = document.querySelector(".user");
const input = user.querySelector("input");

landing.querySelector("button").addEventListener("click", () => {
    landing.style.display = "none";
    context.style.display = "flex";
});

context.querySelector("button").addEventListener("click", () => {
    context.style.display = "none";
    user.style.display = "flex";
});

function validateName(name) {

    usersRef.get().then((querySnapshot) => {
        var users = [];
        var exist = false;
        var currentId;
        
        querySnapshot.forEach((doc) => {
            const obj = doc.data();
            obj.id = doc.id;
            users.push(obj);
        });

        for (const user of users) {
            if(name == user.name){
                console.log('existe');
                exist= true;
                currentId = user.id;
            }
        }

        if(exist){
            localStorage.setItem('userID', currentId);
            window.location.href = 'home.html';
        }else{
            const newUser = {
                name: name,
                level1: 0,
                level2: 0,
                level3: 0,
            }

            usersRef
            .add(newUser)
            .then((querySnapshot) =>{
                localStorage.setItem('userID', querySnapshot.id);
                window.location.href = 'home.html';
            })
            .catch((error)=> {
                console.error("Error adding document: ", error);
            });
        }
    });

}
user.querySelector("button").addEventListener("click", () => {
    validateName(input.value);
});
