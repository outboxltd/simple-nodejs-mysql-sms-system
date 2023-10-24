document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('smsForm');
  form.addEventListener('submit', function(e) { e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    fetch('/sendSMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, phone: phone })
    }).then(response => response.json()).then(data => {
      if (data.success) {
        alert('SMS Sent successfully');
      } else {
        alert('Failed to send SMS');
      }
    });
  });
});