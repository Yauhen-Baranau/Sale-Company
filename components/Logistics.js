import React from 'react';
import PropTypes from 'prop-types';
import Order from './Order'

import './Logistics.css';

class Logistics extends React.PureComponent {

  static PropTypes = {
    ordersList: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
  }

  state = {
    ordersList: this.props.ordersList,
    orderStatus:'all',
  }

  showAll = () =>{
     this.setState({orderStatus:'all'})
  }

  showAssigned = () =>{
      this.setState({orderStatus:'assigned'})
  }

  showNotAssigned = () =>{
    this.setState({orderStatus:'notAssigned'})
  }

 render() {
    console.log('Logistics rendered')

  

    var ordersList = this.props.ordersList.map( i => {
      if ( (this.state.orderStatus==='all') || ((this.state.orderStatus==='notAssigned')&& (i.courier===null)) || ((this.state.orderStatus==='assigned')&&(i.courier!==null)) )
          return <Order mode={this.props.mode}  details={i} key = {i.code} />
    });



   return (

     <div>
       <h2>Logistics Department</h2>
       <div><button onClick={this.showAll}>Все заказы</button><button onClick={this.showAssigned}>Назначенные</button><button onClick={this.showNotAssigned}>Не назначенные</button></div>
        <br/>
        <table>
          <tbody>
          <tr><th>номер заказа</th><th>товар</th><th>количество</th><th>адрес доставки</th><th>курьер</th><th>статус</th></tr>
          {ordersList}
          </tbody>
        </table>
        <br/>
        
        <hr/>
    </div>
    );
  }
}

export default Logistics;
