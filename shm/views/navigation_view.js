// ==========================================================================
// Project:   SHM.NavigationView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals SHM */

/** @class


@extends SC.View
*/
SHM.NavigationView = SC.View.extend({
  controllerPath:undefined,

  init: function(){
    var controllerPath = this.controllerPath; // Makes paths for bindings below more readable (controllerpath.something instead of parentView.parentView.something)    

    this.childViews = 'breadcrumb scene'.w();

    this.breadcrumb = SHM.BreadcrumbView.create({
      anchorLocation:SC.ANCHOR_TOP,
      controllerPath:controllerPath
    });

    this.scene = SC.SceneView.create({
      layout: {top:32},
      nowShowingBinding: controllerPath + '._activeView',
      scenesBinding: controllerPath + '._views'
    });

    sc_super();
  }, 
});
