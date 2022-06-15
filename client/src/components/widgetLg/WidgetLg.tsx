import React from "react";
import './widgetLg.css'
import Button from '@mui/material/Button';


export default function WidgetLg(){
    const Button = ( {type} : any ) =>{
        return <button className={'widgetLgButton '+ type}>{type}</button>
    }
    return(
        <div className="widgetLg"> 
            <h3 className="widgetLgTitle">Latest transacitions</h3>
            <table className="widgetLgTable">
                <thead>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img 
                                src="https://t1.daumcdn.net/cfile/blog/202EBA4C4D7624F041?original"
                                alt=""
                                className="widgetLgImg"
                            />
                            <span className="widgetLgName">Susan Carol</span>
                        </td>
                        <td className="widgetLgDate">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type='Approved'/>
                        </td>
                    </tr>

                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img 
                                src="https://t1.daumcdn.net/cfile/blog/202EBA4C4D7624F041?original"
                                alt=""
                                className="widgetLgImg"
                            />
                            <span className="widgetLgName">Susan Carol</span>
                        </td>
                        <td className="widgetLgDate">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type='Declined'/>
                        </td>
                    </tr>     
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img 
                                src="https://t1.daumcdn.net/cfile/blog/202EBA4C4D7624F041?original"
                                alt=""
                                className="widgetLgImg"
                            />
                            <span className="widgetLgName">Susan Carol</span>
                        </td>
                        <td className="widgetLgDate">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type='Panding'/>
                        </td>
                    </tr>  
                
                </tbody>
                             
            </table>
        </div>
    )
}