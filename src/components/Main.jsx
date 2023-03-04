import React, { useState, useEffect } from 'react';
import Grocery_List from './Grocery-List'; 
import instance from './axios';

function Main() {

    const [item, setItem] = useState("");
    const [groceryList, setGroceryList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedID, setSelecetdID] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!item) {

        } else if (item && isEditing) {
            groceryList.map(groceryItem => {
                if (groceryItem.id === selectedID) {
                   // console.log({...groceryItem, name: item})
                   console.log({...groceryItem, name: item})
                   edit(selectedID, {...groceryItem, name: item})
                }
      
            })
           
            //edit(selectedID, updatedItem)
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
    }, [])


    const addGroceryItem = (item) => {
        instance.post('/add', item)
        .then(response => {
            console.log("Status: ", response.status);
            console.log("Data: ", response.data);
        }).catch(error => {
            console.error('Something went wrong!', error);
        });
    }

    const deleteGroceryItem = (id) => {
        instance.delete(`/${id}`)
        .then(response => {
            console.log("Status: ", response.status);
            console.log("Data: ", response.data);
        }).catch(error => {
            console.error('Something went wrong!', error);
        });
    }

    const editGroceryItem = (id) => {
        const specificItem = groceryList.find(grocery => grocery.id === id);
        setIsEditing(true);
        setSelecetdID(id);
        setItem(specificItem.name);
        console.log('name', specificItem, ' id ', id);
    }

    const edit = (id, updatedItem) => {
        instance.put(`/${id}`, updatedItem)
        .then(response => {
            console.log("Status: ", response.status);
            console.log("Data: ", response.data);
        }).catch(error => {
            console.error('Something went wrong!', error);
        });
    }

    const clearAll = () => {
        instance.delete(`/delete`)
        .then(response => {
            console.log("Status: ", response.status);
            console.log("Data: ", response.data);
        }).catch(error => {
            console.error('Something went wrong!', error);
        });
    }

    return ( 
        <section className='section-center'>
        <form className='grocery-form' onSubmit={handleSubmit} >
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
                editGroceryItem = { editGroceryItem }
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