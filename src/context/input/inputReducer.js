const reducer = (state, action) => {
    switch (action.type) {
        case 'krediTutari': {
            return { ...state, krediTutari: action.payload }
        }
        case 'faizOrani': {
            return { ...state, faizOrani: Number(action.payload) }
        }
        case 'taksitSayisi': {
            return { ...state, taksitSayisi: Number(action.payload) }
        }
        case 'kkdf': {
            return { ...state, kkdf: Number(action.payload) }
        }
        case 'bsmv': {
            return { ...state, bsmv: Number(action.payload) }
        }
        case 'durationType': {
            return { ...state, durationType: String(action.payload) }
        }
        default: {
            return state
        }
    }


}

export default reducer