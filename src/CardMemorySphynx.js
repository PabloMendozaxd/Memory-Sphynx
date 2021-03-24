import { html, css, LitElement } from 'lit-element';

export class CardMemorySphynx extends LitElement {
    static get styles() {
        return css`
          :host {
            display: block;
          }
          img{
            height:100%;
            width:100%;
            border-radius:22px;
          }
          #card{
            height:80%;
            width:80%;
            background: rgba( 255, 255, 255, 0.10 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 4px );
            -webkit-backdrop-filter: blur( 4px );
            border-radius: 22px;
          }
          #card:hover{
            -webkit-box-shadow: 0px 0px 20px 1px #000000; 
            box-shadow: 0px 0px 20px 1px #000000;
          }
          #card.matched{
            display:none;
          }
          .picked{
            box-shadow: 0px 0px 16px 8px #FFFFFF;
          }
          .unpicked{
            display:none;
          }
        `;
    }

    static get properties() {
      return {
        picture: {
          type: String,
        },
        matched: {
          type: Boolean,
        },
        picked: {
          type: Boolean,
        },
      };
    }
    connectedCallback() {
      super.connectedCallback()
      this.matched=false;
      this.picked=false;
    }

    firstUpdated() {
      this.addEventListener('matched', () => {
        this.matched = true;
      });
      this.addEventListener('picked', () => {
        this.picked = true;
      });
      this.addEventListener('close', () => {
        this.picked = false;
      });
    }

    render() {
        return html`
        <div id="card" class="${this.matched ? 'matched' : ''}">
        <img class="${this.picked ? 'picked' :'unpicked'}" src=../assets/img/Picture${this.picture}.png>
        </div>
        
        `;
    }
}