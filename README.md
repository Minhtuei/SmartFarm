# About this project
This project is about building an application for interacting with IOT devices. Using MQTT broker at the protocol to communicate between python gateway and NodeJs server. The application also has many essential features, such as dashboard, notification and devices controller.
# Get a look
| ![dashboard.png](/DemoImage/dashboard.png) | 
|:--:| 
| *Dashboard* |

| ![profile.png](/DemoImage/profile.png) | 
|:--:| 
| *Profile* |

| ![device.png](/DemoImage/device.png) | 
|:--:| 
| *Device Controller* |

| ![controller.png](/DemoImage/controller.png) | 
|:--:| 
| *Device Detail* |

| ![notification.png](/DemoImage/notification.png) | 
|:--:| 
| *Notification* |

| ![help.png](/DemoImage/help.png) | 
|:--:| 
| *Help page* |
# Start App
0. Install
  0.1 VSCode + Extension Prettier
  0.2 Node >=18
  0.3 Yarn

1. Clone Repo from github
  ```
  git clone https://github.com/tungdoanduy/DADN-232.git
  ```
2. Create .env from .env.example
3. Start app
  ``` 
      yarn: install dependency 
      yarn start:fe : start front end application
      yarn start:be : start backend application
  ```


# Other
[![formatter: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) ![CI](https://github.com/phucvinh57/fastify-template/actions/workflows/ci.yml/badge.svg) ![Deploy](https://github.com/phucvinh57/fastify-template/actions/workflows/release.yml/badge.svg)

This template includes:

- Testing: `jest`
- Code linting & styling: `husky` + `prettier`
- Precommit hook: `lint-staged`

For applying conventional commits, refer [commitizen](https://github.com/commitizen/cz-cli).

## Prerequisites

- `node` v18.13.0
- `npm` 8.19.3

## Commands

Note: Fill in `.env` file (use template from `.env.example`) before starts.

- `yarn bootstrap`: Set up development
- `yarn barrels`: Gather export objects from many files in a folder and re-export in `index.ts` file. See configs in `.barrelsby.json`.
- `yarn start`: Start application in dev mode
- `yarn lint`: Check linting
- `yarn format`: Format code
- `yarn clean:git`: Clean local branches which were merged on remote
