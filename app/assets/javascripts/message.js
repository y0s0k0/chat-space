$(function() {
  var buildMessageHTML = function(message) {

    message_image = message.image == null ? `` : `<img class="lower-message__image" src="${message.image}">`;
      //data-idが反映されるようにしている
    var html = `<div class="message" data-id='${message.id}'>
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
                    ${message_image}
                  </div>
                </div>`
    return html;
  }

  function scroll() {
    $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight});
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
      var html = buildMessageHTML(data);
      $(".messages").append(html);
      scroll();
      $("form")[0].reset();
    })
    .fail(function(data){
      alert("メッセージを入力してください");
    })
    .always(function(data){
        $(".new_message__submit").prop("disabled", false);
    })
  })

  $(function() {
    setInterval(reloadMessages, 5000);
  });

  var reloadMessages = function() {
    var last_message_id = $(".message:last").data("id") || 0;
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(data) {
      data.forEach(function(message) {
        var insertHTML = buildMessageHTML(message);
        $(".messages").append(insertHTML);
        scroll();
      })
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("失敗");
    });
  }
});