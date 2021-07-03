<h1 align="center">Project JuicyBoys (name TBD)</h1>

## Motivation
This project is being created to tackle one of Africa's biggest challenges: bringing the spotlight to market-creating innovations which were created using technology.
The application is designed to spread knowledge, build a community, and encourage discussion revolving around a diverse range of topics. 
It solves the problem of not having a single platform that ties e-learning and community building into one.
The motivation behind creating this project is to create a simple way for people to spread their knowledge, digitally showcase their startup, or find a way to learn something new.

## Installation
We are using: 
- MERN stack: MongoDB, Express, React, and Node.js
- AWS S3 for image/video storage

### 0. Clone the repository
```shell
$ git clone git@github.com:UTSCCSCC01/project-juicyboys.git
```

### 1. Install Node.js and npm
* Node: https://nodejs.org/
* You can also use [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating)
```shell
$ nvm install --lts
```

### 2. Install required dependencies
```shell
$ npm ci
$ npm run client-install
```

### 3. Create a .env file and add the connection to the MongoDB
On Unix:
```shell
$ echo "ATLAS_URI=mongodb+srv://ammarT:C7kHJ42WzHCbuvEG@juicyboys.bqnoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" >> .env
```
Or, manually create a `.env` file in the root directory:
```shell
$ touch .env
```
Open the file and paste in the following key-value pair:
```
ATLAS_URI=mongodb+srv://ammarT:C7kHJ42WzHCbuvEG@juicyboys.bqnoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

### 4. Run the (dev) server
```shell
$ npm run dev
```
## Documentation for backend

Documentation for backend routes can be viewed at localhost:5000/api-docs when project is run locally. URLs, type of request, request and response bodies are all documented there.

## Documentation for frontend

Each page is given a dedicated directory under ```/client/src/pages```, in which 3 files should exist:
```
index.js - For exporting the jsx element
PAGE.jsx - Frontend page component
PAGE.MODULE.SCSS - Scoped scss for styling
```
Furthermore components can also be created under ```/client/src/components/``` in which the same 3 files should exist under each dedicated directory.
Assets like pictures and svgs can be saved under the ```assets``` folder for frontend use.

Documentation for each page can be found in the System Design Document, where a crc card is given for each frontend page.


## Contribution

Follow Git flow to manage the repository, and use pull requests to merge. Use Github issues for ticketing.

### 0. Make sure your branch is up to date
```shell
$ git clone git@github.com:UTSCCSCC01/project-juicyboys.git
$ git pull
```

### 1. Create a feature branch from develop
Create new branch names following the convention used below.
```shell
$ git checkout -b feature/JUIC-{JIRA ISSUE NUMBER} develop
```

### 2. Commit changes and push them
Please follow the convention shown below when writing commit messages.
```shell
$ git add .
$ git commit -m "JUIC-{ISSUE NUMBER} A detailed commit message"
$ git push -u origin feature/JUIC-{ISSUE NUMBER}
```

### 3. Create a pull request for the feature
Once you have completed a feature, [create a pull request](https://github.com/UTSCCSCC01/project-juicyboys/pulls) to review changes in the code. Be sure to set the pull request onto the develop branch. Reference the relevant issue from the Github issues board if applicable.
![New pull request button](https://i.imgur.com/3awEW0L.png)
