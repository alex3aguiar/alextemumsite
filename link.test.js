const fs = require('fs');
var validator = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const linkList = data.split('<ul>')[1]
        .split('</ul>')[0]
        .split('<li>')
        .join('')
        .split('</li>')
        .filter(a => !a.trim() == "")
        .map(a => a.split('<a href="')[1].split('">')[0]);

    const invalidLink = linkList.filter(a => !validator.test(a))
    if(invalidLink.length > 0){
        const errorMessage = "this links are invalid: " + invalidLink.join();
        console.error(errorMessage)
        throw new Error(errorMessage)
    }
});
return 0
