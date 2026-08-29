document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.toggle-reply').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');
      const form = document.getElementById(targetId);
      if (!form) return;
      form.classList.toggle('hidden');
      if (!form.classList.contains('hidden')) {
        const textarea = form.querySelector('textarea');
        if (textarea) textarea.focus();
      }
    });
  });
});
