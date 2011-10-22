// ==========================================================================
// Project:   SHM.TabView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals SHM */

/** @class
  


  @extends SC.View
*/
SHM.TabView = SC.View.extend({
  controllerPath:null,
  
  init: function(){
    var controllerPath = this.controllerPath; // Makes paths for bindings below more readable (controllerpath.something instead of parentView.parentView.something)    

    this.childViews = 'left right'.w();

    this.left = SC.ListView.create({
      contentBinding: controllerPath+'._menuItems',
      selectionBinding: controllerPath+'._activeMenuItem',
      contentValueKey: 'title',
      contentIconKey: 'icon',
      delegate: eval(controllerPath),
      hasContentIcon: YES,
      classNames: 'main-nav',
      rowHeight:30,
      layout:{top:32,left:0,width:120,bottom:20}
    });

    this.right = SC.ContainerView.create({
      layout: {left:120, top:32},
      contentViewBinding: controllerPath + '._activeView'
    });

    sc_super();
  }, 
  
});
