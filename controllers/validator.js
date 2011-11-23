// ==========================================================================
// Project:   SHM.Validator
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals SHM */

/** @class

  Describe class here 

  @extends SC.Object
*/

SHM.Validator = SC.Object.extend({ });

SHM.Validator.required = function(value){
   if(typeof value == 'undefined' || value == null) return false;

   var trimmed = value.replace(/^\s+|\s+$/g,"");
   if(trimmed=='') return false;

   return true;
}

SHM.Validator.notEmpty = function(value, required){
   return SHM.Validator.required(value);
}

SHM.Validator.email = function(value, required){
   if(required && !SHM.Validator.required(value)) return false;
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
   return emailPattern.test(value);  
}
