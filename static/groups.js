let groups = [];

jQuery(function ($) {
    $('#groupSubmit').on('click', addGroup);
    getGroups();
});

function getGroups() {
    $.get('/api/v1/groups', function (data) {
        groups = data.groups;
        // console.log(data);
        renderGroup();
        addGroupCheckBoxes();
    })
}

function addGroupCheckBoxes() {
    let form = $('#contactsForm');
    groups.forEach(function (element) {
        let checkBox = document.createElement('INPUT');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.value = element.title;

        let label = document.createElement('LABEL');
        label.appendChild(document.createTextNode(element.title));
        form.append(checkBox);
        form.append(label);
    })
}

function renderGroup() {
    groups.forEach(function (element) {
        let li = document.createElement('LI');
        li.innerText = element.title;
        li.setAttribute('data-group', `${element.title}`);
        li.setAttribute('id', `${element._id}`);

        let del = document.createElement('SPAN');
        del.addEventListener('click', removeGroup);
        del.setAttribute('class', 'btn btn-danger btn-xs glyphicon glyphicon-remove');

        let edit = document.createElement('SPAN');
        edit.addEventListener('click', editGroup);
        edit.setAttribute('class', 'btn btn-warning btn-xs glyphicon glyphicon-edit');

        li.append(edit);
        li.append(del);

        li.addEventListener('click', function (e) {
            let resContacts = [];
            contacts.forEach(function (element) {
                if (element.category.includes(e.target.dataset.group.toString())) {
                    resContacts.push(element);
                }
            });
            // contacts = resContacts;
            // console.dir(e.target.dataset.group);
            hideContacts();
            renderContact(resContacts);
        });
        $('#groups').append(li);
    })
}

function hideContacts() {
    let ul = document.getElementById('contacts');
    // debugger;
    ul.querySelectorAll('li').forEach(function (element) {
        element.remove();
    })
}

function addGroup() {
    $.ajax({
        url: '/api/v1/groups',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "title": $('#title').val()
        }),
        dataType: 'json',
    })
}

function removeGroup(e) {
    $.ajax({
        url: `/api/v1/group/${e.target.parentElement.id}`,
        type: 'DELETE',
        dataType: 'json'
    });

    $(`#${e.target.parentElement.id}`).remove();
    e.stopPropagation();
}

function editGroup(e) {
    let groupText = e.target.parentElement.innerText;

    let groupDiv = document.createElement('FORM');
    let title = document.createElement('INPUT');
    let save = document.createElement('INPUT');
    save.setAttribute('type', 'submit');
    save.setAttribute('class', 'tn btn-primary');
    save.innerText = 'Save';
    title.setAttribute('type', 'text');
    title.setAttribute('class', 'form-control');
    title.setAttribute('id', 'editTitle');
    title.value = groupText;

    groupDiv.append(title);
    groupDiv.append(save);


    save.addEventListener('click', function () {
        $.ajax({
            url: `/api/v1/group/${e.target.parentElement.id}`,
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                title: $('#editTitle').val()
            })
        });
        contacts.forEach(function (element) {
            element.category.forEach(function (categoryText) {
                if (element.category.includes(text)) {
                    categoryText = $('#editTitle').val();
                }
            })
        });
    });



    $(`#${e.target.parentElement.id}`).replaceWith(groupDiv);
    debugger;
    let text = $('#editTitle').val();
    e.stopPropagation();
}