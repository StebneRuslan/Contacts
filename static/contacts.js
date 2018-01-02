let contacts = [];
jQuery(function ($) {
    $('#submit').on('click', addContact);
    getContacts();
});

function getContacts() {
    $.get('/api/v1/contacts', function (data) {
        contacts = data.contacts;
        console.log(data);
        renderContact();
    })
}

function renderContact() {
    contacts.forEach(function (element) {
        let li = document.createElement('LI');
        li.innerText = element.name + ' ' + element.phone;
        li.setAttribute('id', `${element._id}`);

        let del = document.createElement('SPAN');
        del.addEventListener('click', removeContact);
        del.setAttribute('class', 'btn btn-danger btn-xs glyphicon glyphicon-remove');

        let edit = document.createElement('SPAN');
        edit.addEventListener('click', editContact);
        edit.setAttribute('class', 'btn btn-warning btn-xs glyphicon glyphicon-edit');

        li.append(edit);
        li.append(del);
        $('#contacts').append(li);
    })
}

function addContact() {
    $.ajax({
        url: '/api/v1/contacts',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": $('#name').val(),
            "phone": $('#phone').val()
        }),
        dataType: 'json',
    })
}

function removeContact(e) {
    $.ajax({
        url: `/api/v1/contact/${e.target.parentElement.id}`,
        type: 'DELETE',
        dataType: 'json'
    });
    $(`#${e.target.parentElement.id}`).remove();
}

function editContact(e) {
    let contactText = e.target.parentElement.innerText;
    let contact = {
        name: contactText.split(' ')[0],
        phone: contactText.split(' ')[1]
    };

    let contactDiv = document.createElement('FORM');
    let name = document.createElement('INPUT');
    let phone = document.createElement('INPUT');
    let save = document.createElement('INPUT');
    save.setAttribute('type', 'submit');
    save.setAttribute('class', 'tn btn-primary');
    save.innerText = 'Save';
    name.setAttribute('type', 'text');
    name.setAttribute('class', 'form-control');
    name.setAttribute('id', 'editName');
    phone.setAttribute('type', 'text');
    phone.setAttribute('class', 'form-control');
    phone.setAttribute('id', 'editPhone');
    name.value = contact.name;
    phone.value = contact.phone;
    contactDiv.append(name);
    contactDiv.append(phone);
    contactDiv.append(save);


    save.addEventListener('click', function () {
        $.ajax({
            url: `/api/v1/contact/${e.target.parentElement.id}`,
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                name: $('#editName').val(),
                phone: $('#editPhone').val()
            })
        })
    });

    $(`#${e.target.parentElement.id}`).replaceWith(contactDiv);
}