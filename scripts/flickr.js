var main = function(){
    "use strict";
    var searchFor = "interstellar";
    $("main .searchbox button").on("click", function(event){
        if ($(".searchbox input").val() !== ""){
            searchFor = $(".searchbox input").val();
            $("main .photos").empty();
            var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags="+searchFor+"&format=json&jsoncallback=?";
            $.getJSON(url, function(flickrResponse){
                flickrResponse.items.forEach(function(photo){
                    var $tag = $("<img>").hide();
                    $tag.attr("src", photo.media.m);
                    $("main .photos").append($tag);
                    $("img").fadeIn();
                });
            });
        }
    });

    var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags="+searchFor+"&format=json&jsoncallback=?";
            $.getJSON(url, function(flickrResponse){
                flickrResponse.items.forEach(function(photo){
                    var $tag = $("<img>").hide();
                    $tag.attr("src", photo.media.m);
                    $("main .photos").append($tag);
                    $("img").fadeIn();
                });
            });
};

$(document).ready(main);