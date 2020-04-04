function setbgpublic(color) {
  document.getElementById("public-key").style.background = color;
}

function setbgprivate(color) {
  document.getElementById("private-key").style.background = color;
}

function copyPublicKey() {
  var textPublicKey = document.getElementById("public-key");
  textPublicKey.select();
  textPublicKey.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function copyPrivateKey() {
  var textPublicKey = document.getElementById("private-key");
  textPublicKey.select();
  textPublicKey.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

$(document).ready(function () {
  $("button#generate-wallet")
    .unbind()
    .on("click", function () {
      $.ajax({
        url: "/wallet/new",
        type: "GET",
        success: function (response) {
          $("textarea#public-key").html(response['public_key']);
          $("textarea#private-key").html(response['private_key']);
          $("div#warning").addClass("d-block");
          Swal.fire({
            title: "<strong>Note</strong>",
            icon: "info",
            html:
              "The 2 keys have been created, drag to the bottom and read the warning",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: "Thumbs down",
          });
        },
        error: function () {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cannot create key!'
          })
        }
      });
    });
});
