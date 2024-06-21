import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

class GoogleFormEmbed extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    document.addEventListener('DOMContentLoaded', () => {
      this.renderElement();
    });
  }

  renderElement() {
    const formId = this.dataset.formId || '';
    const successMessage = this.dataset.successMessage || 'Thank you for your submission. We will get back to you soon.';

    ReactDOM.createRoot(this!).render(
      <React.StrictMode>
        <App formId={formId} successMessage={successMessage} />
     </React.StrictMode>
    );
  }
}

if (!customElements.get('google-form-embed')) {
  customElements.define('google-form-embed', GoogleFormEmbed);
}
