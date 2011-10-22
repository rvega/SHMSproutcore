// ==========================================================================
// Project:   SHM.tabController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals SHM */

/** @class

  Manages a view (SHM.TabView) similar in functionality to SC.TabView, the difference is I'm 
  not using a segmented view for the buttons but a list view instead, this allows
  for broader customization.
  
  Also, controllers are not assumed to be singletons (I needed this in my apps ;)). 
  Look at http://elsoftwarehamuerto.org/wp-content/uploads/2011/10/Sproutcore-Talk1.pdf

  Controllers must implement the SHM.TabableProtocol

  Usage example:
  
    // inside the populate() method of a class that extends SHM.TabController
    
    var usuariosController = Core.UsuariosController.create({});
    usuariosController.title = "Usuarios";
    usuariosController.icon = sc_static('img/icon-user.png'); 

    var pacientesController = Core.PacientesController.create({});
    pacientesController.title = "Pacientes";
    pacientesController.icon = sc_static('img/icon-user.png');

    this.addController(usuariosController);
    this.addController(pacientesController);
    this.set('activeControllerIndex',0);

  @extends SC.Object
*/
SHM.TabController = SC.Object.extend(SC.CollectionViewDelegate, {
  // A path such as Core.mainController.tabController used by views to find this controller.
  path:null,
  
  // How many controllers are we managing.
  _count: 0,

  // Which view is showing
  _activeView: undefined,

  // Array of data for items in the menu.
  _menuItems: undefined,

  // same as activeControllerIndex but must be of type SC.SelectionSet
  _activeMenuItem: SC.SelectionSet.create({}),

  init: function(){
    sc_super();
    this.set('_menuItems', new Array());
  },

  // Which controller is active
  // activeControllerIndex is a computed property, the actual value is _activeMenuItem (SC.SelectionSet)
  activeControllerIndex: function(key, value){
    if (value !== undefined) { // setter
      this._activeMenuItem.clear();
      this._activeMenuItem.add(this._menuItems, value);

      var controller = this.controllerForIndex(value);
      this.set('_activeView',controller.view);
    }
    else{ //getter
      var i = this._activeMenuItem.indexSetForSource(this._menuItems).firstObject();
      return i;
    }
  }.property(),
  
  // Stores the controller in a property called controller_0 or controller_1 or controller_2, etc.
  // creates a menu item and sets up everything to show/hide the controller's view.
  // Controllers must implement createView() and have 'path', 'view', 'title and 'icon' properties.
  addController: function(aController){
    var aControllerPath = 'controller_'+this.get('_count');
    this[aControllerPath] = aController; //should be this.set(aControllerPath, aController); but it doesn't work :| ¿?

    aController.set('path', this.get('path')+'.'+aControllerPath);
    aController.createView();
  
    this._menuItems.push(SC.Object.create({
      title:aController.title,
      icon:aController.icon
    }));

    this.incrementProperty('_count'); 
  },

  controllerForIndex: function(i){
    return this.get('controller_'+i);
  },

  removeController: function(aController){
    throw('SHM.TabController.removeController has not been implemented yet');
  },

  // Collection View Delegate (left nav):
  collectionViewShouldSelectIndexes: function(view, indexes, extend){
    var controller = this.controllerForIndex(indexes.firstObject());
    this.set('_activeView',controller.view);
    return indexes;
  }
});
