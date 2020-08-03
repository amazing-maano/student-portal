$(document).ready(function() {

    // SUBMIT FORM
    $('#addClass').submit(function(event) {
        event.preventDefault();
        classPost();
    });


    function classPost() {

        let classData = {
            cname: $('#cname').val(),
            desc: $('#desc').val()
        }

        // DO POST
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/class/add',
            data: JSON.stringify(classData),
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


    $('#editClassForm').submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPut();
    });

    function ajaxPut() {
        let id = $('#editClass').data("id");
        console.log('dataId', id);
        let editClassData = {
            cname: $('#cname').val(),
            desc: $('#desc').val(),
            sname: $('#sname').val()
        }
        console.log('edit', editClassData);
        $.ajax({
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            url: '/class/edit/' + id,
            data: JSON.stringify(editClassData),
            dataType: 'json',
            success: function(response, data) {
                console.log("Successful!" + data);
                window.location.href = "/class";

            },
            error: function(data) {
                console.log("Oops not working" + data);
            }
        })
    }


    $('.deleteClass').on('click', function(e) {
        const id = e.target.dataset.id;
        // const target = $(e.target);
        // const id = target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/class/delete/' + id,
            success: function(response) {
                console.log('Class Deleted.')
                window.location.href = '/class';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $('.delStudentButton').on('click', function(e) {
        const id = e.target.dataset.id;
        console.log('studid', id);
        // const target = $(e.target);
        // const id = target.attr('data-id');
        $.ajax({
            type: 'POST',
            url: '/class/studentDelete/' + id,
            success: function(response) {
                console.log('Student Deleted.')
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

$(document).ready(function() {
    jQuery(document).delegate('a.add-record', 'click', function(e) {
        e.preventDefault();
        var content = jQuery('#sample_table tr'),
            element = null,
            element = content.clone();
        element.appendTo('#tablebody');

    });


});