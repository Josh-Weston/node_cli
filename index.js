#!/usr/bin/env node

const inquirer = require('inquirer'),
      chalk = require('chalk'),
      figlet = require('figlet'),
      shell = require('shelljs'),
      fs = require('fs');


const init = () => {
    console.log(
        chalk.green(
            figlet.textSync('Node JS Cli', {
                font: "big",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const askQuestions = () => {
    const questions = [
        {
            name: 'FILENAME',
            type: 'input',
            message: 'What is the name of the file without extension?'
        },
        {
            type: 'list',
            name: 'EXTENSION',
            message: 'What is the file extension?',
            choices: ['.rb', '.js', '.php', '.css', '.txt'],
            filter: (val) => val.split('.')[1]
        }
    ];
    return inquirer.prompt(questions);
}

const createFile = (filename, extension) => {
    const filePath = `${process.cwd()}/${filename}.${extension}`;
    fs.writeFileSync(filePath, "", {encoding: "utf8"});
    //shell.touch(filePath);
    return filePath;
}

const success = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done! file created at ${filepath}`)
    );
}

const run = async () => {

    // show script introduction
    init();

    // ask questions
    const answers = await askQuestions();
    const {FILENAME, EXTENSION} = answers;

    // Create the file
    const filePath = createFile(FILENAME, EXTENSION);

    // Show success message
    success(filePath);

};

run();