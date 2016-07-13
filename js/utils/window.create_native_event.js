(function(d,w){

	var _createClickEvent = function(eventType){
		var e;
		if (d.createEvent) {
			e = d.createEvent("MouseEvent");
			e.initMouseEvent(eventType,true,true,w,0,0,0,0,0,false,false,false,false,0,null)
		} else {
			e = new MouseEvent(eventType)
		}
		return e;
	};

	w.createNativeEvent = function(eventType){
		switch (eventType) {
			case 'mousedown':
			case 'mouseup':
			case 'click':
				return _createClickEvent(eventType);
				break;
		}
	};

})(document, window);
