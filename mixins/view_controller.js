// ==========================================================================
// Project:   SHM.ViewController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Core */

/** @namespace
    This mixin makes the creation of of non-singleton controllers a little easier.
     
    You should read the part about controllers in this document: http://elsoftwarehamuerto.org/wp-content/uploads/2011/10/Sproutcore-Talk1.pdf
*/

SHM.ViewController = {
  /**
    This is a string that views will use to find it's controller to, for example, setup bindings

    @type SC.Object
  */
  path:null,


  /**
    points to the view managed by this controller

    @type SC.View
  */
  view:null,


  /**
    title is displayed by breadcribviews, navigarionviews and other objects that instantiate
    viewcontrollers

    @type String
  */
  title:'',
  
  /**
    The filename of an image that will be displayed by TabViews for this ViewController

    @type String
  */  
  icon:null,

  /**
    Class object (something like AppName.ViewClassName, no quotes) for the view that will be created and managed
    by this ViewController

    @type Class
  */    
  viewClass:null,

  /**
    A reference to the controller that instantiated this ViewController

    @type SC.Object
  */    
  parentController:null,

  /**
    Second chance to initialize the ViewController, the init method is usually called too early to be useful  

    @returns null 
  */
  populate: function(){},

  /**
    Sent by navigation controller when the controller is about to be removed from the navigation stack

    @returns null 
  */
  willDissappear: function(){},

  /**
    This method is called by NavigationController and other objects that instantiate ViewControllers, If you're
    instantiating manually, you should call this method

    @returns SC.View 
  */
  createView: function(){
    var v = this.viewClass.create({
      controllerPath:this.path
    });
    this.set('view',v);
    return this.get('view');
  },
}
