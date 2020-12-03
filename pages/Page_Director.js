import React from 'react';
import {store} from '../App'
import Logistics from '../components/Logistics';
import Meneger from '..//components/Meneger';
import Courier from '../components/Courier';
import Fragment from 'render-fragment';

import {connect} from 'react-redux';



class Page_Director extends React.PureComponent {

   
          
  render() {

    let ordersListForVadim = [];
    let ordersListForAlex =[];
    if (this.props.orders.data.orders!==null) {
      this.props.orders.data.orders.forEach( v => {
        if (v.courier==="Вадим") {
             ordersListForVadim.push(v)  
        }
        if (v.courier==="Алексей"){
          ordersListForAlex.push(v)
        }
       })
   
}

    return (
        <Fragment>
            <Meneger mode={'meneger'} ordersList = {this.props.orders.data.orders}  />
            <Logistics mode={'logistics'} ordersList = {this.props.orders.data.orders}  />
            <Courier courierName={'Алексей'} mode={'courier'} ordersList = {ordersListForAlex}  />
            <Courier courierName={'Вадим'} mode={'courier'} ordersList = {ordersListForVadim}  /> 
        </Fragment>
    );
    
  }

}
    

const mapStateToProps = function (state) {
 
    return {
      orders: state.orders,
    };
    
  };
  
  export default connect(mapStateToProps)(Page_Director);