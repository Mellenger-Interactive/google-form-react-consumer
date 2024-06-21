# About this project

This repo creates a tiny custom HTML component that becomes a React app that embeds a simple, stylable Google form.
This repo works with a small Heroku app to return form structure as JSON, before delivering it as React components.

# Usage

Embed the following in your page, replacing `GOOGLE_FORM_ID` with the value from your Google Form (`https://docs.google.com/forms/d/GOOGLE_FORM_ID/edit`).
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Mellenger-Interactive/google-form-react-consumer@main/dist/google-form-react-consumer.js"></script>
<link href="https://cdn.jsdelivr.net/gh/Mellenger-Interactive/google-form-react-consumer@main/dist/google-form-react-consumer.css" rel="stylesheet" type="text/css" media="all">
<google-form-embed
  data-form-id="GOOGLE_FORM_ID"
  data-success-message="GOOGLE_FORM_SUCCESS_MESSAGE">
</google-form-embed>
```

# Development

Run `yarn dev`. Please note that the current setup expects you to run the Heroku app locally. To change this, simply chang the `middlewareUrl` variable in `App.tsx` to point to the Heroku library, like it does on production.

# Deployment

Run `yarn build` to compile the latest JS and CSS, and push to the `main` branch.
Right now, `/dist/google-form-react-consumer.js` and `/dist/google-form-react-consumer.css` are served by CDN by [JsDelivr](https://www.jsdelivr.com/github).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
