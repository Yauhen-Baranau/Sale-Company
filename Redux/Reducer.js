import { ORDERS_LOADING, ORDERS_ERROR, ORDERS_SET,ORDER_STATUS_CHANGE, ORDER_DETAILS_CHANGE, COURIER_APPOINT, ADD_NEW_ORDER,REMOVE_ORDER } from './ordersAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null

}

function ordersReducer(state=initState,action) {
  switch (action.type) {

    case ORDERS_LOADING: {
        return {...state, status:1,data:null};
    }

    case ORDERS_ERROR: {
        return {...state, status:2,data:null};
    }

    case ORDERS_SET: {
      return {...state, status:3,data:action.orders};
  }
     
     case ORDER_STATUS_CHANGE: {
       console.log(action.orderObject)
      let arrData = [...state.data.orders]
      let changed = false;
        arrData.forEach((v,i) =>{
           if (v.code===action.orderObject.id){
                if (v.statusCompleted!==action.orderObject.data) {
                  let arObrcopy = {...v, statusCompleted:action.orderObject.data}
                  changed=true
                  arrData[i]=arObrcopy
                }
            }
      })

  if (changed) {
      let newState = {...state,
        data: {...state.data,
        orders: arrData
      }
    }
     return newState
      }
      return state
  }

case ORDER_DETAILS_CHANGE: {
    let oldObj = action.orderObject;
    let arrData = [...state.data.orders]
    let changed = false;
    arrData.forEach( (v,i) => {
        if(v.code===action.orderObject.code){
           if(v.price!==oldObj.price || v.product!==oldObj.product || v.quantity!==oldObj.quantity || v.clientName!==oldObj.clientName || v.adress !== oldObj.adress || v.card!== oldObj.card){
               arrData[i]=oldObj
               changed=true
              }
        }
    })
    let newState = {...state,
       data: {...state.data,
       orders: arrData,
      }
    }
    if (changed) {
      return newState
      }
     return state
  }

case COURIER_APPOINT: {
  
     let arrData = [...state.data.orders]
     let changed = false;
     arrData.forEach( (v,i) => {
        if (v.code===action.orderObject.id){
            if (v.courier!==action.orderObject.courier){
                 let newObj = {...v, courier: action.orderObject.courier==='Не назначен'? null : action.orderObject.courier}
                arrData[i]=newObj
                changed=true
            }
        }
     })
     let newState = {...state,
      data: {...state.data,
      orders: arrData
    }
  }
  if (changed){
    return newState
  }
  return state
}

case ADD_NEW_ORDER: {
   let arrData = [...state.data.orders,action.orderObject ];
    let newState = {...state,
      data: {...state.data,
      orders: arrData
    }
  }
    return newState
  }

  case REMOVE_ORDER: {
   let arrData = [...state.data.orders];
    let removeI = 0;
    arrData.forEach( (v,i)=>{
      if(v.code===action.removeID)
          removeI = i
    })
    arrData.splice(removeI,1)
    let newState = {...state,
      data: {...state.data,
      orders: arrData
    }
  }
  return newState
    
 }
    
    default: return state;
  }
}

export default ordersReducer;