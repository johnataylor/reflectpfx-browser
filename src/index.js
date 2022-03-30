
import { lexer, parser, structuredCondition } from 'reflectpfx';

function makeHTML (tree) {
  var s = `<B>${tree.operator}</B>`;
  if (tree.children) {
    s += '<UL>';
    tree.children.forEach(child => {
      s += '<LI>'
      if (child.operator) {
        s += makeHTML(child);
      }
      else {
        s += $('<div/>').text(child.operand).html();
      }
      s += '</LI>';
    });
    s += '</UL>';
  }
  return s;
}

$(function() {
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
      var t = structuredCondition(parseTree);
      $('#structuredConditionTree').html(makeHTML(t));
    }
    catch (e)
    {
      $(this).css('color', 'red');
      $('#result').html('');
      $('#structuredConditionTree').html('');
    }
  });
});
