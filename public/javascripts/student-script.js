$(document).ready(function() {

    // SUBMIT FORM
    $('#addsubmit').submit(function(event) {
        event.preventDefault();
        ajaxPost();
    });


    function ajaxPost() {

        let formData = {
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            semail: $('#semail').val(),
            sphone: $('#sphone').val(),
            saddress: $('#saddress').val()

        }

        // DO POST
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/students/add',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function(data) {
                console.log('Successful!', data);
                $("html").html(data);
            },
            error: function(e) {

                console.log('ERROR: ', e);
            }
        });

    }


    $('#editform').submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPut();
    });

    function ajaxPut() {
        let id = $('#editStudent').data("id");
        console.log('dataId', id);
        let editdata = {
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            semail: $('#semail').val(),
            sphone: $('#sphone').val(),
            saddress: $('#saddress').val()
        }
        console.log('edit', editdata);
        $.ajax({
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            url: '/students/edit/' + id,
            data: JSON.stringify(editdata),
            dataType: 'json',
            success: function(response, data) {
                console.log("Successful!" + data);
                window.location.href = "/students";

            },
            error: function(data) {
                console.log("Oops not working" + data);
            }
        })
    }


    $('.deleteStudent').on('click', function(e) {
        const id = e.target.dataset.id;
        // const target = $(e.target);
        // const id = target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/students/delete/' + id,
            success: function(response) {
                console.log('Student Deleted.')
                window.location.href = '/students';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $('#reset-btn').click(function() {
        $('#studentForm').trigger('reset');
        $('#classForm').trigger('reset');
    });

})