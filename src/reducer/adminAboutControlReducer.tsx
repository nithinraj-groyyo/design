export interface Client {
  name: string;
  logo: string | null;
  file: File | null;
}

export interface AboutUsState {
  aboutContent: string;
  clients: Client[];
  editAboutPage: boolean;
}

export const aboutUsInitialState: AboutUsState = {
  aboutContent: '',
  clients: [],
  editAboutPage: false,
};

type AboutUsAction =
  | { type: 'SET_ABOUT_CONTENT'; payload: string }
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'ADD_CLIENT' }
  | { type: 'DELETE_CLIENT'; index: number }
  | { type: 'UPDATE_CLIENT_NAME'; index: number; name: string }
  | { type: 'UPDATE_CLIENT_LOGO'; index: number; logo: string; file: File }
  | { type: 'TOGGLE_EDIT_PAGE' };

export const aboutUsReducer = (
  state: AboutUsState,
  action: AboutUsAction
): AboutUsState => {
  switch (action.type) {
      case 'SET_ABOUT_CONTENT':
          return { ...state, aboutContent: action.payload };

      case 'SET_CLIENTS':
          return { ...state, clients: action.payload };

      case 'ADD_CLIENT':
          return {
              ...state,
              clients: [...state.clients, { name: '', logo: null, file: null }],
          };

      case 'DELETE_CLIENT':
          return {
              ...state,
              clients: state.clients.filter((_, i) => i !== action.index),
          };

      case 'UPDATE_CLIENT_NAME':
          const updatedClientsForName = [...state.clients];
          updatedClientsForName[action.index].name = action.name;
          return { ...state, clients: updatedClientsForName };

      case 'UPDATE_CLIENT_LOGO':
          const updatedClientsForLogo = [...state.clients];
          updatedClientsForLogo[action.index].logo = action.logo;
          updatedClientsForLogo[action.index].file = action.file;
          return { ...state, clients: updatedClientsForLogo };

      case 'TOGGLE_EDIT_PAGE':
          return { ...state, editAboutPage: !state.editAboutPage };

      default:
          return state;
  }
};
