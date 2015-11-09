var bassclef = require('../lib/index'),
    assert = require('assert');
   
describe('bassclef', function () {

   describe('getScale()', function () {

      it('should return C D E F G A B C when asked for C', function () {

          assert.equal('C D E F G A B C', bassclef.getScale('C')['notes']);
      });
      it('should return E F# G# A B C# D# E when asked for E', function () {
         
         assert.equal('E F# G# A B C# D# E', bassclef.getScale('E')['notes']); 
      });
      it('should return A B C D E F G A when asked for Amin', function () {
          
          assert.equal('A B C D E F G A', bassclef.getScale('Amin')['notes']);
      });
      it('should return undefined when asked for an unknown key', function () {
          assert.equal(undefined, bassclef.getScale('unknown')['notes']);
      });
   });
   
   describe('getScaleBy()', function() {
       
      it('should return C D E F G A B C when asked for C', function () {

          assert.equal('C D E F G A B C', bassclef.getScaleBy('C', 'ionian')['notes']);
      });
      it('should return E F# G# A B C# D# E when asked for E', function () {
         
         assert.equal('E F# G# A B C# D# E', bassclef.getScaleBy('E', 'ionian')['notes']); 
      });
      it('should return A B C D E F G A when asked for Amin', function () {
          
          assert.equal('A B C D E F G A', bassclef.getScaleBy('A', 'aeolian')['notes']);
      });
      it('should return undefined when asked for an unknown key', function () {
          assert.equal(undefined, bassclef.getScaleBy('unknown', 'aeolian')['notes']);
      });
      it('should return undefined when asked for an unknown mode', function () {
          assert.equal(undefined, bassclef.getScaleBy('C', 'notamode')['notes']);
      });
   })

   describe('getScales()', function () {

       it('should return a list of known scales', function () {
          assert.deepEqual([{'scale': 'C', 'notes' : 'C D E F G A B C'},
                        {'scale': 'E', 'notes' : 'E F# G# A B C# D# E'},
                        {'scale': 'Amin', 'notes' : 'A B C D E F G A'}]
                        , bassclef.getScales()); 
       });
   });

   describe('getChromatic()', function() {
      
       it('should return the chromatic scale', function () {

           assert.equal('C C# D D# E F F# G G# A A# B C', bassclef.getChromatic()['notes']);
       })
   });
   
   describe('whichNote()', function () {

      it('should return the note number of the chromatic scale if the requested string is a note', function () {

          assert.equal('0', bassclef.whichNote('C'));
          assert.equal('1', bassclef.whichNote('C#'));
          assert.equal('11', bassclef.whichNote('B'));
      });
      it('should return undefined when asking for the position of something that is not a note', function () {

         assert.equal(undefined, bassclef.whichNote('Your mom')); 
      }); 
   });

   describe('higherHalfstep()', function() {

       it('should give a halfstep above a note', function (){

            assert.equal('C#', bassclef.higherHalfstep('C'));
            assert.equal('C', bassclef.higherHalfstep('B'));
            assert.equal('E', bassclef.higherHalfstep('D#'));     
       });
       it('should return undefined when asking for a halfstep above something that is not a note', function () {

           assert.equal(undefined, bassclef.higherHalfstep('YourMom'));
       });
   });

   describe('lowerHalfstep()', function() {

       it('should give a halfstep below a note', function () {

            assert.equal('C#', bassclef.lowerHalfstep('D'));
            assert.equal('C', bassclef.lowerHalfstep('C#'));
            assert.equal('E', bassclef.lowerHalfstep('F'));
            assert.equal('B', bassclef.lowerHalfstep('C'));
       });
       it('should return undefined when asking for a halfstep below something that is not a note', function () {

           assert.equal(undefined, bassclef.lowerHalfstep('YourMom'));
       });
   });
   
   describe('higherWholestep()', function() {

      it('should give a whole step above a note', function () {

            assert.equal('C#', bassclef.higherWholestep('B'));
            assert.equal('C', bassclef.higherWholestep('A#'));
            assert.equal('E', bassclef.higherWholestep('D'));     
       });
       it('should return undefined when asking for a whole step above something that is not a note', function () {

           assert.equal(undefined, bassclef.higherWholestep('YourMom'));
       });
   });

   describe('lowerWholestep()', function() {
       
       it('should give a whole step below a note', function () {

            assert.equal('C#', bassclef.lowerWholestep('D#'));
            assert.equal('C', bassclef.lowerWholestep('D'));
            assert.equal('E', bassclef.lowerWholestep('F#'));     
       });
       it('should return undefined when asking for a whole step below something that is not a note', function () {

           assert.equal(undefined, bassclef.lowerWholestep('YourMom'));
       });
   });
   
   describe('stepsUp()', function() {
       
       it('should return undefined when asking for neither a whole or half step up', function () {
         
            assert.equal(undefined, bassclef.stepsUp('Your Mom'));  
       });
       it('should return a note half step up from the parameter when asked for a half step up', function () {

           assert.equal('C#', bassclef.stepsUp('C', 'h'));
           assert.equal('C', bassclef.stepsUp('B', 'h'));
           assert.equal('E', bassclef.stepsUp('D#', 'h'));
       });
       it('should return a note a whole step up from the parameter when asked for a whole step up', function () {

           assert.equal('C#', bassclef.stepsUp('B', 'w'));
           assert.equal('C', bassclef.stepsUp('A#', 'w'));
           assert.equal('E', bassclef.stepsUp('D', 'w'));
       });
   })
});
