import { useEffect, useRef } from 'react';
import { Accidental, Formatter, Renderer, Stave, StaveNote, SVGContext, Voice } from 'vexflow';

type ScoreProps = {
    notes: Note[],
    keySignature: string
};

function Score({ notes, keySignature }: ScoreProps) {
    const scoreContainerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<Renderer | null>(null);

    const createStaveNotes = (): StaveNote[] => {
        const staveNotes: StaveNote[] = [];
        let currentOctave = 0;
        for(let i = 0; i < notes.length; i++){
            // Consider Initial and Connecting Octaves
            if(notes[i].octave){
                currentOctave = notes[i].octave as number;
            }
            else if(i == 0){
                currentOctave = notes[i].pitch == 'A' || notes[i].pitch == 'B' ? 3 : 4;
            }
            else if(notes[i].pitch == 'C' && notes[i - 1].pitch == 'B'){
                currentOctave++;
            }
            else if(notes[i].pitch == 'B' && notes[i - 1].pitch == 'C'){
                currentOctave--;
            }
            
            //Consider Lower and Upper Bound
            if(currentOctave <= 3 && !(['G', 'A', 'B'].includes(notes[i].pitch))){
                currentOctave = 4;
            }
            if(currentOctave >= 6 && (['A', 'B'].includes(notes[i].pitch))){
                currentOctave = 5;
            }
            
            const result = new StaveNote({keys: [notes[i].pitch + notes[i].accidental + '/' + currentOctave], duration: 'w'});
            if(notes[i].accidental){
                result.addModifier(new Accidental(notes[i].accidental));
            }
            staveNotes.push(result);
        }
        return staveNotes;
    };

    const renderScore = () => {
        if(!rendererRef.current){
            return;
        }
        const context = rendererRef.current.getContext();
        const stave = new Stave(10, 10, 460);
        stave.addClef('treble');
        stave.addKeySignature(keySignature);
        stave.setContext(context);
        context.clear();
        (context as SVGContext).setViewBox(0, 0, 480, 120);
        stave.draw();

        if(notes.length === 0){
            return;
        }
        const staveNotes: StaveNote[] = createStaveNotes();
        console.log(staveNotes);
        const voice = new Voice({ num_beats: 4 * notes.length, beat_value: 4});
        voice.addTickables(staveNotes);
        new Formatter().joinVoices([voice]).format([voice], 250);
        voice.draw(context, stave);
    };

    useEffect(() => {
        if(rendererRef.current){
            return;
        }
        console.log('init');
        const renderer = new Renderer(scoreContainerRef.current as HTMLDivElement, Renderer.Backends.SVG);
        rendererRef.current = renderer;
        renderer.resize(600, 150);
        renderScore();
    }, []);

    useEffect(() => {
        console.log('keychange');
        renderScore();
    }, [keySignature]);
    
    useEffect(() => {
        console.log('notechange');
        renderScore();
    }, [notes]);

    return(
        <div ref={scoreContainerRef} style={{borderStyle: 'solid', borderRadius: 1}}/>
    );
}

export default Score;