import { html, css, LitElement } from 'lit-element';

export class ScoreMemorySphynx extends LitElement {
  static get styles() {
    return css`
      :host{
        height:100%;
        width:100%;
        display:flex;
        justify-content:space-around;
        align-items:center;
      }
      .container {
        height:80%;
        width:30%;
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 3.0px );
        -webkit-backdrop-filter: blur( 3.0px );
        border-radius: 10px;
        text-align:center;
        display:flex;
        justify-content:space-around;
        align-items:center;
      }
      .container.active {
        border:3px solid red;
      }
      .score {
        border: 5px solid white;
        border-radius: 22px;
        padding: 5px;
      }
      ::slotted(span) {
        color: #fafafa;
        font-size: 30px;
        font-weight: bolder;
      }
      #level-select{
        background: rgba( 0, 0, 0, 0.50 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 0.0px );
        border-radius: 22px;
        color:white;
      }
        `
  }
  
  static get properties() {
    return {
      turn: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.turn = true;
  }

  render() {
    return html`
        <div class="container ${this.turn === true ? 'active' : ''}">
            <h1>Player 1</h1>
            <div class="score"><slot name="player1"></slot></div>
        </div>
        
      <div class="container ${this.turn === false ? 'active' : ''}">
      <h1>Player 2</h1>
        <div class="score"><slot name="player2"></slot></div>
      </div>
        `;
  }

}