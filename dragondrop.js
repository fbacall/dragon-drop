(function ($) {
    $.fn.dragonDrop = function( action ) {
        if (action == 'drag') {
            return this.each(function() {
                $(this).mousedown(function (e) {
                    console.log("t");
                    e.preventDefault();
                    $(this).addClass('moving');
                    grabbed = $(this);
                });
            });
        }

        else if (action == 'drop') {
            return this.each(function() {
                $(this).mouseover(function () {
                    if(grabbed != null && $(this).has(grabbed).length == 0) {
                        dropLocation = $(this);
                        $(this).addClass('highlight');
                        ghostNode = grabbed.clone().addClass("ghost");
                        $(this).append(ghostNode);
                    }
                }).mouseout(function () {
                    dropLocation = null;
                    $(this).removeClass('highlight');
                    if(ghostNode != null) {
                        ghostNode.remove();
                        ghostNode = null;
                    }
                });
            });
        }
    };

    $(window).mouseup(function () {
        if(grabbed != null) {
            grabbed.removeClass('moving');
            if(dropLocation != null) {
                grabbed.detach().appendTo(dropLocation);
                if(ghostNode != null) {
                    ghostNode.remove();
                    ghostNode = null;
                }
            }
            grabbed = null;
        }
    });

    var grabbed = null;
    var dropLocation = null;
    var ghostNode = null;
}( jQuery ));
