import { html, css, LitElement } from 'lit-element';

export class ScoreMemorySphynx extends LitElement{
    static get styles(){
        return css`
         :host{
            height:100%;
            width:100%;
            display:flex;
            justify-content:space-around;
            align-items:center;
         }
         div{
            height:80%;
            width:30%;
            background: rgba( 255, 255, 255, 0.25 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 3.0px );
            -webkit-backdrop-filter: blur( 3.0px );
            border-radius: 10px;
            text-align:center;
            display:flex;
            justify-content:center;
            align-items:center;
         }
        `
    }
    render(){
        return html`
        <div>Cosmo</div>
        <div>Lyla</div>
        `;
    }
}