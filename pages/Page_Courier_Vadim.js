import React from 'react';
import Courier from '../components/Courier';
import {connect} from 'react-redux';


class Page_Courier_Vadim extends React.PureComponent {

   
          
  render() {

    let ordersListForVadim = [];
  
    
    
    if (this.props.orders.data.orders!==null) {
        this.props.orders.data.orders.forEach( v => {
        if (v.courier==="Вадим") {
             ordersListForVadim.push(v)  
        }
       
       })
   
}

    return (
        
        <Courier courierName={'Вадим'} mode={'courier'} ordersList = {ordersListForVadim}  />
    );
    
  }

}
    

const mapStateToProps = function (state) {
 
    return {
      orders: state.orders,
    };
    
  };
  
  export default connect(mapStateToProps)(Page_Courier_Vadim);