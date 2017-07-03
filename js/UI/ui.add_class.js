// Requires ./_ui
(function(d, UI){

  var
      ATTR_ADD_CLASS = 'data-add-class';

  function AddClass(){
    var ac = this;
    ac.elems = null; // NodeList

    /* Private ******************************/
    function _ManipulateElem(elem) {
      elem.classList.add(elem.getAttribute(ATTR_ADD_CLASS));
      elem.removeAttribute(ATTR_ADD_CLASS);
    }
    /****************************************/

    ac.init = function(){
      ac.elems = d.querySelectorAll('[' + ATTR_ADD_CLASS + ']');
      if (ac.elems.length) {
        ac.elems.forEach( _ManipulateElem );
      }
    };

    return ac;
  }

  UI.AddClass = AddClass;

})(document, window.UI);
