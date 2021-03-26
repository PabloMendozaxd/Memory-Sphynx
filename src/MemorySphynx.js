import { html, css, LitElement } from 'lit-element';

export class MemorySphynx extends LitElement {
  static get styles() {
    return css`
      :host {
        display:block;
        height:100%;
        width:100%;
        background:url("../assets/img/pink-sphynx-background.jpg") center/cover;
        padding:2rem;
      }
      .memory-header{
        display:flex;
        justify-content:space-between;
        margin-bottom: 2rem;
      }
      .memory-grid{
        display:grid;
        grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
        grid-auto-rows: 150px;
        gap: 1rem;
      }
      select{
        
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
      gameDifficulty: {
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
    this.turn=1;
    this.gameDifficulty = 5;
  }

  connectedCallback() {
    super.connectedCallback()
    this.createCards(this.gameDifficulty)
  }

  createCards(numberOfCards) {
    this.imgArray = [];
    for (let i = 0; i < numberOfCards; i++) {
      this.imgArray.push(i + 1);
      this.imgArray.push(i + 1);
    }
    this.cards = this.imgArray.sort(function (a, b) { return (Math.random() - 0.5) });
    console.table(this.cards)
  }

  createEvent(event, detail) {
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
  __selectLevel(e){
    this.createCards(parseInt(e.target.value));
  
    
  }
  render() {
    return html`
    <select @change="${this.__selectLevel}" name="numberOfCards" id="cars">
      <option value="5">Easy</option>
      <option value="10">Medium</option>
      <option value="15">Hard</option>
    </select>

    <div class="memory-header">
      <score-memory-sphynx turn="${this.turn}">
      <span slot="player1">${this.score[1]}</span>
      <span slot="player2">${this.score[2]}</span>
      </score-memory-sphynx>
    </div>

    <div class="memory-grid">
      ${this.cards.map(
      card => html`
          <card-memory-sphynx
          picture="${card}"
          @click="${this.open}"
          ></card-memory-sphynx>`
      )}
    </div>
    `
  }
}
