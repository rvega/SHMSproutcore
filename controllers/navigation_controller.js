// ==========================================================================
// Project:   SHM.NavigationController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals SHM */

/** @class

  This is analogous to UINavigationController in cocoa. Manages SHM.NavigationView. 

  Controllers must implement the SHM.TabableProtocol

  Usage example:

    var usuariosController = Core.UsuariosController.create({});
    usuariosController.title = "Usuarios"; 
    usuariosController.icon = sc_static('img/icon-user.png'); 

    var nav = SHM.NavigationController.create(usuariosController);

    // Afterwards...

    var usuarioController = Core.UsuarioController.create({});
    usuarioController.title = "Pepito Perez";
    usuarioController.icon = sc_static('img/icon-user.png');

    nav.push(usuarioController);

@extends SC.Object
*/

sc_require('mixins/view_controller');

SHM.NavigationController = SC.Object.extend(
  SC.CollectionViewDelegate, 
  SHM.ViewController,
  {
    // Counter for generating controller paths.
    _count: 0,

    // Stack of views
    _views: undefined,

    // Which view is showing
    _activeView: null,

    // Stack of controllers
    _controllers: undefined, 

    // Which controller is showing
    _activeController: null,

    init: function(){
      sc_super();
      this.set('viewClass', SHM.NavigationView);
      this.set('_views', new Array());
      this.set('_controllers', new Array());
    },

    push: function(aController){
      // Stores the controller in a property called controller_0 or controller_1 or controller_2, etc.
      var aControllerPath = 'controller_'+this.get('_count');
      this.set(aControllerPath, aController);
      aController.set('path', this.get('path')+'.'+aControllerPath);
      aController.set('parentController', this);
      this.incrementProperty('_count'); 
      this.get('_controllers').push(aController);

      // Init the controller:
      var v = aController.createView();
      aController.populate();

      // Add item to breadcrumb:
      this.view.breadcrumb.push(aController.title); 

      // Show the view:
      this.get('_views').push(v);
      this.set('_activeView',v);
    },

    pop: function(argument) {
      var l = this.get('_views').length;
      if(l>1){
        this.set('_activeView', this.get('_views')[l-2]);

        // TODO: verify if this is actually destroying the view and controller objects
        var controllerPath = this.get('_controllers')[l-1].get('path');
        controllerPath = controllerPath.split('.');
        controllerPath = controllerPath[controllerPath.length-1];
        this.set(controllerPath, undefined);

        this.view.breadcrumb.pop();

        this.get('_views').pop();
        this.get('_controllers').pop();

        return true;
      }
    },

    popToIndex: function(idx){
      var howMany = this.get('_views').length - idx - 1;
      for(var i=0; i<howMany; i++){
        var didPop = this.pop(); 
        if(!didPop){break;}
      }
    }
});
