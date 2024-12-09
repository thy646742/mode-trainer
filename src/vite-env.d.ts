/// <reference types="vite/client" />

type Pitch = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

type Accidental = '##' | '#' | '' | 'b' | 'bb';

type Note = {
    pitch: Pitch
    accidental: Accidental
    octave: number | null
};

type Key = '-7' | '-6' | '-5' | '-4' | '-3' | '-2' | '-1' | '0' | '+1' | '+2' | '+3' | '+4' | '+5' | '+6' | '+7';

type Scale = 'Ionian' | 'Dorian' | 'Phrygian' | 'Lydian' | 'Mixolydian' | 'Aeolian' | 'Locrian';

type Config = {
    timeMode: string //'untimed' | 'timed' | 'stopwatch';
    timeLimit: number;
}