import React from 'react';
import PropTypes from 'prop-types';
import './Edit_Meneger.css'
import Fragment from 'render-fragment';
import {myEvents} from './events'




class Edit extends React.PureComponent {

    static propTypes = {
        order: PropTypes.object,
        workMode: PropTypes.number.isRequired,
        newId:PropTypes.number,
    }

    state = { 
        adress: (this.props.workMode===2)? "" : this.props.order.adress,
        card: (this.props.workMode===2)? "" : this.props.order.card,
        clientName: (this.props.workMode===2)? "" : this.props.order.clientName,
        code: (this.props.workMode===2)? this.props.newId : this.props.order.code,
        courier: (this.props.workMode===2)? null : this.props.order.courier,
        price: (this.props.workMode===2)? "" : this.props.order.price,
        product: (this.props.workMode===2)? "" : this.props.order.product,
        quantity: (this.props.workMode===2)? "" : this.props.order.quantity,
        statusCompleted: (this.props.workMode===2)? false : this.props.order.statusCompleted,
      }

            changeV = (EO) => {
                EO=EO||window.event;
               switch ( EO.target.name) {
                    case 'adress':
                        this.setState({adress:EO.target.value})
                     break;
                    case 'card':
                        this.setState({card:EO.target.value})
                      break;
                    case 'courier':
                        this.setState({courier:EO.target.value})
                         break;
                    case 'price':
                        this.setState({price:EO.target.value})
                       break; 
                       case 'clientName':
                        this.setState({clientName:EO.target.value})
                     break;
                     case 'product':
                        this.setState({product:EO.target.value})
                     break;
                     case 'quantity':
                        this.setState({quantity:EO.target.value})
                     break;
                     case 'statusCompleted':
                        this.setState({statusCompleted:EO.target.value})
                     break;
                      }
                }
        
        
                saveChanges =() => {
                   let editedOrder = { 
                        adress: this.state.adress,
                        card: this.state.card==='card'? true : false,
                        clientName: this.state.clientName,
                        code: this.state.code,
                        courier: this.state.courier,
                        price: this.state.price,
                        product: this.state.product,
                        quantity: this.state.quantity,
                        statusCompleted: this.state.statusCompleted
                      }
                      if (this.props.workMode===1){
                        myEvents.emit('dataChange', editedOrder )
                        myEvents.emit('select_WorkMode', 0 )
                      }
                      if (this.props.workMode===2){
                        myEvents.emit('addOrder', editedOrder )
                        myEvents.emit('select_WorkMode', 0 )
                      }
                      
                }

                cencel = () =>{
                  myEvents.emit('select_WorkMode', 0 )
                }
             
         

    render(){
      var invalidPrice = (isNaN(this.state.price) || this.state.price==='') ? false : true
      console.log(invalidPrice)
      var invalid = (this.state.adress!==""&&this.state.clientName!==""&&this.state.price!==""&&this.state.quantity!==""&&this.state.product!=="")? false : true;
        
        return(
<div>

<br/>
         { this.props.workMode===1? // edit
         <Fragment>
            <div> 
                <span className={'fl'}>Номер заказа</span><span name={'code'} onChange={this.changeV}>{this.state.code}</span><br/>
                <span className={'fl'}>Товар</span><input  onChange={this.changeV} name={'product'} type={'text'} defaultValue={this.state.product}/><span className="right">{(this.state.product==="")?" Please, fill the field!":''}</span><br/>
                <span className={'fl'}>Цена</span><input name={'price'} onChange={this.changeV} type={'text'} defaultValue={this.state.price}/><span className="right">{invalidPrice?"":' Введите цену числом'}</span><br/>
                <span className={'fl'}>Количество</span><input name={'quantity'} onChange={this.changeV} type={'number'} defaultValue={this.state.quantity}/><span className="right">{(this.state.quantity==="")?" Please, fill the field!":''}</span><br/>
                <span className={'fl'}>Имя клиента</span><input name={'clientName'} onChange={this.changeV} type={'text'} defaultValue={this.state.clientName}/><span className="right">{(this.state.clientName==="")?" Please, fill the field!":''}</span><br/>
                <span className={'fl'}>Адрес доставки</span><input name={'adress'} onChange={this.changeV} type={'text'} defaultValue={this.state.adress}/><span className="right">{(this.state.adress==="")?" Please, fill the field!":''}</span><br/>
                <span className={'fl'}>Оплата</span><select name={'card'} onChange={this.changeV} defaultValue={this.state.card? 'card' : 'nal'}>
                                                                            <option value={'nal'}>Наличные</option>
                                                                            <option value={'card'}>Карта</option>
                                                                        </select><br/>
                <input disabled={invalid} onClick={this.saveChanges}  type="button" defaultValue="Сохранить"/> 
                <input  type="button" onClick={this.cencel} defaultValue="Отмена"/>
            </div> 
    
          </Fragment> :null
    }
     { this.props.workMode==2 && // add
          <Fragment>
        
            
            <div> 
                <span className={'fl'}>Номер заказа</span><span name={'code'}  onChange={this.changeV}>{this.props.newId}</span><br/>
                <span className={'fl'}>Товар</span><input  onChange={this.changeV} name={'product'} type={'text'} /><span className="right">{(this.state.product==="")?" Please, fill the field!":''}</span><br/>
                <span className={'fl'}>Цена</span><input name={'price'} onChange={this.changeV} type={'text'} /><span className="right">{invalidPrice?"":' Введите цену числом'}</span><br/>
                <span className={'fl'}>Количество</span><input name={'quantity'} onChange={this.changeV} type={'number'} /><span className="right">{(this.state.quantity==="")?" Please, fill the field!":''}</span><br/>
                <span className={'fl'}>Имя клиента</span><input name={'clientName'} onChange={this.changeV} type={'text'} /><span className="right">{(this.state.clientName==="")?" Please, fill the field!":''}</span><br/>
                <span className={'fl'}>Адрес доставки</span><input name={'adress'} onChange={this.changeV} type={'text'} /><span className="right">{(this.state.adress==="")?" Please, fill the field!":''}</span><br/>
                <span className={'fl'}>Оплата</span><select name={'card'} onChange={this.changeV} >
                                                                            <option value={'nal'}>Наличные</option>
                                                                            <option value={'card'}>Карта</option>
                                                                        </select><br/>
                <input disabled={invalid} onClick={this.saveChanges}  type="button" defaultValue="Сохранить"/> 
                <input onClick={this.cencel}  type="button" defaultValue="Отмена"/>
            </div> 
            
            </Fragment>
    }
</div>
        )
    }

}
   


export default Edit;