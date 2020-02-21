import createPieceOfState, {requestTypes} from './create';
const [createAction, createReducer] = createPieceOfState();

const defaultState = {
  phone: '+375',
  user: null,
  loading: null,
};

export const changePhone = createAction({
  type: 'CHANGE_PHONE',
  onStart: (state, action) => ({
    ...state,
    phone: action.payload.phone,
  }),
});

export const tryToSignIn = createAction({
  type: 'TRY_TO_SIGN_IN',
  requestType: requestTypes.REQUEST,
  requestConfig: ({phone, token}) => ({
    url: 'auth/is-user-signed-in',
    method: 'post',
    data: {
      phone,
      token,
    },
  }),
  onStart: (state, action) => ({
    ...state,
    loading: true,
  }),
  onSuccess: (state, action) => ({
    ...state,
    user: action.response,
    loading: false,
    phone: defaultState.phone,
  }),
  onFailure: (state, action) => ({
    ...state,
    loading: false,
  }),
});

export const verifySmsCode = createAction({
  type: 'VERIFY_CODE',
  requestType: requestTypes.REQUEST,
  requestConfig: ({phone, smsCode}) => ({
    url: 'auth/verify-code',
    method: 'post',
    data: {
      phone,
      smsCode,
    },
  }),
  onStart: (state, action) => ({
    ...state,
    loading: true,
  }),
  onSuccess: (state, action) => ({
    ...state,
    user: action.response,
    loading: false,
  }),
  onFailure: (state, action) => ({
    ...state,
    loading: false,
  }),
});

export default createReducer(defaultState);
