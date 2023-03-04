import React from 'react';
import './grocery-bud.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Grocery_List({ groceryList, deleteGroceryItem, editGroceryItem }) {
    return ( <div>
        {
            groceryList.map(item => {

                const {id, name} = item;

                return <article key={ id } className='grocery-item'>
                <p className='title'> { name } </p>
                <div className="btn-container">
                    <button type='button' className="edit-btn" onClick={() => editGroceryItem(id)}>
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
