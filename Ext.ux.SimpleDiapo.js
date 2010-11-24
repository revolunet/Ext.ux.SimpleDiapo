
// Julien Bouquillon / revolunet
// Ext.ux.SimpleDiapo.js
// http://github.com/revolunet/Ext.ux.diapo

Ext.namespace('Ext.ux');

Ext.ux.SimpleDiapo = Ext.extend(Ext.util.Observable, {
    constructor:function(config) {
           var baseconfig = {
                 target:null
                 ,images:[]
                 ,duration: 1000
                 ,fadeDuration: 500
                 ,shuffle:false
                 ,preloadImages:true
            };
         
            Ext.apply(this, baseconfig);
            Ext.apply(this, config);
            
            this.playTask = new Ext.util.DelayedTask(function(){
                 this.next();
             }, this);
             
            if (this.shuffle === true) {
                
                // duplicate source list
                this.images = Ext.apply([], this.images);
                // randomize images
                shuffle( this.images );
            }
            
            // IE FIX
            Ext.get( this.target ).setVisibilityMode(  Ext.Element.VISIBILITY   );
            
            Ext.ux.SimpleDiapo.superclass.constructor.call(this); 
            
            if (this.preloadImages) {
                // preload all images in browser cache
                for (var i=0;i<this.images.length;i++) {
                     var j = {
                        tag:'img'
                        ,style:'display:none;'
                        ,src:this.images[i]
                        }
                       Ext.DomHelper.append(document.body, j);            
                    }
                }

            // start loop
            this.start();
    }
    ,imageIndex:0   // current image
    ,__showNext:function() {
        // find the best next candidate
        this.imageIndex += 1;
        if (this.imageIndex >= this.images.length) this.imageIndex=0;
        var newSrc = this.images[ this.imageIndex ];
        var curSrc = Ext.get( this.target ).getAttribute('src');
        if (this.shuffle === true) {
            // skip image if same
            while (newSrc == curSrc) {
                this.imageIndex += 1;
                if (this.imageIndex >= this.images.length) this.imageIndex=0;
                newSrc = this.images[ this.imageIndex ];
            }
        }
        // change & show image
        Ext.get( this.target ).set({src:newSrc});
        Ext.get( this.target ).show(  true );
        // loop
        this.playTask.delay( this.duration, null, this ); 
    }
    ,next:function() {
        if (this.images.length == 0) return;
        // hide current image
        Ext.get( this.target ).setOpacity(0.1, true );
        // defer newt show
        this.__showNext.defer( this.fadeDuration, this);
    }
    ,stop : function() {
        // stop loop
        this.playTask.cancel();
    }
    ,start: function() {
        this.stop();
        // defer next image processing
        this.playTask.delay( this.duration, null, this ); 
    }
});


//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
var shuffle = function(o){ //v1.0
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};