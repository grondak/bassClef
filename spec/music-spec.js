var music = require('../lib/index.js');

describe('bassclef', function () {
  it('should tell you what scales it knows', function () {
    expect(music.getScales()).toEqual([
        {'scale': 'C', 'notes' : 'C D E F G A B C'},
        {'scale': 'E', 'notes' : 'E F# G# A B C# D# E'},
        {'scale': 'Amin', 'notes' : 'A B C D E F G A'}
    ]);
  });
});


describe('bassclef knows the scales ', function () {
   
   it('C', function () {
      
      expect(music.getScale('C')).toEqual({'notes': 'C D E F G A B C'});
   });
   
   it('E', function () {
      
      expect(music.getScale('E')).toEqual({'notes': 'E F# G# A B C# D# E'});
   });
   
   it('Amin', function () {
      
      expect(music.getScale('Amin')).toEqual({'notes': 'A B C D E F G A'});
   });
});

describe('bassclef gives undefined for', function () {
   
   it('scales that are not based on notes, like ', function () {

       expect(music.getScale('Your Mom')).toEqual({ 'notes': undefined });
   });
});