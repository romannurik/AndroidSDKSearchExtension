// Saves options to chrome.local.sync.
function save_options() {
  var url = document.querySelector('input:checked').value;
  chrome.storage.local.set({
    baseUrl: url
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHTML = '<strong>Options saved.</strong>';
    setTimeout(function () {
      status.textContent = '';
    }, 2000);
  });
}

function restore_options() {
  chrome.storage.local.get({
    baseUrl: 'https://android.googlesource.com'
  }, function(items) {
    if (items.baseUrl === 'https://android.googlesource.com'){
      document.getElementById("googlesource").checked = true;
    } else {
      document.getElementById("github").checked = true;
    }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);