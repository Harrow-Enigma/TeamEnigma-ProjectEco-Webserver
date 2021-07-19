Team Enigma ProjectEco Webserver

![Team Enigma](https://img.shields.io/badge/Team%20Enigma-Harrow%20School-blue)
![GitHub language count](https://img.shields.io/github/languages/count/DylanK46/TeamEngima-ProjectEco-Webserver)![GitHub repo file count](https://img.shields.io/github/directory-file-count/DylanK46/TeamEngima-ProjectEco-Webserver) ![GitHub repo size](https://img.shields.io/github/repo-size/DylanK46/TeamEngima-ProjectEco-Webserver) ![GitHub repo size](https://img.shields.io/github/issues/DylanK46/TeamEngima-ProjectEco-Webserver) ![GitHub repo size](https://img.shields.io/github/last-commit/DylanK46/TeamEngima-ProjectEco-Webserver)

## Introduction
Project Eco is the first project of Team Enigma, the AI team of [Harrow School](https://www.harrowschool.org.uk). 

Project Eco consists of four main parts;

 - **A webserver (and by extension, a website)**
 - Sensors on ESP-32 boards
 - An AI server, with Tensorflow
 - A set of forms
 

*This repository is for code regarding the webserver*

## Live Example
This code is runnning live on Jenkins and is accessible at [projecteco.ml](https://projecteco.ml/)

## Details
![enter image description here](https://raw.githubusercontent.com/DylanK46/TeamEngima-ProjectEco-Webserver/54e5729d56fce9383a1753efde4e51c23b027654/docs/diagram.svg)
## Webserver Technologies
The webserver should aim to be a MEVN stack; Containing:

 - **M**ongoDB
 - **E**xpress.js
 - **V**ue.js
 - **N**ode.js

It should have a REST endpoint to recieve data from an on-site AI server
It should use Websocket telemetry
It should an external MongoDB for JSON data storage
It should have a Bootstrap frontend with Angular, possibly with utilities such as Chart.js

It could eventually be placed into a Docker Container for easy deployment.
UPDATE : Using CD with github actions / Jenkins might provide the best solution

## Explaination
A more detailed explaination can be found [here](https://github.com/Harrow-Enigma/minutes/blob/main/20210327%20-%20Team%20Enigma%20Planning%20Meeting%20Summary.md#the-ecoproject).

## Other repositories
[AI Repo](https://github.com/Harrow-Enigma/ProjectECO-AI)
