/**
 * Created by admin on 2018/2/27.
 */
;(function ($) {
    function preLoad(imgs, options){
        this.imgs=(typeof imgs === 'string')?[imgs]:imgs;
        this.options= $.extend({},preLoad.defaultOpts,options);
        if(this.options.order === 'order')
            this._order();
        else
            this._unorder();
    }

    preLoad.defaultOpts={
        order:'unorder',
        each:null,
        all:null
    };

    preLoad.prototype._order= function () {
        var imgs=this.imgs,
            opts=this.options,
            count= 0,
            len=imgs.length;
        load();

        function load(){

            var oimg=new Image();

            $(oimg).on('load error', function () {
                count++;
                opts.each && opts.each(count);
                if(count>=len)
                    opts.all && opts.all()
                else
                    load();
            })

        }
    }

    preLoad.prototype._unorder= function () {
        var imgs=this.imgs,
            opts=this.options,
            count= 0,
            len=imgs.length;

        $.each(imgs, function (i,src) {
            if(typeof src != 'string') return

            var oimg=new Image();

            $(oimg).on('load error', function () {
                opts.each && opts.each(count);
                count++;
                if(count>=len)
                    opts.all && opts.all()
            })

            oimg.src=src;
        })
    };

    $.extend({
        preload: function (imgs ,opts) {
            new preLoad(imgs, opts);
        }
    })
}(jQuery));