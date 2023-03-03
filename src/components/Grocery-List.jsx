import React from 'react';
import './grocery-bud.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Grocery_List({ groceryList, deleteGroceryItem }) {
    return ( <div>
        {
            groceryList.map(item => {

                const {id, name} = item;

                return <article key={ id } className='grocery-item'>
                <p className='title'> { name } </p>
                <div className="btn-container">
                    <button type='button' className="edit-btn">
                    <FaEdit />
                    </button>
                    <button type='button' className="delete-btn" onClick={() => deleteGroceryItem(id)}>
                    <FaTrash /> 
                    </button>
                    
                </div>
            </article>
            })
        }
         
    </div> );
}

export default Grocery_List;
