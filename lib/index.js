//jslint node

(function () {
    'use strict';
    var chromatic = { notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C']},
        scaleData = [
            {'scale': 'C', 'notes' : 'C D E F G A B C'},
            {'scale': 'E', 'notes' : 'E F# G# A B C# D# E'},
            {'scale': 'Amin', 'notes' : 'A B C D E F G A'}
        ];
    function getScale(scale) {

        var scaleEntity = scaleData.find(function (element) {

            if (element.scale === scale) {
                return true;
            }
            return false;
        });
        if (scaleEntity === undefined) {
            return { 'notes': undefined };
        }
        return { 'notes': scaleEntity.notes};
    }

    function getScales() {

        return scaleData;
    }

    function getChromatic() {

        return {'notes': chromatic.notes.join(' ')};
    }

    function higherHalfstep(note) {

        var position = chromatic.notes.indexOf(note);
        if (position === -1) {
            return undefined;
        }
        position = position + 1;
        if (position === chromatic.notes.length) {
            position = 0;
        }
        return chromatic.notes[position];
    }

    function lowerHalfstep(note) {

        var position = chromatic.notes.indexOf(note);
        if (position === -1) {
            return undefined;
        }
        position = position - 1;
        if (position < 0) {
            position = chromatic.notes.length;
        }
        return chromatic.notes[position];
    }
    exports.getScales = getScales;
    exports.getScale = getScale;
    exports.getChromatic = getChromatic;
    exports.higherHalfstep = higherHalfstep;
    exports.lowerHalfstep = lowerHalfstep;
}());