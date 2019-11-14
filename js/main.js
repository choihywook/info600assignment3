document.addEventListener('DOMContentLoaded', assignClickHandler)

function assignClickHandler () {
  document.getElementById('addRec').addEventListener('click', function () {
    const startYear = document.getElementById('startYear').value
    if (startYear <= 2000) {
      window.alert('Incorrect year: ' + startYear)
      return
    }
    const fullName = document.getElementById('fullName').value
    const major = document.getElementById('major').value

    const date = new Date()
    const time = date.getHours() + ':' + date.getMinutes()

    const newEntry = time + ' - ' + fullName + ', ' + major + ', ' + startYear

    const enteredRecords = document.getElementById('enteredRecords')
    let newChild = document.createElement('li')
    newChild.appendChild(document.createTextNode(newEntry))

    enteredRecords.appendChild(newChild)

    document.getElementById('inputs').reset()
  })
}

// send HTTP request via AJAX to python route
$(document).ready(function() {
  $('#loadData').on("click", function() {
    $.ajax ({
      method: 'GET',
      url: '/users',
      data: {
        fullName : $('#fullName').val(),
        major : $('#major').val(),
        startYear : $('#startYear').val()
      },
      dataType: 'text',
      success: function(data) {
        $('#enteredRecords').html()
      }
    })
  })
});

//add data to json file
$(document).ready(function() {
  $('#addRec').on('click', function() {
    $.ajax({
      method: 'POST',
      url: '/user/',
      success: function(data) {
        $.each(data, function() {
          $('records').push({
            fullName : $('#fullName').val(),
            major : $('#major').val(),
            startYear : $('#startYear').val()
          })
        })
      }
    })
  })
});