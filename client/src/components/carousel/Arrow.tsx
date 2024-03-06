import React from "react";
import Slider from "react-slick";
import './Arrow.css'


export const NextTo:React.FC<any> = (props) => {
    const {className , style , onClick} = props;
    return (
        <div className ={className}
             style ={
                 {
                     ...style
                     ,top: '50%'
                     ,right: '-10px'
                     ,content: ''
                     ,width: '20px' /* 사이즈 */
                     ,height: '20px' /* 사이즈 */
                     ,borderTop: '5px solid #000' /* 선 두께 */
                     ,borderRight: '5px solid #000' /* 선 두께 */
                     ,background: 'transparent'
                     ,transform: 'rotate(45deg)' /* 각도 */
                     ,zIndex : '1'
                 }

             }


             onClick={onClick}></div>
    )
}
export const Prev:React.FC<any> = (props) => {
    const {className , style , onClick} = props;
    return (
        <div className ={className}
             style ={
                 {
                     ...style
                     ,top: '50%'
                     ,left: '-10px'
                     ,content: ''
                     ,width: '20px' /* 사이즈 */
                     ,height: '20px' /* 사이즈 */
                     ,borderTop: '5px solid #000' /* 선 두께 */
                     ,borderRight: '5px solid #000' /* 선 두께 */
                     ,background: 'transparent'
                     ,transform: 'rotate(225deg)' /* 각도 */
                     ,zIndex : '1'
                 }

             }

             onClick={onClick}></div>
    )
}