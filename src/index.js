
import { lexer, parser } from 'reflectpfx';

function processExpression() {
  $('#eval').on('click', function() {
    var text = $('#expression').val();
    var parseTree = parser.eval(lexer.tokenize(text));
    var s = JSON.stringify(parseTree, 2, null);
    $('#result').html(`<b>here's your parse tree: ${s}</b>`);
  });

  $('#expression').on('input', function() {
    var text = $(this).val();
    try
    {
      var parseTree = parser.eval(lexer.tokenize(text));
      $(this).css('color', 'green');
      var s = JSON.stringify(parseTree, 2, null);
      $('#result').html(`<small>${s}</small>`);
    }
    catch (e)
    {
      $(this).css('color', 'red');
      $('#result').html('');
    }
  });
}
  
processExpression();
