import React from 'react';
import PropTypes from 'prop-types';
import './Order.css';
import Fragment from 'render-fragment';
import {myEvents} from './events'


class Order extends React.PureComponent {

  static PropTypes = {
    details: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
  }

  state = {
     showModeCourier: false,
  }

  
setShowModeCourier = () => {
    if (!this.state.showModeCourier){
      this.setState({showModeCourier: true})
    } else {
      this.setState({showModeCourier: false})
    }
  }

  refValue={value:null}
  ref = (ref) => {
    if ( ref!== null){
       this.refValue.value=ref
    }
  }

  saveValue = () => {
   if ( this.refValue.value.value === '0'){
      myEvents.emit('dataSave', false, this.props.details.code )
    }
    
    if (this.refValue.value.value==='1'){
      myEvents.emit('dataSave', true, this.props.details.code )
    }
  }

 showEditOrder = () =>{
  myEvents.emit('select_ID_forEdit', this.props.details.code )
 }

 
 changedCourierRef = {
       courier: null
  }

refChanged  = (ref) => {
   if (ref!==null)
 this.changedCourierRef.courier= ref
 
}

startChanging = () =>{
  let courier = {
      courier:  this.changedCourierRef.courier.value,
      id: this.props.details.code
    } 
  myEvents.emit('courierChange', courier)
}

removeOrder = () => {
       myEvents.emit('removeOrder', this.props.details.code)
  }



  render(){
  
    let orderStatus = (this.props.details.statusCompleted);
    let stringOrderStatus = (orderStatus)? 'Выполнен' : 'не выполнен';
    let ClassNameOrderStatus = (orderStatus)? 'complited': 'incompiled';

    let couriers = ['Вадим','Алексей','Не назначен'];
    let select = <select onChange={this.startChanging} ref={this.refChanged} className={(this.props.details.courier===null)? null : 'appointed'} defaultValue={ (this.props.details.courier===null)? 'Не назначен' : this.props.details.courier }>
                  {couriers.map( (v,i) => { return (
                      <option value={v} key={i}>{v}</option>
                  )
                    })}
                </select>
return(

<Fragment>
    {this.props.mode==='meneger' &&
    <tr>
    <td aria-label="Номер заказа">{this.props.details.code}</td>
    <td aria-label="Товар">{this.props.details.product}</td>
    <td aria-label="Цена">{this.props.details.price+' $'}</td>
    <td aria-label="Количество">{this.props.details.quantity}</td>
    <td aria-label="Имя клиента">{this.props.details.clientName}</td>
    <td aria-label="Адрес">{this.props.details.adress}</td>
    <td aria-label="Оплата">{this.props.details.card? 'Карта' : 'Наличные'}</td>
    <td className={ClassNameOrderStatus}>{stringOrderStatus}</td>
    <td><button  onClick={this.showEditOrder}>Редактировать</button></td>
    <td><button onClick={this.removeOrder}>Удалить</button></td>
   </tr> 
    }

{this.props.mode==='logistics' &&
    <tr>
    <td aria-label="Номер заказа">{this.props.details.code}</td>
    <td aria-label="Товар">{this.props.details.product}</td>
    <td aria-label="Количество">{this.props.details.quantity}</td>
    <td aria-label="Адрес доставки">{this.props.details.adress}</td>
    <td aria-label="Курьер">{select}</td>
    <td aria-label="Статус" className={ClassNameOrderStatus}>{stringOrderStatus}</td>
  </tr> 

}

{this.props.mode==='courier' &&
   <Fragment>
     <li>
  <b>Адресс досатвки: </b> {this.props.details.adress} <b>Имя клиента:</b> {this.props.details.clientName} <span className={ClassNameOrderStatus}>{stringOrderStatus}</span> <button onClick={this.setShowModeCourier}>{(this.state.showModeCourier)?'Скрыть':'Детали'}</button> <br/>
    </li>
    { (this.state.showModeCourier)?
    <div>
    <br/>
    <b>Номер заявки:</b> {this.props.details.code} <br/>
    <b>Товар:</b> {this.props.details.product}  <br/>
    <b>Cумма за еденицу:</b> {this.props.details.price+' $'} <br/>
    <b>Количесвто:</b> {this.props.details.quantity}<br/>
    <b>Cумма:</b> {(this.props.details.price*this.props.details.quantity)+' $'} <br/>
    <b>Оплата:</b> {this.props.details.card? 'Карта' : 'Наличные'} <br/>

    <select defaultValue={orderStatus? 1 : 0} ref={this.ref}>
    <option value={1}>Выполнен</option>
    <option value={0}>Не Выполнен</option>
    
    </select>

   <button onClick={this.saveValue}>сохранить</button>
    </div> : null
  }
 
   </Fragment>

    }

</Fragment>
  )
}
 

}

export default Order;