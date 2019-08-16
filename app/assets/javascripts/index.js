$(function() {
  function appendUser(user) {
    html = user.id == $(".current-user").val() ? "" : `<div class="chat-group-user clearfix">
                                                        <p class="chat-group-user__name">${user.name}</p>
                                                        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                                                      </div>`;

    return html;
  };

  function addUser(userId, userName) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id="${userId}">
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    
    return html;
  };

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })

    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          var html = appendUser(user);
          $(".user-search-result").append(html);
        });
      }
    })

    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on("click", ".user-search-add", function() {
    var userId = $(this).data("user-id");
    var userName = $(this).data("user-name");
    var add_user_html = addUser(userId, userName);
    $("#search-users").append(add_user_html);
    $(this).parent().remove();
  });

  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});