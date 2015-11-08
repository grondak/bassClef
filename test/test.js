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

   describe('higherHalfstep', function() {

       it('should give a halfstep above a note', function (){

            assert.equal('C#', bassclef.higherHalfstep('C'));
            assert.equal('C', bassclef.higherHalfstep('B'));
            assert.equal('E', bassclef.higherHalfstep('D#'));     
       });
       it('should return undefined when asking for a halfstep above something that is not a note', function () {

           assert.equal(undefined, bassclef.higherHalfstep('YourMom'));
       });
   });

   describe('lowerHalfstep', function() {

       it('should give a halfstep below a note', function () {

            assert.equal('C#', bassclef.lowerHalfstep('D'));
            assert.equal('C', bassclef.lowerHalfstep('C#'));
            assert.equal('E', bassclef.lowerHalfstep('F'));     
       });
       it('should return undefined when asking for a halfstep below something that is not a note', function () {

           assert.equal(undefined, bassclef.lowerHalfstep('YourMom'));
       });
   });
});
