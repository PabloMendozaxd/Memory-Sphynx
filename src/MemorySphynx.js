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
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
      turn: {
        type: Number,
      },
      opened: {
        type: Array,
      },
      canMove: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super()
    this.canMove = true;
    this.opened = [];
    this.clicked = true;
    this.score = { 1: 0, 2: 0 }
    this.gameDifficulty = 0;
  }

  connectedCallback() {
    super.connectedCallback()
    this.createCards()
  }
  createCards() {
    this.imgArray = [];
    const numberOfCards = 15;

    for (let i = 0; i < numberOfCards; i++) {
      this.imgArray.push(i + 1);
      this.imgArray.push(i + 1);
    }
    this.cards = this.imgArray.sort(function (a, b) { return (Math.random() - 0.5) });
    console.log(this.cards)
  }
  myEvent(event, detail) {
    this.dispatchEvent(new Event(event, detail));
  }


  open(e) {
    e.target.dispatchEvent(new Event('picked'));
    if (this.opened.length < 2 && this.clicked) {
      this.opened.push(
        {
          picture: e.target.picture,
          target: e.target,
        })
      if (this.opened.length == 2) {
        this.validatePair();
      }
    }
  }

  close(event) {
    return new Promise(res => {
      setTimeout(() => {
        this.opened[0].target.dispatchEvent(new Event(event));
        this.opened[1].target.dispatchEvent(new Event(event));
        this.opened = [];
        this.clicked = true;
        res();
      }, 1500);
    });
  }
  validatePair() {
    this.canMove = false;
    if (this.opened[0].picture === this.opened[1].picture) {
      this.close('matched')
      this.score[this.turn] += 1;

      if (this.score[1] + this.score[2] === length) {
        this.__dispatchEvent('gameOver', {
          detail: {
            winner: this.score[1] > this.score[2] ? 1 : 2,
          },
        });
      }
      this.requestUpdate();
    } else {
      this.close('close').then(() => {
        this.turn = this.turn === 1 ? 2 : 1;
      });
    
    }
  }
  render() {
    return html`
      <score-memory-sphynx turn="${this.turn}">
      <span slot="player1">${this.score[1]}</span>
      <span slot="player2">${this.score[2]}</span>
      </score-memory-sphynx>
      ${this.cards.map(
      (card) => {
        return html`
          <card-memory-sphynx
          picture="${card}"}"
          @click="${this.open}"
          ></card-memory-sphynx>`
      }
    )}
    `
  }
}
