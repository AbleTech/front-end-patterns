// Requires ./_ui.js
// ============================================
// This UI function finds all elements with the attribute data-select-all then
// attaches a click event handler to it. When it is triggered, the event selects
// all in the range.

(function(d, UI){

  var
    DATA_ATTRIBUTE = 'data-select-all';

  function SelectAll(){

    /* Private **********************************************/
    function _findAllElements() {
      return d.querySelectorAll('[' + DATA_ATTRIBUTE + ']');
    }
    function _selectAllClickHandler(event) {
      return event.target.setSelectionRange(0, event.target.value.length);
    }
    /* *******************************************************/

    var t = this;
    t.elements = null; // NodeList

    t.attachClickHandler = function(){
      var i = 0,
          len = t.elements.length;
      for (i; i < len; i++){
        var elem = t.elements[i];
        elem.addEventListener('click', _selectAllClickHandler);
        elem.removeAttribute(DATA_ATTRIBUTE);
      }
    };

    t.init = function(){
      t.elements = _findAllElements();
      if (t.elements.length) {
        t.attachClickHandler();
      }
    };
    return t;
  }

  UI.SelectAll = SelectAll;

})(document, window.UI);
