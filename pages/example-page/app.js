// MOBILE NAVIGATION
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.step2').hide();
    $('.step3').hide();
});
var database = firebase.database();

// LOCAL STORAGE //
$('.next1').on('click', function () {
    $('.step1').hide();
    $('.step2').show();
    event.preventDefault();

    var firstName = $("#first_name").val().trim();
    var lastName = $("#last_name").val().trim();
    var email = $("#email").val().trim();

    localStorage.clear();
    localStorage.setItem("Full Name", firstName + lastName);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Email", email);
})

$('.next2').on('click', function () {
    event.preventDefault();
    $('.step2').hide();
    $('.step3').show();
    $('#my_result').appendTo('#webimg')
    $('#namedisplay').text('Name: ' + localStorage.getItem("First Name") + ' ' + localStorage.getItem("Last Name"));
    $('#emaildisplay').text('Email: ' + localStorage.getItem("Email"));
})



//Uploads data and picture to Firebase
$('.upward').on('click', function () {
    var idnumber = '';
    function idGenerator() {
        idnumber = '';
        for (var i = 0; i < 10; i++) {
            idnumber = idnumber + Math.floor(Math.random() * 10);
        };
        database.ref().once('value', function (data) {
            if (data.hasChild(idnumber)) {
                idGenerator();
                console.log(idnumber);
                console.log(data.child);
            } else {
                $('#idDisplay').text('Your ID # is: ' + idnumber);
                //here
                database.ref(idnumber).set({
                    firstname: localStorage.getItem('First Name'),
                    lastname: localStorage.getItem('Last Name'),
                    picture: img,
                    email: localStorage.getItem('Email'),
                    galleryid: 'uci'
                })

                // enroll
                var request = new XMLHttpRequest();
                request.open('POST', 'https://api.kairos.com/enroll');
                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestHeader('app_id', 'b9f2d60a');
                request.setRequestHeader('app_key', 'dadb4197732a9c1e434fb8eb6f6f4b76');
                request.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        // console.log('Status:', this.status);
                        // console.log('Headers:', this.getAllResponseHeaders());
                        // console.log('Body:', this.responseText);

                        var enrollObj = JSON.parse(this.responseText);
                        // // console.log('Body:' + enrollObj);


                        // var subjectId = enrollObj.images[0].transaction.subject_id;
                        // console.log('Subject ID: ' + subjectId);

                        // var status = enrollObj.images[0].transaction.status;
                        // console.log('Status: ' + status);

                        // var confidence = enrollObj.images[0].transaction.confidence;
                        // console.log('Confidence: ' + confidence);

                    }
                };

                var body = {
                    'image': img,
                    'subject_id': idnumber,
                    'gallery_name': 'MyGallery'
                };

                request.send(JSON.stringify(body));
                console.log('================================================');

                $('.confirm').text('Application Sent!')
            }
        })
    }
    idGenerator();
})

//Webcam application
Webcam.attach('#my_camera');
var img = null;
function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('my_result').innerHTML = '<img align="middle" src="' + data_uri + '"/>';
        img = data_uri
    });
}
