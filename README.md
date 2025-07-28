# cli

## Install

```
npm install @jlongyam/cli --save-dev
```

## Usage

__index.mjs__

```js
import { args } from "@jlongyam/cli";
console.log(args)
```

__terminal__

```shell
node index.mjs --help
```

__result__:

```js
{ help: true }
```

## Credit

- [enquirer](https://github.com/enquirer/enquirer)

License [MIT](LICENSE)