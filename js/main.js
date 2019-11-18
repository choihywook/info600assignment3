// document.addEventListener('DOMContentLoaded', assignClickHandler)
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

// send HTTP request via AJAX to python route and display the data in html
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
      dataType: 'json',
      success: function(data) {
        var record = $("#enteredRecords");
        record.html("");
        data.records.forEach(function(user) {
          var li = $("<li />");
          const date = new Date();
          var time = $("<span />", {className: "time"}).html(date.getHours() + ':' + date.getMinutes() + "  -");
          var fullName = $("<span />", {className: "fullName"}).html(user.fullName + ", ");
          var major = $("<span />", {className: "major"}).html(user.major + ", ");
          var startYear = $("<span />", {className: "startYear"}).html(user.startYear);
          var button = $("<button />").data("userId", user.id).html('Delete');
          li.append(time).append(fullName).append(major).append(startYear).append(button);
          record.append(li);
        })
      }
    })
  })

  // delete the record
  $("#enteredRecords").on('click', 'button', function(){
    var codeButt = $(this);
    var userId = codeButt.data("userId");
    $.ajax({
      method: 'DELETE',
      url: '/user/' + userId,
      success: function(data) {
        alert("User Deleted!");
      }
    });
  })

  //add data to json file and check the start year
  $('#addRec').on('click', function() {
    var startYear = $("#startYear").val();
    if (parseInt(startYear, 10) <= 2000) {
      alert('Incorrect year: ' + startYear);
      return false
    }
    $.ajax({
      method: 'POST',
      url: '/user/',
      data: $("#inputs").serialize(),
      success: function(data) {
        $('#fullName').val("");
        $('#major').val("");
        $('#startYear').val("");
      }
    })
  })
});


