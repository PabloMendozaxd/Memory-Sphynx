import { html, css, LitElement } from 'lit-element';

export class MemorySphynx extends LitElement {
  static get styles() {
    return css`
      :host {
        height:100%;
        background:url("../assets/img/sphynx-background.jpg") center/cover;
        padding:20%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        gap: 12px 12px;
        grid-template-areas:
          ". . . . . ."
          ". . . . . ."
          ". . . . . ."
          ". . . . . ."
          ". . . . . .";
      }
      #card-container{

      }
    `;
  }

  render() {
    return html`
      <score-memory-sphynx></score-memory-sphynx>
      <div id="card-container">
      <card-memory-sphynx></card-memory-sphynx>
      </div>
    `
  }
}
