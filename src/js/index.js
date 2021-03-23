//Datacontroller
const dataController =(() => {
	let Todos = function(id,title,completed,active){
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.active = active;
	};
	let datas = {
		todos:[],
		count:0
	};

    return {
	   	createTodo:(title)=>{
	   		let ID,newItem;
   			if(datas.todos.length !== 0){
 				ID = datas.todos[datas.todos.length - 1].id + 1;
   			} else {
   				ID = 0;
   			}
   			//Creates a new Todo
   			newItem = new Todos(ID,title,false,true);
   			//adds the todo to datas
   			datas.todos.push(newItem);
   			console.log(newItem);
   			return newItem;
	   	},
	   	filterActive:() => {
	   		let activeDatas;
	   		activeDatas = datas.todos.filter(el => el.active === true);
	   		return activeDatas;
	   	},
	   	filterCompleted:() => {
	   		let completedDatas;
	   		completedDatas = datas.todos.filter(el => el.completed === true);
	   		return completedDatas;
	   	},
	   	allTodos:() => datas.todos,
	   	addCompletedItems:(id,check) => {
	   		let dataId = parseInt(id);
            datas.todos.map(el => {
            	if(check === true){
	            	if(el.id === dataId) {
	            		el.completed = true;
	            		el.active = false;
	            	}
            	} else if(check === false){
            		if(el.id === dataId) {
	            		el.completed =false;
	            		el.active = true;
	            	}
            	}
            });
            console.log(datas.todos);
            return datas.todos;
	   	},
	   	updateCount:() => {
	   		let newCount;
	   		newCount = datas.todos.filter(el => el.active === true);
	   		datas.count = newCount.length;
	   		return newCount.length;
	   	},
	   	deleteTodo:(id) => {
	   	   let ids,index;
	   	   ids = datas.todos.map(el => el.id);
	   	   index = ids.indexOf(parseInt(id));
	   	   if(index !== -1) {
	   	   	datas.todos.splice(index,1);
	   	   }
	   	},
	   	clearCompleted:(data) => {
           let completedDatas,indexes,allDatas;
           allDatas =  datas.todos.map(el => el.id);
           completedDatas = data.map(el => el.id);
           indexes =  completedDatas.map(el => allDatas.indexOf(el));

  		   for(let i=0;i<indexes.length;i++){
  		   	datas.todos.splice(indexes[i],1);
  		   	indexes = indexes.map(el => el-1);
  		   }
  		   
	   	}
    };
})();


//UIController

const UIController = (()=>{
	 let DOMstrings = {
	 	todoInput:'.todo-app__input',
	 	listItem:'.todo-app__lists--item',
	 	parentList:'.todo-app__lists',
	 	todoState:'.todo-app__state',
	 	activeState:'.todo-app__state-active',
	 	completedState:'.todo-app__state-completed',
	 	jsCheckbox:'.js--checkbox',
	 	itemsLeft:'.todo-app__items-left',
	 	deleteBtn:'.todo-app__lists--delete',
	 	deleteBtnImg:'todo-app__delete-img',
	 	clearCompleted:'.todo-app__clear-completed',
	 	themeBtn:'.todo-app__header--logo',
	 	body:'body',
	 	appTop:'.todo-app__top',
	 	msg:'.todo-app__lists--msg'
	 };
     return {
     	getDOMStrings:()=> DOMstrings,
     	getInput:() =>{
     		return {
               title:document.querySelector(DOMstrings.todoInput).value
     		};
     	},
     	addLists:(title,id,status) => {
     		const parentNode = document.querySelector(DOMstrings.parentList);
     		parentNode.insertAdjacentHTML("beforeend",
     		`
     		<li class="todo-app__lists--item"  id="list-${id}">
	            <input type="checkbox" name="" id="work-${id}" class="todo-app__checkbox js--checkbox" data-id="${id}" ${status}>
	            <label for="work-${id}" class="todo-app__checkbox-label"></label>
	            <span class="todo-app__lists--name" id="${id}">${title}</span>            
	            <button class="todo-app__lists--delete">
	              <img src="/icon-cross.861255e5.svg" alt="Delete Work" class="todo-app__delete-img">
	            </button>
            </li>
     		`);
     	},
     	removeTodos:() => {
     		const parentNode = document.querySelector(DOMstrings.parentList);
     		parentNode.innerHTML = '';
     	},
     	clearInput:() => {document.querySelector(DOMstrings.todoInput).value ="";},
     	updateCounter:(count) => {
     		if(count == 0){
     		  document.querySelector(DOMstrings.itemsLeft).innerHTML =`No items left`;	
     		} else {
     		  document.querySelector(DOMstrings.itemsLeft).innerHTML =`${count} items left`;
     	    }
     		console.log("execute vachha");
     	},
     	deleteLists:(selectorId) => {
     		let el = document.querySelector(`#list-${selectorId}`);
     		el.parentNode.removeChild(el);
     	},
     	clearCompletedLists:(ids) => {
     		let listIds,element;
     		listIds = ids;
     		listIds.forEach(el => {
 				element = document.querySelector(`#list-${el}`);
 				element.parentNode.removeChild(element);
     		});
     	},
     	defaultCount:() => {
     	  document.querySelector(DOMstrings.itemsLeft).innerHTML = `No items left`;
     	},
     	updateThemeLogo:() => {
     		// return {
     		// 	body:document.querySelector(DOMstrings.body),
     		// 	toggleBtn:document.querySelector(DOMstrings.themeBtn)
     		// };
     		let theme = "light";
     		document.querySelector(DOMstrings.body).classList.toggle("dark-theme");
     		if(document.querySelector(DOMstrings.themeBtn).getAttribute("src") == '/icon-moon.4401c989.svg'){
     		  document.querySelector(DOMstrings.themeBtn).src = `/icon-sun.e8063967.svg`
     	    } else {
     	      document.querySelector(DOMstrings.themeBtn).src = `/icon-moon.4401c989.svg`;
     	    }
     	    if(document.querySelector(DOMstrings.body).classList.contains("dark-theme")){
     	    	theme ="dark";
     	    } 
     	    localStorage.setItem("theme",theme);
     	    return theme;

     	},
     	themeStatus:() => {
            let currentTheme = localStorage.getItem("theme");
            if(currentTheme === "dark") {
            	document.querySelector(DOMstrings.body).classList.add("dark-theme");
            }
     	},
     	noTodosMessage:(status) =>{
 			document.querySelector(DOMstrings.parentList).insertAdjacentHTML("beforeend",`
			    <li class="todo-app__lists--msg">
	              <p>No ${status} todos left</p>
                </li>
 			`);
     	},
     	removeAlert:() => {
     		let el = document.querySelector(DOMstrings.msg);
     		el.parentNode.removeChild(el);
     		return el;
     	},
     	returnAlert:() => {
     		return document.querySelector(DOMstrings.msg);
     	}
     };
})();



//AppController
const appController = ((dataCtrl,UICtrl)=> {
	let setupEventlisteners = () => {
		document.querySelector(UICtrl.getDOMStrings().todoInput).addEventListener("keyup",
			(event) => {
				if(event.keyCode === 13){
					addTodos();
				}
			});
		//To display the todos when button is clicked
        Array.from(document.querySelector(UICtrl.getDOMStrings().todoState).childNodes).forEach(el =>{
        	el.addEventListener("click",displayDynamicTodos);
        });

        document.querySelector(UICtrl.getDOMStrings().parentList).addEventListener('change',updateCompleted);
        document.querySelector(UICtrl.getDOMStrings().parentList).addEventListener('click',deleteTodos);
        document.querySelector(UICtrl.getDOMStrings().clearCompleted).addEventListener('click',
        	clearCompletedItems);
        document.querySelector(UICtrl.getDOMStrings().themeBtn).addEventListener('click',toggleTheme);

	};
	const toggleTheme = () => {
		// let elements = UICtrl.selectElements();
		// elements.body.classList.toggle("dark-theme");
		 UICtrl.updateThemeLogo();

	};
	const clearCompletedItems = () => {
		//delete from the datacontroller
		  let completedTodos,completedIds;
		  completedTodos =  dataCtrl.filterCompleted();
          dataCtrl.clearCompleted(completedTodos);
		//delete from the UI
		  completedIds = completedTodos.map(el => el.id);
		  console.log(completedIds);
		  UICtrl.clearCompletedLists(completedIds);
	}

	//Updates the completed todos
	const updateCompleted = (e) => {
		e.preventDefault();
		if(e.target.classList[1] === UICtrl.getDOMStrings().jsCheckbox.slice(1)){
			var newCompletes,newCount;
			if(e.target.checked === true){
				newCompletes = dataCtrl.addCompletedItems(e.target.dataset.id,true);
				newCount = dataCtrl.updateCount();
				UICtrl.updateCounter(newCount);	
			} else {
			   newCompletes = dataCtrl.addCompletedItems(e.target.dataset.id,false);
			   newCount = dataCtrl.updateCount();
			   UICtrl.updateCounter(newCount);	
			}

		}
	};

	//Add todos to data and ui
	const addTodos = () => {
		let newTodos,newCount;
        let getTitle = UICtrl.getInput();
        if(UICtrl.returnAlert()){
          UICtrl.removeAlert();
        }
        if(/^\s+$/.test(getTitle.title) === false && getTitle.title !== ""){
	        //add data to the datacontroller
	        newTodos = dataCtrl.createTodo(getTitle.title);
	        //add todos to the ui
	        UICtrl.addLists(newTodos.title,newTodos.id);

	        //clear the input field
	        UICtrl.clearInput();
	        
	        //Stores no.of todos left
	        newCount = dataCtrl.updateCount();
	        //Add items left in the UI
	        UICtrl.updateCounter(newCount);
        }
	};

	//Display active todos
	const  displayDynamicTodos = (e) => {
		    e.preventDefault();
			let stateElements,activeElements,state,completedElements;
			state = Array.from(e.target.classList[0]).join("");
			stateElements = Array.from(e.target.parentElement.children);
			stateElements.map(el => el.classList.remove("current"));
			e.target.classList.add("current");
			//Removes all todos
			UICtrl.removeTodos();
			console.log(state)
			if(state === "todo-app__state-active"){
			    //Adds the active datas to the lists
				activeElements = dataCtrl.filterActive();
				if(activeElements.length !== 0) {
					if(UICtrl.returnAlert()){
					   UICtrl.removeAlert();
				    }
                   activeElements.forEach(el => UICtrl.addLists(el.title,el.id,));
				} else {
					UICtrl.noTodosMessage("active");
				}
				
			}else if(state === "todo-app__state-completed"){
				completedElements = dataCtrl.filterCompleted();
				if(completedElements.length !== 0 ){
					if(UICtrl.returnAlert()){
					   UICtrl.removeAlert();
				    }
				    completedElements.forEach(el => UICtrl.addLists(el.title,el.id,"checked"));
			    } else {
			    	UICtrl.noTodosMessage("completed");
			    }

			} else if(state === "todo-app__state-all"){
				if(dataCtrl.allTodos().length !== 0){
					if(UICtrl.returnAlert()){
					   UICtrl.removeAlert();
				    }
	                 dataCtrl.allTodos().forEach(el => {
	                 	if(el.completed === false){
	                 		UICtrl.addLists(el.title,el.id);
	                 	} else if(el.completed === true){
	                 	    UICtrl.addLists(el.title,el.id,"checked");
	                 	}
	                 });
                } else {
                	UICtrl.noTodosMessage("any");
                }
			}

	};

	//Delete todos
	const deleteTodos = (e) => {
		if(e.target.classList.contains(UICtrl.getDOMStrings().deleteBtnImg)){
			//console.log(e.target.closest(UICtrl.getDOMStrings().listItem));
			let deletingEl;
			deletingEl = e.target.closest(UICtrl.getDOMStrings().listItem).id.split("-")[1];
			console.log(deletingEl);
  			dataCtrl.deleteTodo(deletingEl);

  			//deleting from the UI
            UICtrl.deleteLists(deletingEl);
            if(dataCtrl.allTodos().length === 0) {
            	UICtrl.noTodosMessage("any");
            }

		}
	}
	return {
		init:() => {
		   UICtrl.defaultCount();
		   UICtrl.themeStatus();
		   UICtrl.noTodosMessage("any");
		   setupEventlisteners();
		}
	};
	

})(dataController,UIController);
appController.init();
