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
        `;
    }
    render() {
        return html`
        <img src="../assets/img/Picture1.png">

        `;
    }
}