//if(window.attachEvent) {
//    window.attachEvent('onload', yourFunctionName);
//}
//else {
//    if (window.onload) {

//        var myURL = this.toString();
//        var myhash = this.hash.toString();
//        var strippedURL = myURL.replace(myhash, '');





$(document).ready(function () {
    // Add smooth scrolling to all links in navbar + footer link
   

    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior

        var myURL = this.toString();
        var myhash = this.hash.toString();
        var strippedURL = myURL.replace(myhash, '');

        strippedURL = strippedURL.split("/").pop();
        // alert(strippedURL);

        var path = window.location.pathname;
        var page = path.split("/").pop();
        //  alert(page);
        //alert(this.hash);

        if (this.hash !== "" && (page == strippedURL)) {

            // Prevent default anchor click behavior IF ON SAME PAGE
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                var newhash = hash.replace("/", "");
              // alert('updated hash');
                window.location.hash = newhash;
               
            });
        } // End if

    });

    $(window).scroll(function () {

        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });




    });



    //$(window).load(function () {

    //    var myURL = window.location.pathname.toString();
    //   // var myhash = this.hash.toString();
    //   // var strippedURL = myURL.replace(myhash, '');

    //    //strippedURL = strippedURL.split("/").pop();
    //    alert(myURL);
    //});
})