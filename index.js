// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    "What is the project called?",
    "Enter a brief description of the project.",
    "Please provide installation instructions: ",
    "How is this project intended to be used? ",
    "Contribution guidelines? ",
    "Test instructions?",
    "Which license will you use?",
    "What is your GitHub username?",
    "What is your email address?"
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => { err ? console.error(err) : console.log('README file has been created!') });
}


// TODO: Create a function to initialize app
function init() {

    //Used inquirer package in order to receive user input in GitBash
    inquirer
        .prompt([
            {
                type: 'input',
                message: questions[0],
                name: 'projectName',
            },
            {
                type: 'input',
                message: questions[1],
                name: 'description',
            },
            {
                type: 'input',
                message: questions[2],
                name: 'installInstructions',
            },
            {
                type: 'input',
                message: questions[3],
                name: 'intention',
            },
            {
                type: 'input',
                message: questions[4],
                name: 'contribution',
            },
            {
                type: 'input',
                message: questions[5],
                name: 'testInstructions',
            },
            {
                type: 'list',
                message: questions[6],
                name: 'license',
                choices: ['MIT License', 'GNU General Public License (GPL)', 'Apache License 2.0', 'Creative Commons License'],
            },
            {
                type: 'input',
                message: questions[7],
                name: 'githubUsername',
            },
            {
                type: 'input',
                message: questions[8],
                name: 'email',
            }
        ])
        //Line of code that handles writing input to .md file
        .then((response) => writeToFile("README-Generated.MD", generateMarkdown(response)

        ));
}


//Created function in order to create output for README file
function generateMarkdown(response) {
    let licenseChoice = '';

    switch (response.license) {
        case 'MIT License':
            licenseChoice = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
            break;
        case 'GNU General Public License (GPL)':
            licenseChoice = `![License: GNU General Public License (GPL)](https://img.shields.io/badge/License-GPL_3-blue.svg?style=for-the-badge)`;
            break;
        case 'Apache License 2.0':
            licenseChoice = `![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-D22128?style=for-the-badge)`;
            break;
        case 'Creative Commons License':
            licenseChoice = `![License: Creative Commons](https://img.shields.io/badge/License-CC_BY-EF9421.svg?style=for-the-badge)`;
            break;
    }


    return (`# Project Title: ${response.projectName}           ${licenseChoice}
    
## Description: ${response.description}

# Tablet of Contents
1) [Installation](#installation)
2) [Usage](#usage)
3) [License](#license)
4) [Contributing](#contributing)
5) [Tests](#tests)
6) [Questions](#questions)
    

## Installation 
${response.installInstructions}

## Usage 
${response.intention}

## License 
${response.license}
    
## Contributing 
${response.contribution}

## Tests
${response.testInstructions}

## Questions
${response.githubUsername}

${response.email}`);
}

// Function call to initialize app
init();
