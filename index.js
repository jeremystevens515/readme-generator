// Packages required for this script
const inquirer = require('inquirer');
const fs = require('fs');
const { url } = require('inspector');

const licensesURL = 'https://api.github.com/licenses';

function fetchGitHubLicenses(url) {
    fetch(url).then(function(response) {
        return response.json()
    }).then(function(data){
        // console.log(data)
        const licensesList = [];
        for (const i in data) {
            licensesList.push(data[i].spdx_id);
        }
        questions(licensesList,data)
    });
}

// uses inquirer to create a series of questions for the user to respond to in the terminal
function questions(licensesList,licensesObject) {
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
                choices: licensesList,
                name: 'license',
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
            // pass 'README.md' as the file name to be created
            // pass the answers object to the next function to be used in file creation
            writeToFile('README.md', answers);
        });
};


function writeToFile(fileName, answers) {
    // calls function to generate markdown title
    // passes fileName, answers object obtained in questions(), and the object containing all license information from api call
    generateTitle(fileName, answers);    
};


function generateTitle (fileName, answers) {
    fs.appendFile(fileName, `# ${answers.title}\n\n`, (error) => {
        error ? console.error(error) : console.log('Title added successfully')
    });

    generateTableOfContents(fileName, answers);
};


function generateTableOfContents (fileName, answers) {    
    const tableOfContents =
        '## Table of Contents\n\n - [Description](#description)\n - [Installation](#installation)\n - [Usage](#usage)\n - [Contributing](#contributing)\n - [Tests](#tests)\n - [Questions](#questions)\n\n';
    fs.appendFile(fileName, tableOfContents, (error) => {
        error ? console.error(error) : console.log('Table of contents added successfully')
    });
generateSections(fileName, answers);
};


function generateSections(fileName, answers) {
    fs.appendFile(fileName, `\n![license badge](https://img.shields.io/badge/license-${answers.license}-green?style=for-the-badge)\n\n## Description\n${answers.description}\n\n## Installation\n${answers.installation}\n\n## Usage\n${answers.usage}\n\n## Contributing\n${answers.contributing}\n\n## Tests\n${answers.tests}\n\n## Questions\nhttps://github.com/${answers.userName}\n\n${answers.email}\n`, (error) => {
        error ? console.error(error) : console.log('content added')
    });

};


// Create a function to initialize app
function init() {
    fetchGitHubLicenses(licensesURL);
}

// call init
init();
