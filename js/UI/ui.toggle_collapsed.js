// Requires ./_ui
// Requires ../_lib/element.matches
(function(d, UI){

  var
     ATTR_TOGGLE_TARGET = 'data-toggle-collapsed',
     CLASS_COLLAPSED    = 'js_collapsed';

  function ToggleCollapsed() {
    var tc = this;
    tc.elems = []; // nodeList

    /* Private *******************************************************/
    function _clickHandler(e){
      var elem = e.target;
      var target = elem.getAttribute(ATTR_TOGGLE_TARGET);
      if (elem.href) {
        var anchorTarget = '#' + elem.href.split('#')[1];
        if (anchorTarget == target){
          e.preventDefault();
        }
      }
      d.querySelector(target).classList.toggle(CLASS_COLLAPSED)
    }
    function _groupCheckedHandler(e) {
      var elem = e.target;
      var groupElems = d.querySelectorAll('[name="' + elem.name + '"][' + ATTR_TOGGLE_TARGET + ']');
      var i = 0,
          groupElemsLen = groupElems.length;
      for (i; i < groupElemsLen; i++) {
        var target = d.querySelector(groupElems[i].getAttribute(ATTR_TOGGLE_TARGET));
        elem.checked ? target.classList.remove(CLASS_COLLAPSED) : target.classList.add(CLASS_COLLAPSED);
      }
    }
    function _checkedHandler(e){
      var target = e.target.getAttribute(ATTR_TOGGLE_TARGET);
      d.querySelector(target).classList.toggle(CLASS_COLLAPSED);
    }
    /*****************************************************************/

    tc.findElements = function(){
      tc.elems = d.querySelectorAll('[' + ATTR_TOGGLE_TARGET + ']');
    };

    tc.bindHandlers = function(){
      var i = 0,
          elemLen = tc.elems.length;
      for (i; i < elemLen; i++) {
        var elem = tc.elems[i];
        if (elem.matches('[type="checkbox"]')) elem.addEventListener('change', _checkedHandler);
        if (elem.matches('[type="radio"]')) elem.addEventListener('change', _groupCheckedHandler);
        if (elem.matches('a')) elem.addEventListener('click', _clickHandler);
      }
    };

    tc.init = function(){
      tc.findElements();
      if (tc.elems.length) {
        tc.bindHandlers();
      }
    };

    return tc;
  }
  UI.ToggleCollapsed = ToggleCollapsed;

})(document, window.UI);
