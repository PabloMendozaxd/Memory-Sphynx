import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../memory-sphynx.js';

describe('LevelMemorySphynx', () => {

  it('emit level change event', async () => {
    const el = await fixture(html`<level-memory-sphynx></level-memory-sphynx>`);
    let e={
        target:{
            value:'5'
        }
    };
    setTimeout(() => el.__selectLevel(e));
    const { detail } = await oneEvent(el, 'level-change');
    expect(detail).to.equal(5);
  });

});

