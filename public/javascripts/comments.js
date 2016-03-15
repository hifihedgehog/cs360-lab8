$(document).ready(function(){
    $("#serialize").click(function(){
      
      var key = "dc6zaTOxFJmzC";
      var myurl = "http://api.giphy.com/v1/gifs/search?q=";
      
      var comment = $("#Comment").val();
      var words = comment.split(" ");
      var firstWord = true;
      
      for(var i = 0; i < 2; i++) {
        var word = words[i];
        if(firstWord) {
          myurl += word;
          firstWord = false;
        } else {
            myurl += "+" + word; 
        }
        
      }
      
      myurl += "&api_key="
      myurl += key;
      console.log("myurl is: ", myurl);
      $.ajax({
        url : myurl,
        success : function(response) {
          console.log("response is:" , response);
          var myobj = { FirstName:$("#firstname").val(), LastName:$("#lastname").val(), Comment:$("#Comment").val()};
          if(response.data[0]) {
            myobj.Giph = response.data[0].images.original.url;
          }
          jobj = JSON.stringify(myobj);
          $("#json").text(jobj);
          var url = "comment";
          $.ajax({
            url:url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data,textStatus) {
              $("#done").html(textStatus);
            }
          })
        }
      });
    });

    $("#getThem").click(function() {
      $.getJSON('comment', function(data) {
        console.log(data);
        var everything = "<ul>";
        for(var comment in data) {
          com = data[comment];
          everything += "<li>Name: " + com.FirstName + " "  + com.LastName  + " Comment: " + com.Comment + "<img src='" + com.Giph + "'></li>";
        }
        everything += "</ul>";
        $("#comments").html(everything);
      })
    })

});