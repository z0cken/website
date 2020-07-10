document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.pushpin');
  var pushpinInstance = M.Pushpin.init(elems, {top: 270, offset: 10});
});

document.getElementById("minecraftSetClipboard").addEventListener("click", function() {
  var copyText = document.getElementById("minecraftSetClipboard");
  copyToClipboard("mc.z0cken.com")
})


function copyToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    var tooltip = document.getElementById('minecraftSetClipboard');
    var tooltipInstance = M.Tooltip.init(tooltip, {});
    tooltipInstance.open();
    setTimeout(function() {
      tooltipInstance.destroy();
    }, 5000);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}