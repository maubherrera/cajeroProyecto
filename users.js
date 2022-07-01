const userAccounts = [
    {
        name: "Mauricio Bustos Herrera",
        user: "mauriciobustosherrera@gmail.com",
        cash: 300,
        password: "12345"
    },

    {
        name: "Edna Herrera Zuñiga",
        user: "ednaherrera@gmail.com",
        cash: 845,
        password: "54321"
    },

    {
        name: "Victoria Bustos Herrera",
        user: "vbh@gmail.com",
        cash: 100,
        password: "12345"
    }
];

function getUsers() {
    let users = localStorage.getItem('userAccounts');
    if (users == undefined || users == null) {
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
        users = localStorage.getItem('userAccounts');
    }
    return JSON.parse(users);
}


function validUser(user, password) {
    let userObject;
    let users = getUsers();
    users.forEach(element => {
        if (element.user == user && element.password == password) {
            userObject = element;
            return;
        }
    });
    return userObject;
}

function createSession(user) {
    user.expiration = Date.now();
    localStorage.setItem('user', JSON.stringify(user));
}

function closeSession() {
    localStorage.removeItem('user');
}

function getSession() {
    return JSON.parse(localStorage.getItem('user'));
}


function updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    let accounts = getUsers();
    accounts.forEach(element => {
        if (element.user == user.user && element.password == user.password) {
            element.name = user.name;
            element.user = user.user;
            element.cash = user.cash;
            element.password = user.password;
        }
    });

    localStorage.setItem('userAccounts', JSON.stringify(accounts));
}

getUsers();