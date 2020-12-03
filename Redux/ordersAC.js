const ORDERS_LOADING='ORDERS_LOADING';
const ORDERS_ERROR='ORDERS_ERROR';
const ORDERS_SET='ORDERS_SET';
const ORDER_STATUS_CHANGE='ORDER_STATUS_CHANGE';
const ORDER_DETAILS_CHANGE='ORDER_DETAILS_CHANGE';
const COURIER_APPOINT='COURIER_APPOINT';
const ADD_NEW_ORDER ='ADD_NEW_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';

const ordersLoadingAC=function() {
  return {
    type: ORDERS_LOADING,
  };
}

const ordersErrorAC=function() {
  return {
    type: ORDERS_ERROR,
  };
}

const ordersSetAC=function(orders) {
  return {
    type: ORDERS_SET,
    orders:orders,
  };
}

const ordersStatusChabgeAC=function(changes) {
  return {
    type: ORDER_STATUS_CHANGE,
    orderObject:changes,
  };
}

const orderDetailsChabgeAC=function(orderChanged) {
  return {
    type: ORDER_DETAILS_CHANGE,
    orderObject:orderChanged,
  };
}

const couirierAppointAC=function(courier) {
  return {
    type: COURIER_APPOINT,
    orderObject:courier,
  };
}

const addOrderAC=function(newOrder) {
  return {
    type: ADD_NEW_ORDER,
    orderObject:newOrder,
  };
}

const deleteOrderAC=function(removeOrderID){
  return {
     type: REMOVE_ORDER,
     removeID: removeOrderID,
  };
}

addOrderAC

export {
  ordersLoadingAC,ORDERS_LOADING,
  ordersErrorAC,ORDERS_ERROR,
  ordersSetAC,ORDERS_SET,
  ordersStatusChabgeAC,ORDER_STATUS_CHANGE,
  orderDetailsChabgeAC,ORDER_DETAILS_CHANGE,
  couirierAppointAC,COURIER_APPOINT,
  addOrderAC,ADD_NEW_ORDER,
  deleteOrderAC,REMOVE_ORDER,
}
