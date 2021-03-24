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
  static get properties() {
    return {
      cards: {
        type: Array,
        value: [],
      }
    }
  }
  
  connectedCallback() {
    super.connectedCallback()
    this.showCards()
  }
  showCards() {
    this.deck=[];
    const getRandom = () => {
      const min = Math.ceil(1);
      const max = Math.floor(15);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (let index = 0; index < 15; index++) {
      const element = this.deck[index];
      this.deck.push(getRandom())
    }
    this.cards=this.deck;
  }
  render() {
    return html`
      <score-memory-sphynx></score-memory-sphynx>
      ${this.cards.map(
        i => {
          return html`
          <card-memory-sphynx picture="${i}">
            
          </card-memory-sphynx>`
        } 
      )}
    `
  }
}
