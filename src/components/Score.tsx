import { useEffect, useRef } from 'react';
import { Accidental, Formatter, Renderer, Stave, StaveNote, Voice } from 'vexflow';

type ScoreProps = {
    notes: Note[],
    keySignature: string
};

function Score({ notes, keySignature }: ScoreProps) {
    const scoreContainerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<Renderer | null>(null);

    const renderScore = () => {
        if(!rendererRef.current){
            return;
        }
        const context = rendererRef.current.getContext();
        const stave = new Stave(10, 40, 400);
        stave.addClef('treble');
        stave.addKeySignature(keySignature);
        stave.setContext(context);
        context.clear();
        stave.draw();

        if(notes.length === 0){
            return;
        }
        const staveNotes: StaveNote[] = notes.map(
            note => {
                const result = new StaveNote({ keys:[note.pitch + note.accidental + '/4'], duration: 'w' });
                if(note.accidental){
                    result.addModifier(new Accidental(note.accidental));
                }
                return result;
            }
        );
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
        renderer.resize(500, 200);
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
        <div ref={scoreContainerRef}/>
    );
}

export default Score;