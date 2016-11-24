/**
 * Created by Glacier on 16/10/28.
 */
(function($){
    const green = '#008000';
    $.fn.greenify = function () {
        this.css('color', green);
        return this;
    };
}(jQuery));