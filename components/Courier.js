import React from 'react';
import PropTypes from 'prop-types';
import Order from './Order'
import './Courier.css';



class Courier extends React.PureComponent {

  static PropTypes = {
    ordersList: PropTypes.array.isRequired,
    courierName: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
  }

  state = {
 
    showOrderStats:'all',
  }

  showAll = () => {
    this.setState({showOrderStats:'all'})
  }
  showIncomplete = () =>{
    this.setState({showOrderStats:'Incomplete'})
  }

  showCompleted = () =>{
    this.setState({showOrderStats:'complited'})
  }

 render() {
   var ordersList = this.props.ordersList.map( i => {
      if ( (this.state.showOrderStats==='all') || ((this.state.showOrderStats==='Incomplete')&& (i.statusCompleted!==true)) || ((this.state.showOrderStats==='complited')&&(i.statusCompleted===true)) )
          return <Order mode={this.props.mode} couriers={this.props.couriers} details={i} key = {i.code} />
    });
    
return (

     <div className='courier'>
       <h2>Courier {this.props.courierName} </h2>
       
      
       <br/>
          <h3>Количество заказов: {this.props.ordersList.length} </h3> <br/>
          <button onClick={this.showAll}>Все</button><button onClick={this.showCompleted}>Выполненные</button><button onClick={this.showIncomplete}>Не выполненные</button><br/>
          <ol>
          {ordersList}
          </ol>
        
        <br/>
        
</div>
    );
  }
}

export default Courier;