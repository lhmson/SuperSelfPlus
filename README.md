<h1>SuperSelf Plus</h3>

[![superself compliant](https://img.shields.io/badge/self%20development-mobile-brightgreen.svg?style=flat-square)](https://github.com/lhmson/SuperSelf)
[![superself compliant](https://img.shields.io/badge/habit%20tracker-community-brightgreen.svg?style=flat-square)](https://github.com/lhmson/SuperSelf)
[![superself compliant](https://img.shields.io/badge/running%20tracker-community-brightgreen.svg?style=flat-square)](https://github.com/lhmson/SuperSelf)
[![superself compliant](https://img.shields.io/badge/react%20native-61dafb.svg?style=flat-square)](https://reactnative.dev/)
[![superself compliant](https://img.shields.io/badge/nodejs-026e00.svg?style=flat-square)](https://nodejs.org/)
[![superself compliant](https://img.shields.io/badge/mongo-13aa52.svg?style=flat-square)](https://www.mongodb.com/)

![GitHub repo size](https://img.shields.io/github/repo-size/lhmson/SuperSelfPlus)
![GitHub contributors](https://img.shields.io/github/contributors/lhmson/SuperSelfPlus) <!--![GitHub stars](https://img.shields.io/github/stars/lhmson/SuperSelfPlus)
![GitHub forks](https://img.shields.io/github/forks/lhmson/SuperSelfPlus)-->
[![Github follow](https://img.shields.io/github/followers/lhmson?label=Follow&style=social)](https://github.com/lhmson)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&color=blue)](https://linkedin.com/in/leesown)

<p align="center">
 <img src="https://github.com/lhmson/SuperSelfPlus/blob/master/clientSuperSelf/src/utils/resources/superself-logo.png?raw=true" alt="SuperSelf logo"></a>
</p>

<h3 align="center">Target for a mobile application 🎯 of Self development training 😎 by React Native</h3>
<h3 align="center">We are building a product for a community of positive lifestyle</h3>
<h3 align="center">Fill your life with good habits 👍 Put your little steps into the large world 👟 Let's be the glowing star 🌟</h3>

<p align="center"><i>Note: this is my school project to learn Mobile Application Development. Hope it will get high remarks</i></p>

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/PosterOffical.png?raw=true" alt="Poster"></a>
 <i>App Poster</i>
</p>

---

## 📝 Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Install](#install-for-dev)
- [Usage](#usage)
- [Features](#features)
	- [Habit Tracker](#habit-tracker)
	- [Running Tracker](#running-tracker)
  - [Statistics](#statistics)
  - [Community](#community)
    - [Events](#events)
    - [Share-Connect](#share-connect)
  - [Others](#others)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [References](#references)
	- [Tools](#tools)
	- [Articles tutorials](#articles-tutorials)
- [Team](#team)
- [Contributing](#contributing)
- [Development](#development)
	- [Progress](#progress)
	- [Suggestion](#suggestion)
- [License](#license)

## Introduction

In the era of this fast-paced society, people need to constantly develop themselves in many aspects of life, especially with the support of technology. Many applications such as [Fabulous](https://www.thefabulous.co/), [Habitify](https://www.habitify.me/), ... help us manage these things. However, this is a new field that can be exploited and further developed, so my team choose to research and implement an app which helps build good habits and motivate personal development, named SuperSelf - Self Development App. The product inherits the strengths of its predecessors, and incorporates a number of interesting features towards the maximum personal development of the user.

Not only a normal [scheduling application](#habit-tracker), where user can easily check as well as update theri progress any time, SuperSelf offers users a new and exciting feeling when playing as a character [joining in events](#events) and get highest rankings, collecting experience and [score with lively and intuitve statistic graphs](#stats). In addition, the application also has a classification of lots of suggested habits based on scientific recommendation, which are related to personal development (human communication, relationships, motivation, health, finance management, goal planning, knowledge and skills, spiritual strength ...).

We offer a bunch of utilities to help you effectively take and measure your actions, one of which is the [integrated running tracker](#running-tracker). Anything better than get on our shoes and go for a run everyday? This is one of the best habits to train, which makes every aspect of your life better. You will know your number of steps in a day or activate the running mode for a period of time, then get the results and know yourself better.

One more interesting feature is to connect people, in virtual events and even in the real space: you can [find others with simliar habits nearby](#find-friends) your area. At the same time users can [share short stories](#stories) about themselves (when they set goals, achieve success, ...) - everything is presented in the style of social-network like Facebook. In short, our aim is to [build a community](#community) of better selves. Let's join us to become the master of life.

## Getting Started

### Prerequisites

<details>
<summary>Click to read more</summary>
<br>
This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

Install Expo and get used to it - a very helpful tool for building universal React app, as it mentions in the [documentation](https://docs.expo.io/get-started/installation/).

```sh
$ npm install -g expo-cli
```

If you want to run the app directly before deploying in iOS or Android, [download Expo Client](https://expo.io/tools#client) on your phone.

Make sure you have downloaded the suitable version of Expo up to now. It should be Expo SDK >= 40.
</details>

### Install for dev

<details>
<summary>Click to read more</summary>
<br>
1. First, clone this project

```sh
$ git clone https://github.com/lhmson/SuperSelfPlus.git
```

2. Change directory
```sh
$ cd SuperSelfPlus
```

3. You can  see two folders client and server. Open in an editor (Visual Studio Code or so).

4. Install packages for both client and server.
```sh
$ npm install
```

5. Config suitable backend and database  
- In `constants/configs.js` of folder `clientSuperSelf`, edit backend url of your own (i.e. http://192.168.1.8:5000, check ipconfig)
- In `server`, add file `.env` and add connection url and jwt key and [cloudinary](https://cloudinary.com/) key
```
CONNECTION_URL = mongodb://localhost:27017/SuperSelf
JWT_ACCESS_KEY=test
CLOUDINARY_NAME=abc
CLOUDINARY_API_KEY=123
CLOUDINARY_API_SECRET=test12345
```

6. Run the app  
For server
```sh
$ npm run start:dev
```
For client
```sh
$ npm start
```
or
```sh
$ expo start
```

7. Scan displayed QR code with Expo client

8. Enjoy all features of the app by signing up
</details>


## Usage

<details>
<summary>Click to read more</summary>
<br>
First you have to have an account. Click Sign up and enter. Just easy as that and you can explore the world of self development
</details>

## Features

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/features_diagram.png?raw=true" alt="SuperSelf features drawing"></a>
 <i>SuperSelf features diagram</i>
</p>

### Habit Tracker

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo1.png?raw=true" alt="Demo habit"></a>
 <i>Demo habit tracker</i>
</p>

### Running tracker

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo2.png?raw=true" alt="Demo running tracker"></a>
 <i>Demo running tracker</i>
</p>

### Statistics

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo3.png?raw=true" alt="Demo statistics"></a>
 <i>Demo statistics</i>
</p>

### Community

#### Events

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo5.png?raw=true" alt="Demo events"></a>
</p>

<p align="center">
	<i>Demo events</i>
</p>

#### Share-connect

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo5.png?raw=true" alt="Demo connect"></a>
</p>

<p align="center">
	<i>Demo share and connect</i>
</p>

### Others

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/assets/demo6.png?raw=true" alt="Demo other screen"></a>
 <i>Demo others</i>
</p>

## Project Structure

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/architecture.png?raw=true" alt="SuperSelf architecture"></a>
 <i>Architecture design</i>
</p>

<p align="center">
 <img src="https://github.com/lhmson/SuperSelf/blob/master/screen_flow.png?raw=true" alt="Screen flow"></a>
</p>

<p align="center">
	<i>App Screen Flow</i>
</p>

## Tech Stack

- **Languages**: [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Framework**: [React Native >= 0.63](https://reactnative.dev/)
- **Database Backend Service**: [Firebase (Cloud Firestore)](https://firebase.google.com/)
- **Text Editor**: [Visual Studio Code](https://code.visualstudio.com/)
- **Tool**: [Expo >= SDK 40](https://docs.expo.io/)
- **Version Control System**: [Git](https://git-scm.com/)
- **UI Prototype**: Powerpoint

## References

### Tools

- [Galio UI](https://galio.io/)
- [React Navigation](https://reactnavigation.org/)
- [Expo push notifications](https://docs.expo.io/push-notifications/overview/)
- [Styled components](https://github.com/styled-components/styled-components)
- [React context](https://reactjs.org/docs/context.html)
- [Redux](https://redux.js.org/introduction/getting-started)
- [Lucid chart](https://www.lucidchart.com/pages/)
- [expo vector icon](https://icons.expo.fyi/)
- [Pinterest](https://www.pinterest.com/)
- [Unsplash](https://unsplash.com/)

### Articles tutorials:

- [DesignIntoCode](https://www.youtube.com/channel/UCPZlE8KsMkumnjEMOcJDxuQ)
- [React Native Animation](https://www.youtube.com/playlist?list=PLYxzS__5yYQmdfEyKDrlG5E0F0u7_iIUo)
- [Combining Stack, Tab & Drawer Navigations in React Native With React Navigation 5, Ekunola Ezekiel (2020)](https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da)
- [Realtime Database vs. Cloud Firestore — Which Database is Suitable for your Mobile App, Ashish Sharma (2018)](https://medium.com/datadriveninvestor/realtime-database-vs-cloud-firestore-which-database-is-suitable-for-your-mobile-app-87e11b56f50f)
- [How to Build a React Native App and Integrate It with Firebase, Florian Marcu (2020)](https://www.freecodecamp.org/news/react-native-firebase-tutorial/)

### Team

This project exists thanks to all the people who contribute.

My original team has 2 members, including me: Le Hoang Minh Son (lhmson) and Pham Lien Sanh (sanhlike).
We discuss, select a topic, and specify the software design process, then make a list of features to implement, which has changed many times before we have this product.
<a href="https://github.com/lhmson/superself/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lhmson/SuperSelf" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/lhmson/SuperSelf/issues/new) or submit PRs.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.

## Development

### Progress

Now I am not working on building and maintaining this project. If there comes error when setting up, try to fix it. You can feel free to clone and develop. Should anything wrong happen to Firebase, create a new Cloudstore DB and edit the config file in firebase folder.

### Suggestion
Some examples of functions to implement, these are plans of us and you to extend the app
- Scale number of users while keeping the stability of the app (now up to 100)
- Optimize memory and execution time of functions
- Message among users (like Messenger)
- More elements and maps
- Ranking system, friends,...
- More items for database
- Report user stories
- Users can post articles through censorship
- Comments, number of likes
- and many aspects to generate

## License

GNU
