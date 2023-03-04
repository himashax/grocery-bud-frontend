import React, { useState, useEffect } from 'react';
import Grocery_List from './Grocery-List'; 
import instance from './axios';
import Alert from './Alert';

function Main() {

    const [item, setItem] = useState("");
    const [groceryList, setGroceryList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedID, setSelecetdID] = useState(null);
    const [alert, setAlert] = useState({show: false, msg: '', type: ''});

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!item) {
            displayAlert(true, 'please enter an item', 'danger')

        } else if (item && isEditing) {
            groceryList.map(groceryItem => {
                if (groceryItem.id === selectedID) {
                    editGroceryItem(selectedID, {...groceryItem, name: item})
                }
            })

            setItem("");
            setIsEditing(false);
            setSelecetdID(null);

        } else {
            const newItem  = {
                id: new Date().getTime().toString(),
                name: item
            }
    
            console.log('new ', newItem)
            addGroceryItem(newItem);
            setItem("");
        }
        
    }

    useEffect(() => {
        async function fetchData() {
          const request = await instance.get("/");
          setGroceryList(request.data);
        }
        fetchData();
    }, [groceryList])


    const addGroceryItem = (item) => {
        instance.post('/add', item)
        .then(response => {
            displayAlert(true, 'item added successfully', response.data)
        }).catch(error => {
            console.error('Something went wrong!', error);
        });
    }

    const deleteGroceryItem = (id) => {
        instance.delete(`/${id}`)
        .then(response => {
            displayAlert(true, 'item deleted successfully', response.data)
        }).catch(error => {
            console.error('Something went wrong!', error);
        });

    }

    const onEditGroceryItem = (id) => {
        const specificItem = groceryList.find(grocery => grocery.id === id);
        setIsEditing(true);
        setSelecetdID(id);
        setItem(specificItem.name);
    }

    const editGroceryItem = (id, updatedItem) => {
        instance.put(`/${id}`, updatedItem)
        .then(response => {
            displayAlert(true, 'item updated successfully', response.data)
        }).catch(error => {
            console.error('Something went wrong!', error);
        });
    }

    const clearAll = () => {
        instance.delete(`/delete`)
        .then(response => {
            displayAlert(true, 'items removed', response.data)
        }).catch(error => {
            console.error('Something went wrong!', error);
        });
    }

    const displayAlert = (show = false, msg = "", type = "") => {
        setAlert ({
            show,
            msg, 
            type
        })
    }

    return ( 
        <section className='section-center'>
        <form className='grocery-form' onSubmit={handleSubmit} >
        {alert.show && <Alert {...alert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
            <input 
                type="text" 
                className='grocery' 
                placeholder='e.g. eggs'
                value={ item }
                onChange={(e) => setItem(e.target.value)} />    
            <button type='submit' className="submit-btn"> { isEditing ? 'Edit' : 'Submit' }
            </button>
        </div>
    </form>

      {  groceryList.length > 0 &&
      <div className="grocery-container">
            <Grocery_List 
                groceryList = { groceryList } 
                deleteGroceryItem = { deleteGroceryItem } 
                onEditGroceryItem = { onEditGroceryItem }
                />
            <button className="clear-btn" onClick={() => clearAll()}>
                clear items
            </button>
        </div>
        }
    
    </section>
     );
}

export default Main;