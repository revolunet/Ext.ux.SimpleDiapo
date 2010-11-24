Ext.ux.SimpleDiapo
==

A simple javascript diaporama made with [Ext.Core][1].
-

The classic cross-browser fadein/fadeout diaporama.


**Usage**: 

    # in your HTML
    <img src='diapo1' src='/path/to/image.jpg'/>

    # javascript code :
    var diapo  = new Ext.ux.SimpleDiapo({
        target:'diapo1'
        ,images:[
           '200/Chargeur1_150.jpg'
            ,'200/Chargeur2_150.jpg'
            ,'200/Chariot-Telescopique-3_150.jpg'
        ]
        ,duration:5000
        ,shuffle:true
    });
        
        
**Configuration params** :

* **images** : list with your images
* **target** : the HTML image target
* **duration** : how long before changing image source (default=1000)
* **shuffle** : randomize images
* **preloadImages** : preload images or not (default=true)


  [1]: http://www.sencha.com/products/core/