module.exports = {
  "root": true,

  "env": {
    "browser": true,
    "es2021": true
  },
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": `${__dirname}/src/scripts/`,
    "ecmaVersion": "latest",
    "sourceType": "module"
  },

  "extends": "standard-with-typescript",
}