// Audit request form: no third-party service. Builds a pre-filled email in the visitor's mail app.
(function () {
  var form = document.getElementById('audit-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var to = form.getAttribute('data-email');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var f = form.elements;
    var site = f.website.value.trim();
    if (!/^https?:\/\//i.test(site)) site = 'https://' + site;

    var subject = 'GEO audit request: ' + site.replace(/^https?:\/\//i, '');
    var body = [
      'Name: ' + f.name.value.trim(),
      'Email: ' + f.email.value.trim(),
      'Website: ' + site,
      '',
      f.message.value.trim()
    ].join('\n');

    window.location.href = 'mailto:' + to +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    status.textContent = '> your email app should open with the request ready to send. Nothing opened? Write to ' + to + '.';
    status.className = 'form-status ok';
  });
})();
