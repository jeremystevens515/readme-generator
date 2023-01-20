// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const { url } = require('inspector');

const licensesURL = 'https://api.github.com/licenses'
const licenseArray = [
    'GNU Affero General Public License v3.0',
    'Apache License 2.0', 
    'BSD 2-Clause "Simplified" License', 
    'BSD 3-Clause "New" License',
    'Boost Software License 1.0', 
    'Creative Commons Zero v1.0 Universal',
    'Eclipse Public License 2.0',
    'GNU General Public License v2.0',
    'GNU General Public License v3.0',
    'GNU Lesser General Public License v2.1',
    'MIT License',
    'Mozilla Public License 2.0',
    'The Unlicense'
];


// fetch(licensesURL).then(function(response) {
//     return response.json()
// }).then(function(data){
//     // console.log(data)
//     for (let i in data) {
//         console.log(data[i].name);
//     }
// });


// TODO: Create an array of questions for user input
const questions = () => {
    inquirer
        .prompt([
            {
                type: 'input', 
                message: 'What is the title of your project?',
                name: 'title'
            },
            {
                type: 'input', 
                message: 'Enter the description of your project?',
                name: 'description'
            },
            {
                type: 'input',
                message: 'Type any installation instruction you may have.',
                name: 'installation'
            },
            {
                type: 'input',
                message: 'If you have usage information, enter it here.',
                name: 'usage'
            },
            {
                type: 'input',
                message: 'Enter contribution guidelines.', 
                name: 'contributing'
            },
            {
                type: 'input',
                message: 'Do you have any tests? If so, type them here.',
                name: 'tests'
            },
            {
                type: 'list',
                message: 'Which license would you like to use?',
                choices: licenseArray,
                name: 'license'
            },
            {
                type: 'input',
                message: 'What is your GitHub username?',
                name: 'userName'
            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'email'
            }
        ]).then((answers) => {
            console.log(answers);
            for (a in answers) {
                let userInput = JSON.stringify(answers[a]);
                writeToFile('README.md', userInput);
            }

        })
}
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    const tableOfContents = [
        '# Table of Contents\n',
        '- [Description](#description)',
        '- [Installation](#installation)',
        '- [Usage](#usage)',
        '- [Contributing](#contributing)',
        '- [Tests](#tests)',
        '- [Questions](#questions)'
    ];

    const sections = [
        '## Description\n', 
        '## Installation\n', 
        '## Usage\n', 
        '## Contributing', 
        '## Tests\n',
        '## Questions'
    ];
    
    // fs.appendFile(fileName, data, (error) => {
    //     error ? console.error(error) : console.log(`${data} appended successfully`);
    // });
}

// TODO: Create a function to initialize app
function init() {
    questions();
}

// Function call to initialize app
init();
