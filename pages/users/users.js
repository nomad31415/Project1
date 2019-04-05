
var database = firebase.database();


// database.ref().once('value', function (data) {
// picture = data.child("4320552453").child('picture').val();
// firstName = data.child("4320552453").child('firstname').val();
// lastName = data.child("4320552453").child('lastname').val();
// email = data.child("4320552453").child('email').val();

// $('#image').html('<img src="' + picture + '">')
// $('#image').append(firstName)
// $('#image').append(lastName)
// $('#image').append(email)


// });

database.ref().once('value', function (snapshot) {
  snapshot.forEach(function (child) {
    $('#image').append('<div class="splitter">')
    picture = child.child('picture').val();
    $('#image').append('<div class="holder"><img src="' + picture + '">')
    firstName = child.child('firstname').val();
    $('#image').append(firstName)
    lastName = child.child('lastname').val();
    $('#image').append(' ' + lastName)
    email = child.child('email').val();
    $('#image').append('<br>' + email);



    console.log(email, firstName, lastName, picture);
  });
});

