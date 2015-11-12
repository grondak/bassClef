/*global
    describe, it, expect
*/
(function () {
    'use strict';
    var bassclef = require('../lib/index.js');

    describe('bassclef', function () {
        it('should tell you what scales it knows', function () {

            expect(bassclef.getScales()).toEqual([
                {'scale': 'C', 'notes' : 'C D E F G A B C'},
                {'scale': 'E', 'notes' : 'E F# G# A B C# D# E'},
                {'scale': 'Amin', 'notes' : 'A B C D E F G A'}
            ]);
        });
    });

    describe('bassclef knows the scales ', function () {

        it('C', function () {

            expect(bassclef.getScale('C')).toEqual({'notes': 'C D E F G A B C'});
        });

        it('E', function () {

            expect(bassclef.getScale('E')).toEqual({'notes': 'E F# G# A B C# D# E'});
        });

        it('Amin', function () {

            expect(bassclef.getScale('Amin')).toEqual({'notes': 'A B C D E F G A'});
        });
    });

    describe('bassclef knows the intervals', function () {

        it('I', function () {

            expect(bassclef.getInterval('C', 'I')).toEqual('C');
            expect(bassclef.getInterval('E', 'I')).toEqual('E');
            expect(bassclef.getInterval('C', 'bII')).toEqual('C#');
            expect(bassclef.getInterval('C', 'II')).toEqual('D');
            expect(bassclef.getInterval('C', 'bIII')).toEqual('D#');
            expect(bassclef.getInterval('C', 'III')).toEqual('E');
            expect(bassclef.getInterval('C', 'IV')).toEqual('F');
            expect(bassclef.getInterval('C', 'bV')).toEqual('F#');
            expect(bassclef.getInterval('C', 'V')).toEqual('G');
            expect(bassclef.getInterval('C', 'bVI')).toEqual('G#');
            expect(bassclef.getInterval('C', 'VI')).toEqual('A');
            expect(bassclef.getInterval('C', 'bVII')).toEqual('A#');
            expect(bassclef.getInterval('C', 'VII')).toEqual('B');
            expect(bassclef.getInterval('C', 'VIII')).toEqual('C');
            expect(bassclef.getInterval('C', 'IX')).toEqual('D');
        });
    });

    describe('bassclef gives undefined for', function () {

        it('scales that are not based on notes, like ', function () {

            expect(bassclef.getScale('Your Mom')).toEqual({ 'notes': undefined });
        });

        it('intervals that do not exists, like ', function () {

            expect(bassclef.getInterval('C', 'bIV')).toEqual(undefined);
        });
    });
}());