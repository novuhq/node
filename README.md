<p align="center">
  <a href="https://notifire.co">
    <img width="200" src="https://notifire.co/img/logo.png">
  </a>
</p>

<h1 align="center">Notifire Node SDK</h1>

<div align="center">

And SDK to interact with the Notifire API

</div>

## ✨ Features

- 🌈 Trigger new notifications from node
- 📦 Easy to setup and integrate
- 🛡 Written in TypeScript with predictable static types.

## 📦 Install

```bash
npm install @notifire/node
```

```bash
yarn add @notifire/node
```

## 🔨 Usage

```ts
import { Notifire } from '@notifire/node';

const notifire = new Notifire(process.env.NOTIFIRE_API_KEY);

await notifire.trigger('<REPLACE_WITH_EVENT_NAME>', {
  $user_id: "<USER IDENTIFIER>",
  $email: "<USER_EMAIL>",
  customAttribute: "", // use the custom attribute from each event here
  firstName: "" 
});

```

### TypeScript

`@notifire/node` is written in TypeScript with complete definitions.

## 🔗 Links

- [Home page](https://notifire.co/)
