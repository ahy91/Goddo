// Code goes here

/* Coding Practice.   
 * Functions (show, add, edit, remove, complete, countCompleted, findById, toggleAll)
 * Global Event Binding.
 */ 

/* Main */

window.onload = function() {
   /* Register Event */ 

   function TodoList() {
      this.todos = [];
      this.todoContainer = document.getElementById('todo-list');
   }

   /* Model to server interface */
   function Model() {
      this.serverUrl = window.location.origin; 
   }

   Model.prototype.create = function(newItem, callback) {
      callback = callback || function() {};
      //'Create' of CRUD
      $.ajax({
         dataType: 'json',
         url: this.serverUrl + '/create',
         data : {
            'id': newItem.id,
            'text': newItem.text,
            'deadline': newItem.deadline,
            'account': "ANONYMOUS"
         }
      }).done(function(msg) {
         console.log(msg);
         //nothing to update view.
         callback();
      }).fail(function(msg) {
         console.log(msg);
      });
   };
   Model.prototype.read = function(callback) {
      callback = callback || function() {};
      //'Read' of CRUD
      $.ajax({
         dataType: 'json',
         url: this.serverUrl + '/read',
         data : {
            'account': 'ANONYMOUS'
         }
      }).done(function(msg) {
         console.log(msg);
         //update view.
         callback(msg)
      }).fail(function(msg) {
         console.log(msg);
      });
   };
   Model.prototype.update = function(id, newValue, callback) {
      callback = callback || function() {};
      //'Update' of CRUD
      $.ajax({
         dataType: 'json',
         url: this.serverUrl + '/update',
         data : {
            'id': id,
            'text': newValue,
            'account': 'ANONYMOUS'
         }
      }).done(function(msg) {
         console.log(msg);
         //update view for updated item.
         //'Read' action.
         callback()
      }).fail(function(msg) {
         console.log(msg);
      });
   };
   Model.prototype.delete = function(id, callback) {
      callback = callback || function() {};
      //'Delete' of CRUD
      $.ajax({
         dataType: 'json',
         url: this.serverUrl + '/delete',
         data : {
            'id': id,
            'account': 'ANONYMOUS'
         }
      }).done(function(msg) {
         console.log(msg);
         //update view
         //'Read' action
         callback()
      }).fail(function(msg) {
         console.log(msg);
      });
   };

   //Model.prototype.check
   //Model.prototype.clearAll

   /* Controller + View */
   TodoList.prototype.show = function() {
      var todos = this.todos;

      this.model.read(function(msg) {
         //insert data into todos array.
         if(!msg.data)
            return;
         for(var i = 0; i < msg.data.length; i++) {
            todos.push({
               id: msg.data[i].id,
               text: msg.data[i].text,
               deadline: msg.data[i].deadline,
               completed: false ,
               hide: false
            })
         }
         this.render();
      });
   }
   TodoList.prototype.render = function() {
      var view = '';
      var length = this.todos.length;

      for( var i=0; i<length; i++) {
         view += '<li data-id="'+this.todos[i].id
            + '" class="' +(this.todos[i].completed?'completed':'')+ ' '+(this.todos[i].hide?'hide':'')+ '">'
            +		'<div class="view">'
            +			'<input class="toggle" type="checkbox"'+(this.todos[i].completed?'checked':'')+'>'
            +			'<label>'+ this.todos[i].text  +'</label>'
            +			'<button class="destroy"></button>'
            +		'</div>'
            +	'</li>';
      }

      this.todoContainer.innerHTML = view;

      var count = document.querySelector("#todo-count");
      var countToShow = this.todos.length - this.countCompleted();
      count.innerHTML = '<strong>'+countToShow+'</strong> item'+ (countToShow > 1?'s':"") +'left';
   };

   TodoList.prototype.add = function(todo) {
      this.todos.push(todo);
      this.show();
   };

   TodoList.prototype.edit = function(id, text) {
      for( var i=this.todos.length-1; i>=0; i--) {
         if( this.todos[i].id == id) {
            this.todos[i].text = text;
         }
      }
      this.show();
   };

   TodoList.prototype.remove = function(id) {
      for( var i=this.todos.length-1; i>=0; i--) {
         if( this.todos[i].id == id) {
            this.todos.splice(i,1);
         }
      }

      this.show();
   };

   TodoList.prototype.complete = function(id, value) {
      for( var i=this.todos.length-1; i>=0; i--) {
         if( this.todos[i].id == id) {
            this.todos[i].completed = value;
         }
      }
      this.show();
   };
   TodoList.prototype.countCompleted = function() {
      var count = 0;
      for( var i=this.todos.length-1; i>=0; i--) {
         if( this.todos[i].completed === true) {
            count++;
         }
      }

      return count;
   };

   TodoList.prototype.findById = function(id) {
      for( var i=this.todos.length-1; i>=0; i--) {
         if( this.todos[i].id == id) {
            return this.todos[i];
         }
      }

      return null;
   };

   TodoList.prototype.clearCompleted = function() {
      for( var i=this.todos.length-1; i>=0; i--) {
         if( this.todos[i].completed === true) {
            this.todos.splice(i,1);
         }
      }
      this.show();
   };

   TodoList.prototype.toggleAll = function(value) {
      for( var i=this.todos.length-1; i>=0; i--) {
         if( value === true) {
            this.todos[i].completed = true;
         }
         else {
            this.todos[i].completed = false;
         }
      }
      this.show();
   };


   todoList = new TodoList();
   model = new Model();
   //TODO - more neat way is needed.
   todoList.model = model;

   //initial request
   todoList.show();

   //Event Binding.

   var newTodo = document.querySelector('#new-todo');

   newTodo.addEventListener("keypress", function(event) {
      // Enter
      if(event.keyCode == 13) {
         if(newTodo.value.trim() === '') 
            return;

         var newItem = {
            id: new Date().getTime(),
            text: newTodo.value,
            deadline: "NONE"
         };

         model.create(newItem, function() {
            /*
            todoList.add({
               id: newItem.id,
               text: newItem.text,
               deadline: newItem.deadline,
               completed: false ,
               hide: false 
            });
            */
            //TODO - REFACTORING...
            todoList.show();
            //What if fail?
            newTodo.value = '';
         });
      }

   });

   //Clear Completed.

   var clearButton = document.getElementById('clear-completed'); 

   clearButton.addEventListener("click", function(event) {
      todoList.clearCompleted();
   });

   //Toggle All box.
   var toggleAllBox = document.getElementById('toggle-all');

   toggleAllBox.addEventListener("change", function(event) {
      todoList.toggleAll(toggleAllBox.checked);
   });

   //Below are Global Event Listeners for potential elements.

   //Edit
   document.documentElement.addEventListener("dblclick", function(event) {
      //If the target of dblclick event is one of the todo text, activate edit mode.
      var todoArray = document.querySelectorAll("#todo-list li label");
      if( Array.prototype.indexOf.call(todoArray, event.target) >= 0) {
         //Get selected item's text
         var todoElement = event.target.parentNode.parentNode;
         var todoToEdit = todoList.findById( todoElement.getAttribute('data-id') );

         //Show edit box.
         todoElement.setAttribute("class", "edit");
         var editBox = document.createElement('input');
         todoElement.appendChild(editBox);

         editBox.focus();
         editBox.value = todoToEdit.text;

         //Event Handler for Edit Done.
         editBox.addEventListener("keypress", function(event) {
            if(event.keyCode == 13) {
               if(editBox.value.trim() === '') {
                  model.delete(todoToEdit.id, function() {
                     //todoList.remove(todoToEdit.id);
                     todoList.show();
                  });
               }
               else {
                  model.update(todoToEdit.id, editBox.value, function() {
                     //todoList.edit(todoToEdit.id, editBox.value);
                     todoList.show();
                     todoElement.setAttribute("class", "");
                  });
               }
            }
         });

         editBox.addEventListener("blur", function(event) {
            todoElement.setAttribute("class", "");
            todoElement.removeChild(editBox);
         });

      }
   });

   //Checkbox 
   document.documentElement.addEventListener("change", function(event) {
      var todoToggles = document.querySelectorAll("#todo-list li .toggle");
      if( Array.prototype.indexOf.call(todoToggles, event.target) >= 0) {
         var todoElement = event.target.parentNode.parentNode;
         var todoToComplete = todoElement.getAttribute('data-id');

         if(event.target.checked === true) {
            todoList.complete(todoToComplete, true);
         }
         else {
            todoList.complete(todoToComplete, false);
         }
      }
   });

   //Remove. 
   document.documentElement.addEventListener("click", function(event) {
      var todoDestroy = document.querySelectorAll("#todo-list li .destroy");
      if( Array.prototype.indexOf.call(todoDestroy, event.target) >= 0) {
         var todoElement = event.target.parentNode.parentNode;
         var todoToRemove = todoElement.getAttribute('data-id');

         model.delete(todoToRemove, function() {
            //todoList.remove(todoToRemove);
            todoList.show();
         });
      }
   });

};
