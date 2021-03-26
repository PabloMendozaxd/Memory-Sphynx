import { MemorySphynx } from './src/MemorySphynx.js';
import { CardMemorySphynx } from './src/CardMemorySphynx.js';
import { ScoreMemorySphynx } from './src/ScoreMemorySphynx.js';
import { LevelMemorySphynx } from './src/LevelMemorySphynx.js';

window.customElements.define('memory-sphynx', MemorySphynx);
window.customElements.define('score-memory-sphynx', ScoreMemorySphynx);
window.customElements.define('card-memory-sphynx', CardMemorySphynx);
window.customElements.define('level-memory-sphynx', LevelMemorySphynx);
