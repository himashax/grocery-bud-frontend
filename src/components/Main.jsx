import React, { useState, useEffect } from 'react';
import Grocery_List from './Grocery-List'; 
import instance from './axios';

function Main() {

    const [groceryList, setGroceryList] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const request = await instance.get("/");
          setGroceryList(request.data);
        }
        fetchData();
      }, [])

    return ( 
        <section className='section-center'>
        <form className='grocery-form' >
        <h3>grocery bud</h3>
        <div className="form-control">
            <input 
                type="text" 
                className='grocery' 
                placeholder='e.g. eggs' />   
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