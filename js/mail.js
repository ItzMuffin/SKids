$("#contact-form").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        submitMSG(false, "Have you filled the form?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});

function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var subject = $("#subject option:selected").val();
 
    $.ajax({
      type: "POST",
      url: "php/mail.php",
      data: "name=" + name + "&email=" + email + "&subject=" + subject + "&message=" + message,
      success : function(text){
          if (text == "success"){
              formSuccess();
          } else {
              submitMSG(false,text);
          }
      }
    });
}

function formSuccess(){
    $("#contact-form")[0].reset();
    submitMSG(true, "Mail sent!")
}

function submitMSG(valid, msg){
        var msgClasses;
    if(valid){
        msgClasses = "h3 text-center animated fadeIn text-success";
    } else {
        msgClasses = "h3 text-center animated shake text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}