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
        return chromatic.notes[position];
    }

    function lowerHalfstep(note) {

        var position = whichNote(note);
        position = position - 1;
        if (position < 0) {
            position = chromatic.notes.length - 2;
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

    function getScaleBy(root, mode) {
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
        if (whichNote(root) === undefined) {
            return undefNotes;
        }
        notes[0] = root;
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
        return getScaleBy(root, mode);
    }

    function getScales() {

        return scaleData;
    }

    function getChromatic() {

        return {'notes': chromatic.notes.join(' ')};
    }

    function intervalSteps(interval) {

        switch (interval) {
        case 'I':
            return {half: 0, whole: 0};
        case 'bII':
            return {half: 1, whole: 0};
        case 'II':
            return {half: 0, whole: 1};
        case 'bIII':
            return {half: 1, whole: 1};
        case 'III':
            return {half: 0, whole: 2};
        case 'IV':
            return {half: 1, whole: 2};
        case 'bV':
            return {half: 0, whole: 3};
        case 'V':
            return {half: 1, whole: 3};
        case 'bVI':
            return {half: 0, whole: 4};
        case 'VI':
            return {half: 1, whole: 4};
        case 'bVII':
            return {half: 0, whole: 5};
        case 'VII':
            return {half: 1, whole : 5};
        case 'VIII':
            return {half: 0, whole: 6};
        case 'IX':
            return {half: 0, whole: 1};
        default:
            return undefined;
        }
    }

    function getInterval(root, interval) {

        var steps = {half: 0, whole: 0},
            halfStepCount = 0,
            wholeStepCount = 0,
            result = root;
        if (whichNote(root) === undefined) {
            return undefined;
        }
        steps = intervalSteps(interval);
        if (steps === undefined) {
            return undefined;
        }
        while (halfStepCount !== steps.half) {
            result = higherHalfstep(result);
            halfStepCount += 1;
        }
        while (wholeStepCount !== steps.whole) {
            result = higherWholestep(result);
            wholeStepCount += 1;
        }
        return result;
    }

    exports.getScales = getScales;
    exports.getScaleBy = getScaleBy;
    exports.getScale = getScale;
    exports.getChromatic = getChromatic;
    exports.higherHalfstep = higherHalfstep;
    exports.lowerHalfstep = lowerHalfstep;
    exports.higherWholestep = higherWholestep;
    exports.lowerWholestep = lowerWholestep;
    exports.whichNote = whichNote;
    exports.stepsUp = stepsUp;
    exports.getInterval = getInterval;
}());