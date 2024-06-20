import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

class GoogleFormEmbed extends HTMLElement {
  formId: string;

  successMessage: string;

  constructor() {
    // Always call super first in constructor
    super();
    this.formId = this.dataset.id || '';
    this.successMessage = this.dataset.successMessage || 'Thank you for your submission. We will get back to you soon.';
    this.renderElement();
  }

  renderElement() {
    ReactDOM.createRoot(this!).render(
      <React.StrictMode>
        <App formId={this.formId} successMessage={this.successMessage} />
     </React.StrictMode>
    );
  }
}

customElements.define('google-form-embed', GoogleFormEmbed);
