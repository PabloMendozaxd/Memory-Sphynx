import { html, css, LitElement } from 'lit-element';

export class MemorySphynx extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        border:1px solid black;
      }
    `;
  }

  render() {
    return html`
      <h1>Hola</h1>
      <score-memory-sphynx></score-memory-sphynx>
      <card-memory-sphynx></card-memory-sphynx>
    `
  }
}
