import isoFetch from 'isomorphic-fetch';

import { ordersLoadingAC, ordersErrorAC, ordersSetAC } from "./ordersAC";

function ordersThunkAC(dispatch) {
    // Как и любой action creator, countriesThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function() {
        dispatch( ordersLoadingAC() );
        isoFetch(ajaxHandlerScript, { method: 'post', body: sp })
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
          let dataList = JSON.parse(data.result)
          this.props.dispatch( ordersSetAC(dataList ) ); // переводим раздел orders стора в состояние "ошибка"
          console.log(dataList)
          
         })
        .catch( (error) => {
            console.error(error);
            this.props.dispatch( ordersErrorAC() ); // переводим раздел orders стора в состояние "ошибка"
          })

}
}

export {ordersThunkAC}
