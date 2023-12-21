module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/jsx-runtime",
        "prettier"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "overrides": [
    ],
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": 0
    }
}
