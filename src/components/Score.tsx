import { useEffect, useRef } from 'react';
import { Accidental, Formatter, Renderer, Stave, StaveNote, SVGContext, Voice } from 'vexflow/bravura';

type ScoreProps = {
    notes: Note[],
    correct: boolean
};

function Score({ notes, correct }: ScoreProps) {
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
            
            //Add Accidental
            const result = new StaveNote({keys: [notes[i].pitch + notes[i].accidental + '/' + currentOctave], duration: 'w'});
            if(notes[i].accidental){
                result.addModifier(new Accidental(notes[i].accidental));
            }

            //Add Color
            if(i == notes.length - 1){
                result.setStyle({
                    fillStyle: correct ? 'green' : 'red',
                    strokeStyle: correct ? 'green' : 'red',
                    shadowColor: correct ? 'green' : 'red',
                    shadowBlur: 3
                });
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
        stave.setContext(context);
        context.clear();
        (context as SVGContext).setViewBox(0, 0, 480, 120);
        stave.draw();

        if(notes.length === 0){
            return;
        }
        const staveNotes: StaveNote[] = createStaveNotes();
        const voice = new Voice({ num_beats: 4 * notes.length, beat_value: 4});
        voice.addTickables(staveNotes);
        Formatter.SimpleFormat(voice.getTickables(), 0, { paddingBetween: 20 });
        voice.draw(context, stave);
    };

    useEffect(() => {
        if(rendererRef.current){
            return;
        }
        const renderer = new Renderer(scoreContainerRef.current as HTMLDivElement, Renderer.Backends.SVG);
        rendererRef.current = renderer;
        renderer.resize(600, 150);
        renderScore();
    }, []);
    
    useEffect(() => {
        renderScore();
    }, [notes]);

    return(
        <div ref={scoreContainerRef} />
    );
}

export default Score;