import React from 'react'
import PropTypes from 'prop-types'
import Order from './Order'
import Edit from './Edit_Meneger'
import {myEvents} from './events'
import './Meneger.css'



class Meneger extends React.PureComponent {

  static PropTypes = {
    ordersList: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
  }

  state = {
    workMode:0,
    selected_id: null,
    selected_order:null,
    newId: null,
  }


  componentDidMount = () => {
    myEvents.addListener('select_ID_forEdit', this.idSelect)
    myEvents.addListener('select_WorkMode', this.workModeSelect)

  }
  componentWillUnmount = () =>{
    myEvents.removeListener('select_ID_forEdit', this.idSelect)
    myEvents.removeListener('select_WorkMode', this.workModeSelect)
  }

  workModeSelect = (mode) =>{
          this.setState({workMode:mode})
          if (mode===2){
            let count = this.props.ordersList.sort().map( v =>
              v.code
          )
          this.setState({newId:(count[count.length-1])+1})
         
          }
  }

idSelect = (id) => {
  this.setState({workMode:1})
  this.setState({selected_id:id})
      
       this.props.ordersList.forEach( (v)=> {
           if (v.code===id)
            this.setState({selected_order:v})
       })
    }
    setWorkModetoAdd = () =>{
      myEvents.emit('select_WorkMode', 2 )
  }


 

 render() {
    
    var ordersList = this.props.ordersList.map( i => {
          return <Order mode={this.props.mode} couriers={this.props.couriers} details={i} key = {i.code} />
    });
  
    return (
   <div>
      <h2>Manager Department</h2>
      <br/>
      {this.state.workMode===0 &&
        <button className='saveBtn' onClick={this.setWorkModetoAdd}>Принять заказ</button>
      }
     
     <br/>
       {this.state.workMode>0 &&
        <Edit newId={this.state.newId} workMode={this.state.workMode} key={this.state.selected_id} order={this.state.selected_order}/>
         }
       <br/>
        <table>
          <tbody>
          <tr><th>номер заказа</th><th>товар</th><th>цена</th><th>количество</th><th>имя клиента</th><th>адрес доставки</th><th>оплата</th><th>статус</th><th>редактировать</th><th>удалить</th></tr>
          {ordersList}
          </tbody>
        </table>
  </div>
    );
  }
}

export default Meneger;