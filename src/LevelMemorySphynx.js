import { html, css, LitElement } from 'lit-element';

export class LevelMemorySphynx extends LitElement {
  static get styles() {
    return css`
          :host{
            display:inline-block;
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