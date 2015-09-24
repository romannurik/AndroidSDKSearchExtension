// Saves options to chrome.local.sync.
function save_options() {
  var url = document.getElementById('baseurl').value;
  chrome.storage.local.set({
    baseUrl: url
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHTML = '<strong>Options saved.</strong>';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restore_options() {
  chrome.storage.local.get({
    baseUrl: 'https://android.googlesource.com'
  }, function(items) {
    document.getElementById('baseurl').value = items.baseUrl;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
