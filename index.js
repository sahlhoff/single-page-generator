#! /usr/bin/env node

'use strict';

const questions = require('questions');
const inquirer = require('inquirer');
const Handlebars = require('handlebars');
const fs = require('fs');
const ncp = require('ncp').ncp;

function askQuestions(){
  // ask required questions
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'App Title'
    }, {
      type: 'input',
      name: 'subTitle',
      message: 'SubTitle'
    }, {
      type: 'input',
      name: 'description',
      message: 'App Description'
    }, {
      type: 'input',
      name: 'contactEmail',
      message: 'Contact Email'
    }, {
      type: 'input',
      name: 'twitter',
      message: 'Twitter Handle'
    }, {
      type: 'input',
      name: 'mainColor',
      message: 'Main Color',
      default: '#FFFFFF'
    }, {
      type: 'input',
      name: 'secondaryColor',
      message: 'Secondary Color',
      default: '#4C4CFF'
    }, {
      type: 'input',
      name: 'iTunes',
      message: 'iTunes Store Link'
    }, {
      type: 'input',
      name: 'googlePlay',
      message: 'Google Play Link'
    }, {
      type: 'input',
      name: 'slack',
      message: 'Slack App Link'
    }, {
      type: 'input',
      name: 'messenger',
      message: 'Facebook Messenger Link'
    }
  ]).then(compileTheme);

}


function compileTheme(result){
  const INPUT = __dirname + '/src/themes/multi-column/base.html';
  const INPUTASSETS = __dirname + '/src/assets';
  const OUTPUT = './single-page-app.html';
  const OUTPUTASSETS = './assets';

  let source = fs.readFileSync(INPUT, 'utf-8');

  let template = Handlebars.compile(source);
  let html = template(result);

  if (!fs.existsSync(OUTPUTASSETS)){
    fs.mkdirSync(OUTPUTASSETS);
  }

  ncp(INPUTASSETS, OUTPUTASSETS, (err) => {
    if (err) { console.error(err); }
  });
  

  fs.writeFileSync(OUTPUT, html, 'utf8');
}

askQuestions();
