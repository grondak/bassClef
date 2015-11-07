var music = require('../lib/index'),
    assert = require('assert');
   
describe('bassclef', function () {
   
   describe('getScale()', function () {
      
      it('should return C D E F G A B C when asked for C', function () {

          assert.equal('C D E F G A B C', music.getScale('C')['notes']);
      });
      it('should return E F# G# A B C# D# E when asked for E', function () {
         
         assert.equal('E F# G# A B C# D# E', music.getScale('E')['notes']); 
      });
      it('should return A B C D E F G A when asked for Amin', function () {
          
          assert.equal('A B C D E F G A', music.getScale('Amin')['notes']);
      });
      it('should return undefined when asked for an unknown key', function () {
          assert.equal(undefined, music.getScale('unknown')['notes']);
      });
   });
   
   describe('getScales()', function () {
       it('should return a list of known scales', function () {
          assert.deepEqual([{'scale': 'C', 'notes' : 'C D E F G A B C'},
                        {'scale': 'E', 'notes' : 'E F# G# A B C# D# E'},
                        {'scale': 'Amin', 'notes' : 'A B C D E F G A'}]
                        , music.getScales()); 
       });
   });
});
