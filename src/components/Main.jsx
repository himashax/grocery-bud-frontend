import React, { useState, useEffect } from 'react';
import Grocery_List from './Grocery-List'; 
import instance from './axios';
import axios from 'axios';

function Main() {

    const [item, setItem] = useState("");
    const [groceryList, setGroceryList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem  = {
            id: new Date().getTime().toString(),
            name: item
        }

        instance.post('/add', newItem)
        .then(response => {
            console.log("Status: ", response.status);
            console.log("Data: ", response.data);
        }).catch(error => {
            console.error('Something went wrong!', error);
        });

        console.log(newItem)
    }

    

    useEffect(() => {
        async function fetchData() {
          const request = await instance.get("/");
          setGroceryList(request.data);
        }
        fetchData();
    }, [])



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
            <button type='submit' className="submit-btn">
            </button>
        </div>
    </form>

      {  groceryList.length > 0 &&
      <div className="grocery-container">
            <Grocery_List groceryList = { groceryList } />
            <button className="clear-btn">
                clear items
            </button>
        </div>
        }
    
    </section>
     );
}

export default Main;