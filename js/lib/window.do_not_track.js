// See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
// A simple function to call if you want to check the status of the User Agent's
// current Do Not Track policy setting.
(function(w, n){
	w.doNotTrack = function(){
	  return w.doNotTrack || n.msDoNotTrack || n.doNotTrack || 0;
	};
})(window, navigator)
