import { html, css, LitElement } from 'lit-element';

export class MemorySphynx extends LitElement {
  static get styles() {
    return css`
      :host {
        display:block;
        height:100%;
        width:100%;
        background:url("../assets/img/pink-sphynx-background.jpg") center/cover;
        pseting:2rem;
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
        type: Boolean,
      },
      gameDifficulty: {
        type: Number,
      },
      opened: {
        type: Array,
      },
      score: {
        type: Object,
      }
    };
  }

  constructor() {
    super();
    this.__onInit();
  }

  connectedCallback() {
    super.connectedCallback();
    this.__createCards(this.numberOfPairs);
  }

  __onInit() {
    this.selectedCards = [];
    this.clicked = true;
    this.score = { playerOne: 0, playerTwo: 0 }
    this.turn = true;
    this.numberOfPairs = 5;
    this.matchedPairs = 0;
    this.winner = "";
  }

  __createCards(numberOfCards) {
    this.imgArray = [];
    for (let i = 1; i <= numberOfCards; i++) {
      this.imgArray.push({
        picture: `../assets/img/Picture${i}.png`,
        value: i,
        setAttrHidePicture: true,
        setAttrHideElement: false,
      });
      this.imgArray.push({
        picture: `../assets/img/Picture${i}.png`,
        value: i,
        setAttrHidePicture: true,
        setAttrHideElement: false,
      });
    }
    this.cards = this.imgArray.sort((a, b) => (Math.random() - 0.5));
  }

  __changeTurn() {
    this.turn = !this.turn;
  }

  __changeScore() {
    if (this.turn) {
      this.score.playerOne++;
    } else {
      this.score.playerTwo++;
    }
  }

  __countPairs() {
    this.matchedPairs++;
    if (this.matchedPairs === this.numberOfPairs) {
      if (this.score.playerOne > this.score.playerTwo) {
        alert('Gano player1');
      } else {
        alert('gano player2');
      }
    }
  }

  __clearCards() {
    this.selectedCards = [];
  }

  __hidePairElement() {
    this.selectedCards[0].setAttrHideElement = true;
    this.selectedCards[1].setAttrHideElement = true;
  }

  __hidePairPicture(){
    this.selectedCards[0].setAttrHidePicture = true;
    this.selectedCards[1].setAttrHidePicture = true;
  }

  __showPicture(selectedCard){
    selectedCard.setAttrHidePicture = false;
  }

  __selectCard(e, selectedCard) {
    if (this.selectedCards.length < 2) {
      this.selectedCards.push(selectedCard);
      this.__showPicture(selectedCard);
      this.requestUpdate();
      if (this.selectedCards.length == 2) {
        let isPair = this.__validatePair(this.selectedCards[0].value, this.selectedCards[1].value);
        if (isPair) {
          setTimeout(() => {
            this.__hidePairElement();
            this.__clearCards();
            this.__changeScore();
            this.__changeTurn();
            this.__countPairs();
            this.requestUpdate();
          }, 1000)
        } else {
          setTimeout(() => {
            this.__hidePairPicture();
            this.__clearCards();
            this.__changeTurn();
            this.requestUpdate();
          }, 1000);
        }
      }
    }
  }

  __validatePair(card1, card2) {
    return card1 === card2;
  }

  __selectLevel(e) {
    this.__onInit();
    this.__createCards(parseInt(e.detail));
  }

  render() {
    return html`
    <level-memory-sphynx @level-change="${this.__selectLevel}"></level-memory-sphynx>
    <div class="memory-header">
      <score-memory-sphynx .turn="${this.turn}">
      <span slot="player1">${this.score.playerOne}</span>
      <span slot="player2">${this.score.playerTwo}</span>
      </score-memory-sphynx>
    </div>

    <div class="memory-grid">
      ${this.cards.map(
      (card) => html`
          <card-memory-sphynx
          .picture="${card.picture}"
          ?hide-element="${card.setAttrHideElement}"
          ?hide-picture="${card.setAttrHidePicture}"
          @click="${e => this.__selectCard(e, card)}"
          ></card-memory-sphynx>`
    )}
    </div>
    `
  }
}
