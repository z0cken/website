document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.pushpin');
  var instances = M.Pushpin.init(elems, {top: 270, offset: 10});
});