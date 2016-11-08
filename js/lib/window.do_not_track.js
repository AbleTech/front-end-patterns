// See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
// A simple function to call if you want to check the status of the User Agent's
// current Do Not Track policy setting.
(function(w, n){
  function DNT(){
    if ('msDoNotTrack' in n) return n.msDoNotTrack;
    if ('doNotTrack' in w)   return w.doNotTrack;
    if ('doNotTrack' in n)   return n.doNotTrack;
    return 0;
  };
  w.DNT = DNT;
})(window, navigator);
