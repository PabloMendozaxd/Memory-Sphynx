import { html, css, LitElement } from 'lit-element';

export class MemorySphynx extends LitElement {
  static get styles() {
    return css`
      :host {
        height:100%;
        width:100%;
        background:url("../assets/img/pink-sphynx-background.jpg") center/cover;
        padding:8%;
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
      },
      opened: {
        type: Array,
      },
      canMove: {
        type: Boolean,
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.createCards()
    this.canMove = true;
    this.opened = [];
    this.score = { 1: 0, 2: 0 }
  }
  createCards() {
    this.imgArray = [];
    // this.mixedArray=[]
    const numberOfCards = 15;

    for (let i = 0; i < numberOfCards; i++) {
      this.imgArray.push(i + 1);
      this.imgArray.push(i + 1);
    }
    this.cards= this.imgArray.sort(function (a, b) { return (Math.random() - 0.5) });
    console.log(this.cards)
  }
  __dispatchEvent(event, detail) {
    this.dispatchEvent(new Event(event, detail));
  }

  
  _openCard(e) {
    e.target.dispatchEvent(new Event('picked'));
    if (this.opened.length<2) {
      this.opened.push(e.target.picture)  
      if (this.opened[0]===this.opened[1]) {
        console.log("Son pares")
      }else{
        this.__clearCards('close')
      }
    }
    console.log(this.opened)
  }
  
  __clearCards(event) {
    return new Promise(res => {
      setTimeout(() => {
        this.opened[0].target.dispatchEvent(new Event(event));
        this.opened[1].target.dispatchEvent(new Event(event));
        this.opened = [];
        this.canMove = true;
        res();
      }, 1500);
    });
  }
  render() {
    return html`
      <score-memory-sphynx></score-memory-sphynx>
      ${this.cards.map(
      (card) => {
        return html`
          <card-memory-sphynx
          picture="${card}"}"
          @click="${this._openCard}"
          ></card-memory-sphynx>`
      }
    )}
    `
  }
}
