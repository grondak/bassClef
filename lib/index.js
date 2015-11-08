//jslint node

(function () {
    'use strict';
    var chromatic = { notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C']},
        scaleData = [
            {'scale': 'C', 'notes' : 'C D E F G A B C'},
            {'scale': 'E', 'notes' : 'E F# G# A B C# D# E'},
            {'scale': 'Amin', 'notes' : 'A B C D E F G A'}
        ],
        undefNotes = {'notes' : undefined},
        modes = [
            {'name': 'ionian', 'map' : ['w', 'w', 'h', 'w', 'w', 'w', 'h']},
            {'name': 'aeolian', 'map' : ['w', 'h', 'w', 'w', 'h', 'w', 'w']}
        ];

    function whichNote(note) {

        var position = chromatic.notes.indexOf(note);
        if (position === -1) {
            return undefined;
        }
        return position;
    }

    function higherHalfstep(note) {

        var position = whichNote(note);
        position = position + 1;
        if (position === chromatic.notes.length) {
            position = 0;
        }
        return chromatic.notes[position];
    }

    function lowerHalfstep(note) {

        var position = whichNote(note);
        position = position - 1;
        if (position < 0) {
            position = chromatic.notes.length;
        }
        return chromatic.notes[position];
    }

    function higherWholestep(note) {

        return higherHalfstep(higherHalfstep(note));
    }

    function lowerWholestep(note) {

        return lowerHalfstep(lowerHalfstep(note));
    }
    function stepsUp(note, amount) {

        if (amount !== 'w' && amount !== 'h') {
            return undefined;
        }
        if (amount === 'w') {
            return higherWholestep(note);
        }
        return higherHalfstep(note);
    }

    function getScaleBy(note, mode) {
        var notes = [],
            result = '',
            stepMap = modes.find(function (element) {

                if (element.name === mode) {
                    return true;
                }
                return false;
            });
        if (stepMap === undefined) {
            return undefNotes;
        }
        notes[0] = note;
        stepMap.map.forEach(function (value, index) {
            notes[index + 1] = stepsUp(notes[index], value);
        });
        result = notes.join(' ');
        return {'notes' : result };
    }

    function getScale(scaleName) {
        var mode = 'ionian',
            root = 'C';
        root = scaleName;
        if (scaleName.indexOf('min') > 0) {
            mode = 'aeolian';
            root = scaleName.substring(0, 1);
        }
        if (whichNote(root) === undefined) {
            return undefNotes;
        }
        return getScaleBy(root, mode);
    }

    function getScales() {

        return scaleData;
    }

    function getChromatic() {

        return {'notes': chromatic.notes.join(' ')};
    }
    exports.getScales = getScales;
    exports.getScale = getScale;
    exports.getChromatic = getChromatic;
    exports.higherHalfstep = higherHalfstep;
    exports.lowerHalfstep = lowerHalfstep;
    exports.higherWholestep = higherWholestep;
    exports.lowerWholestep = lowerWholestep;
    exports.whichNote = whichNote;
    exports.stepsUp = stepsUp;
}());