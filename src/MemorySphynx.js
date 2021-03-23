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
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 12px 12px;
        grid-template-areas:
          ". . . . . ."
          ". . . . . ."
          ". . . . . ."
          ". . . . . ."
          ". . . . . ."
          ". . . . . .";
      }
      score-memory-sphynx{
        grid-column: 1/7;
        grid-row: 1/2;
      }
    `;
  }
  connectedCallback() {
    super.connectedCallback()
    this.showCards()
  }
 showCards(){
  const getRandom = () => {
    const min = Math.ceil(1);
    const max = Math.floor(15);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  console.log(getRandom())
 }
  render() {
    return html`
      <score-memory-sphynx></score-memory-sphynx>
      <card-memory-sphynx></card-memory-sphynx>
    `
  }
}
