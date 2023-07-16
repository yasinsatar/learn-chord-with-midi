let notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var activeNotes = [];

if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success,failure);
}

function success(midiAccess){

    const inputs = midiAccess.inputs;
    inputs.forEach(input=>{
        input.addEventListener('midimessage',handleInput);
    })
}

function handleInput(input) {
    document.getElementById('device').textContent = input.target.name;
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    switch(command){
        case 144: //noteOn
        if(velocity > 0){
            noteOn(note,velocity);
        }else{
            noteOff(note);
        }
        break;
        case 128: // note off
        noteOff(note);
        break;
    }

    var isEqual = true;
    if (activeNotes.length === random_chord.notes.length && random_chord.notes.length>0) {
      for (var i = 0; i < activeNotes.length; i++) {
        if (!random_chord.notes.includes(activeNotes[i])) {
            isEqual = false;
          break;
        }
      }
    } else {
        isEqual = false;
    }
  
    if (isEqual) {
      document.getElementById("chord").style.color = "green";
      playChord(random_chord.name)
    } else {
      document.getElementById("chord").style.color = "black";
    }
}

function noteOn(note,velocity){
    activeNotes.push(convertNoteNumber(note));
    document.getElementById('active_notes').textContent = activeNotes.join(", ");
}
function convertNoteNumber( note ) {
    return (notes[note%12]);
  }

function noteOff(note) {
    var position = activeNotes.indexOf(convertNoteNumber(note));
  if (position!=-1) {
    activeNotes.splice(position,1);
  }
  document.getElementById('active_notes').textContent = activeNotes.join(", ");
}


function failure(){
    console.log('Could not connect MIDI');
}