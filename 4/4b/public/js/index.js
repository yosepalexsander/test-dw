document.addEventListener("DOMContentLoaded", function (e) {
  const deleteButton = document.getElementById('deleteButton');
  const updateButton = document.getElementById('updateButton');
  deleteButton.addEventListener('click', function (event) {
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal", {
      keyboard: false
    }));
    deleteModal.show()

    const deleteSubmit = document.getElementById('deleteSubmit');
    const id = deleteButton.getAttribute('data-id');
    deleteSubmit.addEventListener('click', (e) => {
      fetch(`/school/${id}/delete`, {
        method: 'DELETE',
        mode: 'same-origin'
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message)
          window.location = '/'
        })
    })
  })

  updateButton.addEventListener('click', function (event) {
    const updateModal = new bootstrap.Modal(document.getElementById("updateModal"), {
      keyboard: false
    })
    updateModal.show();
    const id = updateButton.getAttribute('data-id');
    const updateForm = document.getElementById('updateForm');

    updateForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name_school = document.querySelector('.name_school').value;
      const npsn = document.querySelector('.npsn').value;
      const address = document.querySelector('.address').value;
      const logo_school = document.querySelector('.logo_school').value;
      const school_level = document.querySelector('.school_level').value;
      const status_school = document.querySelector('.status_school').value;
      const formData = { name_school, npsn, address, logo_school, school_level, status_school };
      fetch(`/school/${id}/update`, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          window.location = `/school/${id}`
        })
        .catch(err => alert(`failed due to err: ${err}`));
    })
  })
})

