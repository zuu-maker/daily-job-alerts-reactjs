export const initialState = {
     currentUser: null,
     authUser: null,
     favourites: [],
     searchList: [],
     searchListOther: [],
     show:true,
     messageName:"",
     notificationsTotal:0
};
      
function reducer(state, action){
  console.log(action)
  switch(action.type){
     case "LOG_IN":{
     console.log(action.payload);
     return {
       ...state,
       currentUser:action.payload
     };
     }
     case "AUTH_USER":{
      console.log(action.payload);
      return {
        ...state,
        auth:action.payload
      };
      }
      case "ADD_T0_FAVOURITES":{
        console.log(action.payload);
        return {
          ...state,
          searchList:[...state.searchList, action.payload]
        };
        }
        case "SET_SEARCH":{
          console.log(action.payload);
          return {
            ...state,
            searchList:[...state.searchList, action.payload]
          };
          }
          case "SET_SHOW":{
            console.log(action.payload);
            return {
              ...state,
              show:action.payload
            };
          }
          case "SET_MESSAGE_NAME":{
            console.log(action.payload);
            return {
              ...state,
              messageName:action.payload
            };
          }
          case "SET_SEARCHOTHER":{
            console.log(action.payload);
            return {
              ...state,
              searchListOther:[...state.searchListOther, action.payload]
          };
          }
          case "RESET":{
            console.log(action.payload);
            return {
              ...state,
              searchListOther:action.payload,
              searchList:action.payload,
          };
          }
      default:
          return state;
  }
}

export default reducer;