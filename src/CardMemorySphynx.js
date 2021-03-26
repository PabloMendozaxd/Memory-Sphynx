import { html, css, LitElement } from 'lit-element';

export class CardMemorySphynx extends LitElement {
  static get styles() {
    return css`
          :host {
            display: block;
            cursor:pointer;
          }
          img{
            height:100%;
            width:100%;
            border-radius:22px;
          }
          .card{
            height:100%;
            width:100%;
            background: rgba( 255, 255, 255, 0.10 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 4px );
            -webkit-backdrop-filter: blur( 4px );
            border-radius: 22px;
          }
          .card:hover{
            -webkit-box-shadow: 0px 0px 20px 1px #000000; 
            box-shadow: 0px 0px 20px 1px #000000;
          }
          :host([hide-element]){
            visibility:hidden;
          }
          :host([hide-picture]) img{
            display:none;
          }
        `;
  }

  static get properties() {
    return {
      picture: {
        type: String,
      },
    };
  }

  constructor() {
    super()
  }

  render() {
    return html`
        <div class="card">
          <img src="${this.picture}">
        </div>
        `;
  }
}
