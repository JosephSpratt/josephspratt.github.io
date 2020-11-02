//storage controller 
const StorageCtrl = (function(){

    return {
        storeItem: function(item){
            let items = [];

            //check if items in storage
            if(localStorage.getItem('items') === null){
                items = [];
                items.push(item);

                //set local storage 
                localStorage.setItem('items', JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem('items'));

                //push the new item 
                items.push(item);

                //re set local storage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            let items;

            //check if items in storage
            if(localStorage.getItem('items') === null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
        },
        updateLocalStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index)=>{
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            })
            //re set local storage
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemsFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index)=>{
                if(id === item.id){
                    items.splice(index, 1);
                }
            })
            //re set local storage
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }
    }
})();

//item controller 
const ItemCtrl = (function(){
    console.log('item controller');
    //Item constructor 
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure / State
    const data = {
    // items: [
    //     {id: 0, calories: 1200, name: 'Steak Dinner'},
    //     {id: 1, calories: 400, name: 'Eggs'},
    //     {id: 2, calories: 600, name: 'Ice Cream'},
    //     {id: 3, calories: 900, name: 'Noodles'}
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null, 
    totalCalories: 0
    }

    //Public methods
    return {
        logData: function(){
            return data;
        },
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            console.log(name, calories);
            //Create ID
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            }else{
                ID = 0;
            }

            //Calories to number
            calories = parseInt(calories);

            //Create new item
            newItem = new Item(ID, name, calories);

            //Add to items array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            data.items.forEach((item)=>{
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        getTotalCalories: function(){
            let total = 0;
            data.items.forEach((item)=>{
                total+=item.calories;
            });
            //set total calories in the data stucture
            data.totalCalories = total;

            //return total
            return data.totalCalories;
        },
        setCurerntItem: function(currentItem){
            data.currentItem = currentItem;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        updateItem: function(name, calories){
            const caloriesNum = parseInt(calories);
            let found = null;
            data.items.forEach((item) => {
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = caloriesNum;
                    found = item;
                }
            })
            return found;
        },
        deleteItem: function(id){
            //get the item ids
            const ids = data.items.map((item) => {
                return item.id;
            });

            //get index
            const index = ids.indexOf(id);

            //remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        }
    }
})();

//ui controller 
const UICtrl = (function(){
    
    const UISelectors = {
        itemList: "#item-list",
        listItem: '#item-list li',
        addBtn: '.add-btn',
        itemName: '#item-name',
        itemCalorieInput: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn'
    }

    //Public methods
    return {
        populateItemsList: function(items){
            let html = '';
            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a></li>`;
            });

            //Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function(){
            return UISelectors;
        },
        getItemInput: function(){
            return {
                name:document.querySelector(UISelectors.itemName).value,
                calories:document.querySelector(UISelectors.itemCalorieInput).value,
            }
        }, 
        addListItem: function(item){
            //show list 
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //create li element 
            const listItem = document.createElement('li');
            listItem.className = 'collection-item';
            listItem.id = `item-${item.id}`;
            listItem.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>`;
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', listItem);
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemName).value = '';
            document.querySelector(UISelectors.itemCalorieInput).value = '';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(calories){
            document.querySelector(UISelectors.totalCalories).textContent = calories;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalorieInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        updateListItem: function(item){
            const listItems = document.querySelectorAll(UISelectors.listItem);
            //turn node list into array
            listItemsArr = Array.from(listItems);

            listItemsArr.forEach((listItem) =>{
                const itemId = listItem.getAttribute('id');
                if(itemId === `item-${item.id}`){
                    console.log(itemId);
                    document.getElementById(itemId).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
            });
        },
        deleteListItem: function(id){
            const itemId = `#item-${id}`;
            document.querySelector(itemId).remove();
        },
        removeListItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItem);
            listItemsArr = Array.from(listItems);
            listItemsArr.forEach((item) => item.remove());
        }
    }
})();

//app controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    //Load event listeners
    const loadEventListners = function(){
        //Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        //Edit icon click
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        //update item 
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        //delete button click
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        //back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', (e)=>{
            e.preventDefault();
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        });

        //prevent enter default 
        document.addEventListener('keypress', (e) => {
            if(e.which === 13 || e.keyCode === 13){
                e.preventDefault();
            }
            return false;
        });

        //clear button click
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);
    }

    //Add item submit
    const itemAddSubmit = function(e){
        //get form input from ui controller
        const input = UICtrl.getItemInput();
        console.log(input);
        
        //check for name and calorie
        if(input.name !== '' && input.calories !== ""){
            //add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);
        

        //get the total calories 
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add total calories to the ui
        UICtrl.showTotalCalories(totalCalories);
        //clear fields 
        UICtrl.clearInput();

        StorageCtrl.storeItem(newItem)
        }

        e.preventDefault();
    }

    //Update item submit
    const itemUpdateSubmit = function(e){
        console.log('update');
        e.preventDefault();
        //Get item input
        const itemInput = UICtrl.getItemInput();

        //update input 
        const updateItem = ItemCtrl.updateItem(itemInput.name, itemInput.calories);

        UICtrl.updateListItem(updateItem);

        //get the total calories 
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add total calories to the ui
        UICtrl.showTotalCalories(totalCalories);


        //update local storage
        StorageCtrl.updateLocalStorage(updateItem);

        //clear ui edit state
        UICtrl.clearEditState();
    }

    //Update item submit
    const itemEditClick = function(e){

        if(e.target.classList.contains('edit-item')){
            //Get list item id
            const listId = e.target.parentNode.parentNode.id;
            //break into an array and split at the dash
            const listIdArr = listId.split('-');
            //get the actual id
            const id = parseInt(listIdArr[1]);

            //get item 
            const itemToEdit = ItemCtrl.getItemById(id);

            //set item
            ItemCtrl.setCurerntItem(itemToEdit);

            //add item to from
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    }

    //delete an item
    const itemDeleteSubmit = function(e){
        console.log('delete');
        e.preventDefault();
        //get current item 
        const currentItem = ItemCtrl.getCurrentItem();

        //delete the current item
        ItemCtrl.deleteItem(currentItem.id);

        //delete from ui 
        UICtrl.deleteListItem(currentItem.id);

         //get the total calories 
         const totalCalories = ItemCtrl.getTotalCalories();
         //Add total calories to the ui
         UICtrl.showTotalCalories(totalCalories);

         //delete from storage
         StorageCtrl.deleteItemsFromStorage(currentItem.id);

         //clear ui edit state
        UICtrl.clearEditState();

    }

    const clearAllItems = function(e){
        e.preventDefault();

        ItemCtrl.clearAllItems();

        UICtrl.removeListItems();

        //get the total calories 
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add total calories to the ui
        UICtrl.showTotalCalories(totalCalories);
        //clear fields 
        UICtrl.clearInput();

        //clear from storage
        StorageCtrl.clearItemsFromStorage();
        
        //hide the ul
        UICtrl.hideList();
    }
    //Public methods
    return {
        init: function(){
            console.log('Initializing App...');
            //clear edit state
            UICtrl.clearEditState();

            //Fetch items from data structure
            const items = ItemCtrl.getItems();
            
            if(items.length === 0){
                UICtrl.hideList();
            }else{
                UICtrl.populateItemsList(items);
            }

            //get the total calories 
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to the ui
            UICtrl.showTotalCalories(totalCalories);

            //Load event listeners
            loadEventListners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl);

//Initialize App
App.init();