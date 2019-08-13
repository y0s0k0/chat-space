$(function() {
  function buildHTML(message) {

    if(message.image == null) {
      message_image = ""
    } else {
      message_image = `<img class="lower-message__image" src="${message.image}">`
    };

    var html = `<div class="message">
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
                </div>
                <div class="upper-message__date">
                ${message.created_at}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                ${message.body}
                </p>
                </div>
                ${message_image}
                </div>`
                
    return html;

  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight});
      $(".input-box__text").val("");
    })
    .fail(function(data){
      alert("メッセージを入力してください");
    })
    .always(function(data){
      $(".new_message__submit").prop("disabled", false);
    })
  })
});