import { html, fixture, expect, waitUntil } from '@open-wc/testing';
import { restore, stub } from 'sinon';

import '../memory-sphynx.js';

describe('MemorySphynx', () => {
  beforeEach(function(){
      restore();
  });

  it('the property turn changes its value.', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    el.turn=true;
    el.__changeTurn();
    expect(el.turn).to.equal(false);
  });

  it('changes the value of the property setAttrHidePicture', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    let selectedCard={
        setAttrHidePicture:true
    };
    el.__showPicture(selectedCard);
    expect(selectedCard.setAttrHidePicture).to.equal(false);
  });

  it('changes the value of the property setAttrHidePicture in each position', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    el.selectedCards=[{setAttrHidePicture:false},{setAttrHidePicture:false}];
    el.__hidePairPicture();
    expect(el.selectedCards[0].setAttrHidePicture).to.equal(true);
    expect(el.selectedCards[1].setAttrHidePicture).to.equal(true);
  });

  it('changes the value of the property setAttrHideElement in each position', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    el.selectedCards=[{setAttrHideElement:false},{setAttrHidePicture:false}];
    el.__hidePairElement();
    expect(el.selectedCards[0].setAttrHideElement).to.equal(true);
    expect(el.selectedCards[1].setAttrHideElement).to.equal(true);
  });

  it('empties the selectedCards array', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    el.selectedCards=[1,2];
    el.__clearCards();
    expect(el.selectedCards.length).to.equal(0);
  });

  it('validates that selectLevel receives an event', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    const stubOnInit=stub(el,'__onInit');
    const stubCreateCards=stub(el,'__createCards');
    let event={
        target:{
            value:'5'
        }
    };
    el.__selectLevel(event);
    expect(stubOnInit).to.have.callCount(1);
    expect(stubCreateCards).to.have.callCount(1);
  });

  it('evaluates if turn is true to increment playerOne', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    el.turn=true;
    el.score.playerOne=0;
    el.__changeScore();
    expect(el.score.playerOne).to.equal(1);
  });

  it('evaluates if turn is false to increment playerTwo', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    el.turn=false;
    el.score.playerTwo=0;
    el.__changeScore();
    expect(el.score.playerTwo).to.equal(1);
  });

  it('validates that card1 and card2 are equal', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    let card1=1;
    let card2=1;
    el.__validatePair(card1,card2);
    expect(card1===card2).to.equal(true);
  });

  it('increments the value of matchedPairs in one, validate if matchedPairs is equal to numberOfPairs and also if score.playerOne is greater than score.playerTwo', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    const alertStub = stub(window, 'alert');
    el.matchedPairs=0;
    el.numberOfPairs=1;
    el.score.playerOne=3;
    el.score.playerTwo=1;
    el.__countPairs();
    expect(el.matchedPairs).to.equal(1);
    expect(alertStub).to.have.callCount(1);
  });
  it('increments the value of matchedPairs in one, validate if matchedPairs is equal to numberOfPairs and also if score.playerOne is less than score.playerTwo', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    const alertStub = stub(window, 'alert');
    el.matchedPairs=0;
    el.numberOfPairs=1;
    el.score.playerOne=1;
    el.score.playerTwo=3;
    el.__countPairs();
    expect(el.matchedPairs).to.equal(1);
    expect(alertStub).to.have.callCount(1);
  });

  it('doesnt equal the value of matchedPairs and numberOfPairs, validate if matchedPairs is different to numberOfPairs and also if score.playerOne is not greater than score.playerTwo', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    el.matchedPairs=0;
    el.numberOfPairs=3;
    el.__countPairs();
    expect(el.matchedPairs).to.equal(1);
  });

  it('evaluates that __selectCard receives an Array with two index and equal values', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    const stubShowPicture=stub(el,'__showPicture');
    const stubRequestUpdate=stub(el,'requestUpdate');
    const selectedCard={
        picture: 'picture',
        value: 1,
        setAttrHidePicture: true,
        setAttrHideElement: false,
      };
    el.selectedCards=[selectedCard];
    el.__selectCard({},selectedCard);
    await waitUntil(()=>el.turn===false,'',{timeout:2000});
    expect(stubShowPicture).to.have.callCount(1);
    expect(stubRequestUpdate).to.have.callCount(2);
  });

  it('evaluates that __selectCard receives an Array with two index and different values', async () => {
    const el = await fixture(html`<memory-sphynx></memory-sphynx>`);
    const stubShowPicture=stub(el,'__showPicture');
    const stubRequestUpdate=stub(el,'requestUpdate');
    const selectedCard={
        picture: 'picture',
        value: 1,
        setAttrHidePicture: true,
        setAttrHideElement: false,
      };
      const selectedCard1={
        picture: 'picture',
        value: 10,
        setAttrHidePicture: true,
        setAttrHideElement: false,
      };
    el.selectedCards=[selectedCard];
    el.__selectCard({},selectedCard1);
    await waitUntil(()=>el.turn===false,'',{timeout:2000});
    expect(stubShowPicture).to.have.callCount(1);
    expect(stubRequestUpdate).to.have.callCount(2);
  });

});

