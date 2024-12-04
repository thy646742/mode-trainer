/// <reference types="vite/client" />

type Pitch = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

type Accidental = '##' | '#' | '' | 'b' | 'bb';

type Note = {
    pitch: Pitch
    accidental: Accidental
};
