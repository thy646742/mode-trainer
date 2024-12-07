const keyToNote = {
    '0': { pitch: 'C', accidental: '' },
    '+1': { pitch: 'G', accidental: '' },
    '+2': { pitch: 'D', accidental: '' },
    '+3': { pitch: 'A', accidental: '' },
    '+4': { pitch: 'E', accidental: '' },
    '+5': { pitch: 'B', accidental: '' },
    '+6': { pitch: 'F', accidental: '#' },
    '+7': { pitch: 'C', accidental: '#' },
    '-1': { pitch: 'F', accidental: '' },
    '-2': { pitch: 'B', accidental: 'b' },
    '-3': { pitch: 'E', accidental: 'b' },
    '-4': { pitch: 'A', accidental: 'b' },
    '-5': { pitch: 'D', accidental: 'b' },
    '-6': { pitch: 'G', accidental: 'b' },
    '-7': { pitch: 'C', accidental: 'b' },
};
const scaleNames: Scale[] = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Lydian'];

function getScaleName(keySignature: Key, scaleId: number): string {
    return keyToNote[keySignature].pitch + keyToNote[keySignature].accidental + ' ' +  scaleNames[scaleId];
}

export { getScaleName }