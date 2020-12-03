import React from 'react';
import {store} from '../App'
import Meneger from '../components/Meneger';
import {connect} from 'react-redux';


class Page_Meneger extends React.PureComponent {

   
          
  render() {


console.log(this.props)
    return (
      <Meneger mode={'meneger'} ordersList = {this.props.orders.data.orders}  />
    );
    
  }

}
    

const mapStateToProps = function (state) {
 
    return {
      orders: state.orders,
    };
    
  };
  
  export default connect(mapStateToProps)(Page_Meneger);

