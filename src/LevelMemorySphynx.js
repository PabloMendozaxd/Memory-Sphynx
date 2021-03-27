import { html, css, LitElement } from 'lit-element';

export class LevelMemorySphynx extends LitElement {
  static get styles() {
    return css`
          :host{
            display:inline-block;
            position:absolute;
            top:0;
            right:0;
          }
          select{
            
            border:1px solid red;
            background: rgba( 0, 0, 0, 0.20 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 4px );
            -webkit-backdrop-filter: blur( 4px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
            transform: translate(-20%,300%);
          }
        `
  }

  __selectLevel(e){
    let level = parseInt(e.target.value);
    let customEvent = new CustomEvent('level-change',{
      detail:level
    });
    this.dispatchEvent(customEvent);
  }

  render() {
    return html`            
      <select @change="${this.__selectLevel}">
          <option value="5">Easy</option>
          <option value="10">Medium</option>
          <option value="15">Hard</option>
      </select>
      `;
  }
}