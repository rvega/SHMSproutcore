// ==========================================================================
// Project:   Shm.BreadcrumbView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Shm */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SHM.BreadcrumbItemView = SC.View.extend({
  index:undefined,
  title:undefined,
  displayProperties:['title'],
  render: function(context){
    context.push('<li>'+this.get('title')+'</li>');
  },

  mouseDown: function(){
    var ctl = eval(this.get('controllerPath'));
    ctl.popToIndex(this.get('index'));
  },
});

/** @class

  (Document Your View Here)

  @extends SC.ToolbarView
*/
SHM.BreadcrumbView = SC.ToolbarView.extend(
/** @scope Shm.BreadcrumbView.prototype */ {
  classNames: 'breadcrumb',
  tagName: 'ul',
  _count: 0,
  _width: 0,
  itemPadding: 20,
  itemMargin: 10,

  init: function(){
    var controllerPath = this.get('controllerPath'); // Makes paths for bindings below more readable (controllerpath.something instead of parentView.parentView.something)    
    // this.childViews = 'eh'.w();
    // this.eh=SC.LabelView.create({value:'Eh?', layout:{width:100, height:20, x:20, y:20}});
    sc_super();
  }, 

  push: function(title){
    // Calculate size of new item.
    var size = SC.metricsForString(title,'sc-label-view');
    var width=size.width+this.itemPadding;

    // Create new item and add it to childViews
    var newItem = SHM.BreadcrumbItemView.create({
      index:this.get('_count'),
      title:title,
      controllerPath:this.get('controllerPath'),
      layout:{width:width, height:size.height, centerY:0, left:this.get('_width')},
      width:width
    });
    this.appendChild(newItem);

    this.incrementProperty('_count');
    this.set('_width', this.get('_width')+width+this.itemMargin);
  },

  pop: function(){
    var children = this.get('childViews');
    var breadCrumbItem = children[children.length-1];
    this.removeChild(breadCrumbItem);
    
    this.set('_width', this.get('_width') - breadCrumbItem.width - this.itemMargin);
  }
});
