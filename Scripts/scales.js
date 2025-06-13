// Build a 2-octave interactive piano keyboard using HTML and JavaScript.
// The keyboard should display 24 keys: white and black keys, covering two octaves starting from note C.
// Allow the user to select a musical key (e.g., C major, G major, etc.) from a set of predefined keys.
// When a key is selected, highlight the notes that belong to the selected scale on the keyboard by putting icons over the keys with the note name. For example, if it is a B flat, put B flat, but if it is an A sharp, put A sharp.
// When a user clicks on a key, play the corresponding sound using the Web Audio API.
// Keep the UI responsive and compatible with modern browsers.
// Bonus: Add visual feedback (like a keypress animation) when a note is played.


class Piano {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.scalePatterns = {
            'C':  ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            'G':  ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
            'D':  ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
            'A':  ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
            'E':  ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
            'F':  ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
            'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
            'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']
        };
        this.init();
    }

    init() {
        this.createKeyboard();
        this.setupEventListeners();
    }

    createKeyboard() {
        const octaves = document.querySelectorAll('.octave');
        
        octaves.forEach((octave, octaveIndex) => {
            let whiteKeyIndex = 0;
            
            this.notes.forEach((note, index) => {
                const isBlackKey = note.includes('#');
                const key = document.createElement('div');
                const noteName = document.createElement('div');
                const fullNote = `${note}${octaveIndex + 4}`;
                
                key.dataset.note = fullNote;
                noteName.textContent = note;
                noteName.className = 'note-name';
                
                if (isBlackKey) {
                    key.className = 'key black-key';
                    key.style.left = `${whiteKeyIndex * 50 - 15}px`;
                } else {
                    key.className = 'key white-key';
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

        keys.forEach(key => {
            key.addEventListener('mousedown', () => this.playNote(key.dataset.note));
            key.addEventListener('mouseup', () => this.stopNote(key.dataset.note));
        });

        scaleSelector.addEventListener('change', (e) => this.highlightScale(e.target.value));
    }

    async playNote(note) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const freq = this.noteToFrequency(note);
        oscillator.frequency.value = freq;
        
        gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
        oscillator.start();
        
        const keyElement = document.querySelector(`[data-note="${note}"]`);
        keyElement.classList.add('active');
        
        setTimeout(() => {
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
            setTimeout(() => {
                oscillator.stop();
                keyElement.classList.remove('active');
            }, 500);
        }, 100);
    }

    noteToFrequency(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const octave = parseInt(note.slice(-1));
        const noteIndex = notes.indexOf(note.slice(0, -1));
        const baseFreq = 440; // A4
        const baseIndex = notes.indexOf('A');
        const baseOctave = 4;
        
        const halfSteps = (octave - baseOctave) * 12 + (noteIndex - baseIndex);
        return baseFreq * Math.pow(2, halfSteps / 12);
    }

    highlightScale(key) {
        // Remove existing scale notes
        document.querySelectorAll('.scale-note').forEach(el => el.remove());
        
        const scaleNotes = this.scalePatterns[key];
        const keys = document.querySelectorAll('.key');
        
        keys.forEach(key => {
            const noteWithoutOctave = key.dataset.note.slice(0, -1);
            if (scaleNotes.includes(noteWithoutOctave)) {
                const scaleNote = document.createElement('div');
                scaleNote.className = 'scale-note';
                scaleNote.textContent = noteWithoutOctave;
                key.appendChild(scaleNote);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const piano = new Piano();
    piano.highlightScale('C'); // Default to C major scale
});