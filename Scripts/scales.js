// Build a 2-octave interactive piano keyboard using HTML and JavaScript.
// Major/minor selection, scale highlighting, and ascending playback with key highlights.

const SCALE_ROOTS = ['C', 'G', 'D', 'A', 'E', 'F', 'Bb', 'Eb'];

/** Semitone within octave (C=0). Supports enharmonics used in scale spellings. */
const NOTE_TO_SEMITONE = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, Fb: 4, 'E#': 5,
    F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
    Cb: 11, 'B#': 0
};

/** Map scale spelling to keyboard `data-note` base (e.g. Bb on piano is stored as A#). */
const SPELLING_TO_KEY_BASE = {
    Bb: 'A#', Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#',
    Cb: 'B', 'B#': 'C', Fb: 'E', 'E#': 'F'
};

class Piano {
    constructor() {
        /**
         * Lazy AudioContext: iOS Safari often refuses to output audio if the context is created
         * on page load. Create it on first user gesture instead (same class of issue as WebAR / 8th Wall).
         */
        this._audioContext = null;
        this.notes = [
            { note: 'C', altNote: null },
            { note: 'C#', altNote: 'Db' },
            { note: 'D', altNote: null },
            { note: 'D#', altNote: 'Eb' },
            { note: 'E', altNote: null },
            { note: 'F', altNote: null },
            { note: 'F#', altNote: 'Gb' },
            { note: 'G', altNote: null },
            { note: 'G#', altNote: 'Ab' },
            { note: 'A', altNote: null },
            { note: 'A#', altNote: 'Bb' },
            { note: 'B', altNote: null }
        ];

        this.majorScalePatterns = {
            C: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            G: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
            D: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
            A: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
            E: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
            F: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
            Bb: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
            Eb: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']
        };

        this.minorScalePatterns = {
            C: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
            G: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
            D: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
            A: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            E: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
            F: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
            Bb: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
            Eb: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
        };

        this.scalePlaybackTimer = null;
        this.init();
    }

    getAudioContext() {
        if (!this._audioContext) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) {
                this._audioContext = new AC();
            }
        }
        return this._audioContext;
    }

    getMode() {
        const checked = document.querySelector('input[name="scaleMode"]:checked');
        return checked ? checked.value : 'major';
    }

    getScalePattern(root, mode) {
        const table = mode === 'minor' ? this.minorScalePatterns : this.majorScalePatterns;
        return table[root];
    }

    rootLabel(root) {
        if (root === 'Bb') return 'B♭';
        if (root === 'Eb') return 'E♭';
        return root;
    }

    populateScaleSelector() {
        const mode = this.getMode();
        const select = document.getElementById('scaleSelector');
        const current = select.value;
        select.innerHTML = '';
        SCALE_ROOTS.forEach((root) => {
            const opt = document.createElement('option');
            opt.value = root;
            const kind = mode === 'minor' ? 'Minor' : 'Major';
            opt.textContent = `${this.rootLabel(root)} ${kind}`;
            select.appendChild(opt);
        });
        if (SCALE_ROOTS.includes(current)) {
            select.value = current;
        }
    }

    init() {
        this.createKeyboard();
        this.populateScaleSelector();
        this.setupEventListeners();
    }

    createKeyboard() {
        const octaves = document.querySelectorAll('.octave');

        octaves.forEach((octave, octaveIndex) => {
            let whiteKeyIndex = 0;

            this.notes.forEach((noteObj) => {
                const isBlackKey = noteObj.altNote !== null;
                const key = document.createElement('div');
                const noteName = document.createElement('div');
                const fullNote = `${noteObj.note}${octaveIndex + 4}`;

                key.dataset.note = fullNote;
                key.dataset.baseNote = noteObj.note;
                key.dataset.altNote = noteObj.altNote || '';
                noteName.className = 'note-name';

                if (isBlackKey) {
                    key.className = 'key black-key';
                    key.style.left = `${whiteKeyIndex * 50 - 15}px`;
                    noteName.textContent = noteObj.note;
                } else {
                    key.className = 'key white-key';
                    noteName.textContent = noteObj.note;
                    whiteKeyIndex++;
                }

                key.appendChild(noteName);
                octave.appendChild(key);
            });
        });
    }

    setupEventListeners() {
        const keys = document.querySelectorAll('.key');
        const scaleSelector = document.getElementById('scaleSelector');
        const playBtn = document.getElementById('playScaleBtn');

        keys.forEach((key) => {
            /* pointerdown works for mouse + touch; mousedown does not reliably fire on iPhone Safari */
            key.addEventListener(
                'pointerdown',
                (e) => {
                    e.preventDefault();
                    void this.playNote(key.dataset.note);
                },
                { passive: false }
            );
        });

        scaleSelector.addEventListener('change', () => this.refreshScale());

        document.querySelectorAll('input[name="scaleMode"]').forEach((radio) => {
            radio.addEventListener('change', () => {
                this.populateScaleSelector();
                this.refreshScale();
            });
        });

        const reversePlayBtn = document.getElementById('reversePlayScaleBtn');
        playBtn.addEventListener('click', () => this.playScaleSequence(true));
        reversePlayBtn.addEventListener('click', () => this.playScaleSequence(false));

        /* Prime Web Audio on first touch/click anywhere (iOS unlock often needs any user gesture). */
        const primeAudio = () => {
            void this.ensureAudioContextRunning();
        };
        document.documentElement.addEventListener('touchstart', primeAudio, {
            once: true,
            capture: true,
            passive: true
        });
        document.documentElement.addEventListener('click', primeAudio, {
            once: true,
            capture: true,
            passive: true
        });
    }

    refreshScale() {
        const root = document.getElementById('scaleSelector').value;
        this.highlightScale(root);
    }

    /** Full `data-note` string (e.g. A#4) for a scale degree spelling. */
    resolveKeyDataNote(noteName, octave) {
        const base = SPELLING_TO_KEY_BASE[noteName] || noteName;
        return `${base}${octave}`;
    }

    noteToFrequency(note) {
        const octave = parseInt(note.slice(-1), 10);
        const name = note.slice(0, -1);
        const semitone = NOTE_TO_SEMITONE[name];
        if (semitone === undefined) {
            return 440;
        }
        const midi = 12 * (octave + 1) + semitone;
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    /** Build ascending one-octave sequence: 7 degrees + tonic, with octave numbers. */
    buildAscendingDataNotes(scalePattern7) {
        const seq = [...scalePattern7, scalePattern7[0]];
        let prevMidi = null;
        const out = [];
        const startOctave = 4;

        for (let i = 0; i < seq.length; i++) {
            const name = seq[i];
            const s = NOTE_TO_SEMITONE[name];
            if (s === undefined) {
                continue;
            }
            let midi;
            if (prevMidi === null) {
                midi = 12 * (startOctave + 1) + s;
            } else {
                let o = Math.floor(prevMidi / 12) - 1;
                midi = 12 * (o + 1) + s;
                if (midi <= prevMidi) {
                    o += 1;
                    midi = 12 * (o + 1) + s;
                }
            }
            prevMidi = midi;
            const octave = Math.floor(midi / 12) - 1;
            out.push(this.resolveKeyDataNote(name, octave));
        }
        return out;
    }

    /**
     * iOS Safari starts AudioContext suspended until a user gesture. Create the context lazily
     * inside this path (not at page load) and resume; repeat before each tone if needed.
     */
    async ensureAudioContextRunning() {
        const ctx = this.getAudioContext();
        if (!ctx) {
            return;
        }
        try {
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }
        } catch (e) {
            /* ignore — rare policy failures */
        }
    }

    async playNote(note) {
        await this.ensureAudioContextRunning();
        const ctx = this.getAudioContext();
        if (!ctx) {
            return;
        }
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        const freq = this.noteToFrequency(note);
        oscillator.frequency.value = freq;

        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        oscillator.start();

        const keyElement = document.querySelector(`[data-note="${note}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
        }

        setTimeout(() => {
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
            setTimeout(() => {
                oscillator.stop();
                if (keyElement) {
                    keyElement.classList.remove('active');
                }
            }, 500);
        }, 100);
    }

    async playToneShort(dataNote, durationMs) {
        await this.ensureAudioContextRunning();
        const ctx = this.getAudioContext();
        if (!ctx) {
            return;
        }
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.value = this.noteToFrequency(dataNote);
        const now = ctx.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.35, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);
        oscillator.start(now);
        oscillator.stop(now + durationMs / 1000 + 0.05);
    }

    clearScalePlaybackTimers() {
        if (this.scalePlaybackTimer !== null) {
            clearTimeout(this.scalePlaybackTimer);
            this.scalePlaybackTimer = null;
        }
    }

    /**
     * @param {boolean} ascending - true: root up to octave; false: same notes descending.
     */
    async playScaleSequence(ascending) {
        const root = document.getElementById('scaleSelector').value;
        const mode = this.getMode();
        const pattern = this.getScalePattern(root, mode);
        if (!pattern) {
            return;
        }

        const playBtn = document.getElementById('playScaleBtn');
        const reversePlayBtn = document.getElementById('reversePlayScaleBtn');
        this.clearScalePlaybackTimers();

        await this.ensureAudioContextRunning();

        let sequence = this.buildAscendingDataNotes(pattern);
        if (!ascending) {
            sequence = sequence.slice().reverse();
        }
        const intervalMs = 1000;
        const toneMs = 750;

        playBtn.disabled = true;
        reversePlayBtn.disabled = true;
        document.querySelectorAll('.key.playing').forEach((el) => el.classList.remove('playing'));

        let index = 0;

        const step = async () => {
            document.querySelectorAll('.key.playing').forEach((el) => el.classList.remove('playing'));

            if (index >= sequence.length) {
                playBtn.disabled = false;
                reversePlayBtn.disabled = false;
                return;
            }

            const dataNote = sequence[index];
            const keyEl = document.querySelector(`[data-note="${dataNote}"]`);
            if (keyEl) {
                keyEl.classList.add('playing');
            }
            await this.playToneShort(dataNote, toneMs);

            index += 1;
            this.scalePlaybackTimer = setTimeout(step, intervalMs);
        };

        void step();
    }

    scaleNoteMatchesKey(scaleNotes, baseNote, altNote) {
        if (scaleNotes.includes(baseNote)) {
            return true;
        }
        if (altNote && scaleNotes.includes(altNote)) {
            return true;
        }
        if (baseNote === 'B' && scaleNotes.includes('Cb')) {
            return true;
        }
        return false;
    }

    displayNoteForKey(scaleNotes, baseNote, altNote) {
        if (altNote && scaleNotes.includes(altNote)) {
            return altNote;
        }
        if (baseNote === 'B' && scaleNotes.includes('Cb')) {
            return 'Cb';
        }
        if (scaleNotes.includes(baseNote)) {
            return baseNote;
        }
        return baseNote;
    }

    highlightScale(root) {
        document.querySelectorAll('.scale-note').forEach((el) => el.remove());

        const mode = this.getMode();
        const scaleNotes = this.getScalePattern(root, mode);
        if (!scaleNotes) {
            return;
        }

        const keys = document.querySelectorAll('.key');

        keys.forEach((key) => {
            const baseNote = key.dataset.baseNote;
            const altNote = key.dataset.altNote || null;

            if (this.scaleNoteMatchesKey(scaleNotes, baseNote, altNote)) {
                const display = this.displayNoteForKey(scaleNotes, baseNote, altNote);
                /* Only show alternate spelling when it differs from the key's default label (e.g. Bb vs A#). */
                if (display !== baseNote) {
                    const scaleNote = document.createElement('div');
                    scaleNote.className = 'scale-note';
                    scaleNote.textContent = display;
                    key.appendChild(scaleNote);
                }
            }
        });

        const scaleDisplay = document.getElementById('scale-display');
        const label = `${this.rootLabel(root)} ${mode === 'minor' ? 'Minor' : 'Major'}`;
        scaleDisplay.textContent = `These are the notes in this scale (${label}): ${scaleNotes.join(' - ')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const piano = new Piano();
    piano.highlightScale('C');
});
