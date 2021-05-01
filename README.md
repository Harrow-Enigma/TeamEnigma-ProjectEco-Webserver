# Team Enigma ProjectEco
![GitHub language count](https://img.shields.io/github/languages/count/DylanK46/TeamEngima-EcoProject-Webserver) 			 ![GitHub repo file count](https://img.shields.io/github/directory-file-count/DylanK46/TeamEngima-EcoProject-Webserver) ![GitHub repo size](https://img.shields.io/github/repo-size/DylanK46/TeamEngima-EcoProject-Webserver) ![GitHub repo size](https://img.shields.io/github/issues/DylanK46/TeamEngima-EcoProject-Webserver) ![GitHub repo size](https://img.shields.io/github/last-commit/DylanK46/TeamEngima-EcoProject-Webserver)

## Introduction
Project Eco is the first project of Team Enigma, the AI team of [Harrow School](https://www.harrowschool.org.uk). 

Project Eco consists of four main parts;

 - **A webserver (and by extension, a website)**
 - Sensors on ESP-32 boards
 - An AI server, with Pytorch
 - A set of forms
 

*This repository is for code regarding the webserver*

## Protocol Diagram
![enter image description here](https://raw.githubusercontent.com/DylanK46/TeamEngima-EcoProject-Webserver/aa8f5027a346ea41de8a1355274aef3feedab786/docs/diagram.svg)
## Webserver Technologies
The webserver should aim to be a MEAN stack; Containing:

 - **M**ongoDB
 - **E**xpress.js
 - **A**ngular
 - **N**ode.js

It should have a REST endpoint to recieve data from an on-site AI server
It should use Websocket telemetry
It should an external MongoDB for JSON data storage
It should have a Bootstrap frontend with Angular, possibly with utilities such as Chart.js

It could eventually be placed into a Docker Container for easy deployment.

## Explaination
A more detailed explaination can be found [here](https://github.com/Harrow-Enigma/minutes/blob/main/20210327%20-%20Team%20Enigma%20Planning%20Meeting%20Summary.md#the-ecoproject).