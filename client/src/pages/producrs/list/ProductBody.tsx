
import React, { useEffect, useState ,useContext} from 'react';

import {ProductProps} from 'src/pages/producrs/list/ProductProps'
import 'src/pages/producrs/list/ProductBody.css'



const ProductBody:React.FC<ProductProps> = (props) => {


    return (

        <div className='home'>
            <div className='homeWidgets'>
                <div className="homeCard">
                    <img src="https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg" />

                </div>
            </div>
        </div>
    )
} 
export default ProductBody