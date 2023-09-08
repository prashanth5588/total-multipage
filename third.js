const firebaseConfig = {
    apiKey: "AIzaSyB5LoFZffpe_hAb9mJR0LYH5e_YcW65LaE",
    authDomain: "multipageapplication.firebaseapp.com",
    databaseURL: "https://multipageapplication-default-rtdb.firebaseio.com",
    projectId: "multipageapplication",
    storageBucket: "multipageapplication.appspot.com",
    messagingSenderId: "544324576644",
    appId: "1:544324576644:web:506b3832e76f39f62ba9d1",
    measurementId: "G-SMW26R3MXK"
  };
  
  // Initialize Firebase


 firebase.initializeApp(firebaseConfig); 

 // userName in index.html , room_name in second.html 

 user_name = localStorage.getItem("userName")
 room_name = localStorage.getItem("room_name")
  // console.log(user_name);
 // console.log(room_name);

 function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0,
    });

    document.getElementById("msg").value = "";

 };

 
function getData() {
    firebase.database().ref("/" + room_name)
    .on("value",function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if ( childKey !== "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                // start actual code 


                console.log(firebase_message_id);
                console.log(message_data);

                name1 = message_data["name"];
                message = message_data["message"];
                like = message_data["like"];


                name_with_tag = "<h4 class = 'name_h4' >  " + name1 + "<img class = 'use_click' src='6.image.png'> </h4>" ;
                message_with_tag = "<h4 class = 'message_h4'> " + message + " </h4>" ;
                like_button = "<button class = 'btn btn-warning'  id=" + firebase_message_id + "  value = " + like + "  onclick = 'updatelike(this.id)'>";
                span_with_tag = "<span class = 'glyphicon glyphicon-thums-up'> Like: " + like + "</span></button> <hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag ;
                document.getElementById("output").innerHTML += row ;
            }
        });
    });
};

getData(); 


function updatelike(msg_id) {
    console.log("clicked on like button -  " + msg_id);
    btn_id = msg_id;
    likes = document.getElementById(btn_id).value;
    updated_likes = Number(likes) + 1 ;

    console.log(updated_likes);
    // push to fire base Number of likes 

    firebase.database().ref(room_name).child(msg_id).update({
        like: updated_likes,
    });

    console.log(msg_id);

};


function logout() {

    localStorage.clear();
    window.location = "index.html"
};
