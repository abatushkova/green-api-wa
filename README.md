# Green-Api ChatRoom
Test project for Green API to send and receive WhatsApp text messages.

Requirements:
1. Требуется разработать пользовательский интерфейс для отправки и получений сообщений WhatsApp
2. Требуется использовать сервис GREEN-API https://green-api.com/
3. Требуется реализовать отправку и получение только текстовых сообщений
4. Требуется за прототип интерфейса взять внешний вид чата https://web.whatsapp.com/
5. Требуется реализовать интерфейс максимально простым с минимальным набором функций
6. Требуется отправку сообщений реализовать методом https://green-api.com/docs/api/sending/SendMessage/
7. Требуется получение сообщений реализовать методом https://green-api.com/docs/api/receiving/technology-http-api/
8. Требуется использовать технологию React

Actions:
- Пользователь переходит на сайт чата и вводит свои учетные данные из системы GREEN-API (idInstance, apiTokenInstance)
- Пользователь вводит номер телефона получателя и создает новый чат
- Пользователь пишет текстовое сообщение и отправляет его получателю в WhatsApp
- Получатель отвечает на сообщение в мессенджере WhatsApp
- Пользователь видит ответ получателя в чате

### Built with
- Create React App
- Redux Toolkit
- TypeScript
- Axios (post, get)
- Material UI

## Getting Started
To get a local copy up and running follow these steps.

### Prerequisites
* Node.js
* npm
```
npm install -g npm
```

### Installation
1. Clone the repo
```
git clone https://github.com/abatushkova/green-api-wa.git
```
2. Chage directory
```
cd green-api-wa
```
3. Install NPM packages
```
npm install
```
4. Start the local server
```
npm start
```

## Usage
[Live Demo](https://abatushkova.github.io/green-api-wa/)

#### Login
To start using ChatRoom enter your credentials from Green-Api system (idInstance, apiTokenInstance).

![login](../media/window01.jpeg?raw=true)

#### ChatRoom
Left column contains field to create chat, chat list. To create chat enter phone number, acceptable format is *+7xxxxxxxxxx* | *8xxxxxxxxxx*, click Enter or "+" icon.

![add chat](../media/window02.jpeg?raw=true)

Right column is for sending and receiving messages. To open chat select phone number.  
Auto-load new text messages from WhatsApp is not presented in this project. To load messages refresh webpage or switch back and forth between chats.

![chat preview](../media/window03.jpeg?raw=true)

#### Reset authentification settings
Click Logout icon to reset auth settings in localStorage.

![logout](../media/window04.jpeg?raw=true)
