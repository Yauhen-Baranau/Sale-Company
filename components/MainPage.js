import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { ordersLoadingAC, ordersErrorAC, ordersSetAC,ordersStatusChabgeAC, orderDetailsChabgeAC,couirierAppointAC, addOrderAC, deleteOrderAC } from "../Redux/ordersAC";
import {myEvents} from './events'
import {store} from '../App'
import {saveToServer} from '../scripts'
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './MainPage.css';
import PagesLinks from '../pages/PagesLinks';
import Page_Meneger from '../pages/Page_Manager'
import Page_Logistics from '../pages/Page_Logistics'
import Page_Director from '../pages/Page_Director';
import Page_Courier_Alex from '../pages/Page_Courier_Alex';
import Page_Courier_Vadim from '../pages/Page_Courier_Vadim';




class MainPage extends React.PureComponent {

  static propTypes = {
    orders: PropTypes.object.isRequired,
  }

  state = {
    orders: null,
  }

  

  componentDidMount = () => {
this.props.dispatch( ordersLoadingAC() ); // переводим раздел orders стора в состояние "загружается"

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
  let sp = new URLSearchParams();
  sp.append('f', 'READ');
  sp.append('n', 'BARANAU_FD3');

  fetch(ajaxHandlerScript, { method: 'post', body: sp })
        .then( (response) => { //HTTP-ответ
            if (!response.ok) {
                let Err=new Error("fetch error " + response.status);
                Err.userMessage="Ошибка связи";
                throw Err;
            }
            else
                return response.json();
        })
        .then( (data) => {
          console.log('читаю строку...')
          let dataList = JSON.parse(data.result)
          this.props.dispatch( ordersSetAC(dataList ) ); // переводим раздел orders стора в состояние "ошибка"
         
          
         })
        .catch( (error) => {
            console.error(error);
            this.props.dispatch( ordersErrorAC() ); // переводим раздел orders стора в состояние "ошибка"
          })

        myEvents.addListener('dataSave', this.dataSave)
        myEvents.addListener('dataChange', this.dataChange)
        myEvents.addListener('courierChange', this.courierChange)
        myEvents.addListener('addOrder', this.orderAdd)
        myEvents.addListener('removeOrder', this.removeOrder)
      }

      componentWillUnmount = () => {
        myEvents.removeListener('dataSave', this.dataSave)
        myEvents.removeListener('dataChange', this.dataChange)
        myEvents.removeListener('courierChange', this.courierChange)
        myEvents.removeListener('addOrder', this.orderAdd)
        myEvents.addListener('removeOrder', this.removeOrder)
      }

      removeOrder = (removeID) => {
           this.props.dispatch(deleteOrderAC(removeID))
           var obj = store.getState()
           saveToServer(obj.orders.data)
      }

      orderAdd = (newOrder) =>{

        this.props.dispatch(addOrderAC(newOrder))
        var obj = store.getState()
        saveToServer(obj.orders.data)
      }

      courierChange = (courier) => {
          this.props.dispatch(couirierAppointAC(courier))
          var obj = store.getState()
          saveToServer(obj.orders.data)
      }
 
      dataChange = (changeableOrder) => {
        this.props.dispatch(orderDetailsChabgeAC(changeableOrder))
        var obj = store.getState()
        saveToServer(obj.orders.data)

      }
     
      dataSave = (data, id) => {
      let changes = {id:id, data:data}
      this.props.dispatch(ordersStatusChabgeAC(changes));
      var obj = store.getState()
      saveToServer(obj.orders.data)
        }

render() {
   
    if ( this.props.orders.status<=1 )
    return "загрузка данных...";

  if ( this.props.orders.status===2 )
    return "ошибка загрузки данных";
   return (


    <BrowserRouter>
   <div className='companyName'>Sale Company</div>
        <PagesLinks/>
            <Route path="/director" exact component={Page_Director}/>
            <Route path="/meneger" component={Page_Meneger}/>
            <Route path="/logistics" component={Page_Logistics}/>
            <Route path="/courier_Alex" component={Page_Courier_Alex}/>
            <Route path="/courier_Vadim" component={Page_Courier_Vadim}/>
    </BrowserRouter>
    );

  

}
}

const mapStateToProps = function (state) {
 
  return {
    orders: state.orders,
  };
  
};

export default connect(mapStateToProps)(MainPage);

