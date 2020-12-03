import React from 'react';
import {store} from '../App'
import Logistics from '../components/Logistics';
import {connect} from 'react-redux';


class Page_Logistics extends React.PureComponent {

   
          
  render() {



    return (
        <Logistics mode={'logistics'} ordersList = {this.props.orders.data.orders}  />
    );
    
  }

}
    

const mapStateToProps = function (state) {
 
    return {
      orders: state.orders,
    };
    
  };
  
  export default connect(mapStateToProps)(Page_Logistics);