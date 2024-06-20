import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

class GoogleFormEmbed extends HTMLElement {
  // shadow;
  formId: string;

  constructor() {
    // Always call super first in constructor
    super();
    this.formId = this.dataset.id || '';
    this.renderElement();
  }

  renderElement() {
    ReactDOM.createRoot(this!).render(
      <React.StrictMode>
        <App formId={this.formId} />
     </React.StrictMode>
    );
  }
}

customElements.define('google-form-embed', GoogleFormEmbed);
