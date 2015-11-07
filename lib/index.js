//jslint node

(function () {
    'use strict';
    var scaleData = [
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

    exports.getScales = getScales;
    exports.getScale = getScale;
}());