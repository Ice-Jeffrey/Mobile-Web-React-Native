const fetch = require('node-fetch');

fetch('https://api.github.com/users')
    .then( result => result.json() )
    .then( data => {
        let count = 0;
        let newUsers = data;
        for(let i=0;i<data.length;i++)
            Object.assign(newUsers[i], {index: count++});
        console.log('users fetched are as follows:');
        console.log(newUsers);
    })
    .catch( error => console.log(error) )