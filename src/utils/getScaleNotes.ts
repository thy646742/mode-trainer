const scaleModifier = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, -1, 0, 0, 0, -1],
    [0, -1, -1, 0, 0, -1, -1],
    [0, 0, 0, +1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, -1],
    [0, 0, -1, 0, 0, -1, -1, 0],
    [0, -1, -1, 0, -1, -1, -1]
];
const keyModifier = {
    '0': [0, 0, 0, 0, 0, 0, 0],
    '+1': [0, 0, 0, 0, 0, 0, +1],
    '+2': [0, 0, +1, 0, 0, 0, +1],
    '+3': [0, 0, +1, 0, 0, +1, +1],
    '+4': [0, +1, +1, 0, 0, +1, +1],
    '+5': [0, +1, +1, 0, +1, +1, +1],
    '+6': [+1, +1, +1, 0, +1, +1, +1],
    '+7': [+1, +1, +1, +1, +1, +1, +1],
    '-1': [0, 0, 0, -1, 0, 0, 0],
    '-2': [-1, 0, 0, -1, 0, 0, 0],
    '-3': [-1, 0, 0, -1, -1, 0, 0],
    '-4': [-1, -1, 0, -1, -1, 0, 0],
    '-5': [-1, -1, 0, -1, -1, -1, 0],
    '-6': [-1, -1, -1, -1, -1, -1, 0],
    '-7': [-1, -1, -1, -1, -1, -1, -1]
};
const keyToPitch = {
    '0': 2,
    '+1': 6,
    '+2': 3,
    '+3': 0,
    '+4': 4,
    '+5': 1,
    '+6': 5,
    '+7': 2,
    '-1': 5,
    '-2': 1,
    '-3': 4,
    '-4': 0,
    '-5': 3,
    '-6': 6,
    '-7': 2,
};
const accidentals: Accidental[] = ['bb', 'b', '', '#', '##'];
const pitches: Pitch[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

function getScaleNotes(keySignature: Key, scaleId: number): Note[] {
    const result: Note[] = [];
    let currentPitchIndex: number = keyToPitch[keySignature];
    for(let i = 0; i < 7; i++){
        result.push({
            pitch: pitches[currentPitchIndex % 7],
            accidental: accidentals[2 + keyModifier[keySignature][i] + scaleModifier[scaleId][i]],
            octave: null
        });
        currentPitchIndex++;
    }
    return result;
}

export { getScaleNotes };