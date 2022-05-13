$("#submitForm").submit(function (e) {
  e.preventDefault();
  var frm = $("#submitForm");
  var data = {};
  var that = this;
  $.each(this, function (i, v) {
    var input = $(v);
    data[input.attr("name")] = input.val();
    delete data["undefined"];
  });

  $.ajax({
    contentType: "application/json; charset=utf-8",
    type: frm.attr("method"),
    url: frm.attr("action"),
    dataType: 'json',
    data: JSON.stringify(data),
    // success: function (data) {
    //   alert(data);
    // },
    // error: function (data) {
    //   alert("error occured!!");
    //   console.log(data)
    // },
    complete: function (data) {
      loadCustomer('http://localhost:8080/ElectroGrid/rest/customers')
      alert('Customer Added Successfully!!')
      //form reset
      that.reset();
    }
  });
});

function loadCustomer(url) {
  $("tr:has(td)").remove();
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (response) {
      $.each(response, function (i, item) {
        var $tr = $('<tr  class="table-light">').append(
          $('<th>').text(item.nic),
          $('<td>').text(item.name),
          $('<td>').text(item.address),
          $('<td>').text(item.phone),
          $('<td>').text(item.gender),
          $('<td>').text(item.age),
          $('<td>').text(item.email),
          $('<td>').append('<ul class="flexList"><li><a href="customeredit.html?id=' + item.customerId + '"><button><i class="far fa-pen"></i></button></a></li><li><button onClick="deleteitem(' + item.customerId + ')"><i class="far fa-trash-alt"></i></button></li></ul>')
        )
          .appendTo('#tbody');
      });
    }
  });
}

function deleteitem(id) {
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:8080/ElectroGrid/rest/customers/' + id,
    dataType: 'json',
    complete: function (response) {
      loadCustomer('http://localhost:8080/ElectroGrid/rest/customers')
    }
  });
}

function getAUser(url) {
  let searchParams = new URLSearchParams(window.location.search)
  let id = searchParams.get('id')
  $.ajax({
    type: 'GET',
    url: url + '/' + id,
    dataType: 'json',
    success: function (item) {
      if (item.customerId == id) {
        $('#id').val(item.customerId);
        $('#nic').val(item.nic);
        $('#name').val(item.name);
        $('#address').val(item.address);
        $('#phone').val(item.phone);
        $('#age').val(item.age);
        $('#email').val(item.email);
        if (item.gender == 'male') {
          $('#male').attr('checked', 'checked');
        } else {
          $('#female').attr('checked', 'checked');
        }
      }
    }
  })
}


$("#submitEditForm").submit(function (e) {
  e.preventDefault();
  var frm = $("#submitEditForm");
  var data = {};
  var that = this;
  $.each(this, function (i, v) {
    var input = $(v);
    data[input.attr("name")] = input.val();
    delete data["undefined"];
  });

  $.ajax({
    contentType: "application/json; charset=utf-8",
    type: frm.attr("method"),
    url: frm.attr("action") + '/' + $('#id').val(),
    dataType: 'json',
    data: JSON.stringify(data),
    complete: function (data) {
      alert('Customer Updated Successfully!!')
       window.location.replace("customer.html");
    }
  });
});