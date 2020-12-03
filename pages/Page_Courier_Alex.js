import React from 'react';
import Courier from '../components/Courier';
import {connect} from 'react-redux';


class Page_Courier_Alex extends React.PureComponent {

   
          
  render() {

    let ordersListForAlex =[];

    if (this.props.orders.data.orders!==null) {
        this.props.orders.data.orders.forEach( v => {
        
          if (v.courier==="Алексей"){
            ordersListForAlex.push(v)
          }
         })
     
  }


    return (
        
        <Courier courierName={'Алексей'} mode={'courier'} ordersList = {ordersListForAlex}  />
    );
    
  }

}
    

const mapStateToProps = function (state) {
 
    return {
      orders: state.orders,
    };
    
  };
  
  export default connect(mapStateToProps)(Page_Courier_Alex);