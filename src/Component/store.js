import {configureStore, createSlice} from '@reduxjs/toolkit'


const yes = createSlice({
    name : 'isYes',
    initialState: [false],
    reducers:{
        changeState(prevState){
            return !prevState;
        }
    }
});


const date = createSlice({
    name : 'date',
    initialState: {
        value : ''
    },
    reducers:{
        setDate : (state, action) => {
            state.value = action.payload;
        }
    }
});


const time = createSlice({
    name : 'time',
    initialState: {
        value : ''
    },
    reducers:{
        setTimeRedux : (state, action) => {
            state.value = action.payload;
        }
    }
});

const water = createSlice({
    name : 'water',
    initialState: {
        value : 0,
    },
    reducers:{
        setWater : (state, action) => {
            state.value = action.payload;
        }
    }
});


const pees = createSlice({
    name : 'peess',
    initialState: {
        value : 0,
    },
    reducers:{
        setPees : (state, action) => {
            state.value = action.payload;
        }
    }
});

const yo = createSlice({
    name : 'yo',
    initialState: {
        value : 0,
    },
    reducers:{
        setYo : (state, action) => {
            state.value = action.payload;
        }
    }
});

const silgeum = createSlice({
    name : 'silgeum',
    initialState: {
        value : 'N',
    },
    reducers:{
        setSilgeum : (state, action) => {
            state.value = action.payload;
        }
    }
});

const weird = createSlice({
    name : 'weird',
    initialState: {
        value : '',
    },
    reducers:{
        setWeird : (state, action) => {
            state.value = action.payload;
        }
    }
});


const url = createSlice({
    name : 'url',
    initialState: {
        value : ''
    },
    reducers:{
        setUrl : (state, action) => {
            state.value = action.payload;
        }
    }
});

const queue = createSlice({
    name : 'queue',
    initialState: {
        queue : [],
    },
    reducers:{
        setQueue : (state, action) => {
            state.value = action.payload;
        },
        enqueue : (state, action) => {
            state.queue.push(action.payload);
        },
        dequeue : (state, action) => {
            const idx = action.payload;
            const index = state.queue.indexOf(idx);
            if(index !== -1){
                state.queue.splice(index,1);
            }
            
        }
    }
});

const popup = createSlice({
    name : 'popup',
    initialState: {
        value : false
    },
    reducers:{
        setPopUp : (state, action) => {
            state.value = action.payload;
        }
    }
});


export const {changeState} = yes.actions;
export const {setDate} = date.actions;
export const {setTimeRedux} = time.actions;
export const {setWater} = water.actions;
export const {setYo} = yo.actions;
export const {setSilgeum} = silgeum.actions;
export const {setWeird} = weird.actions;
export const {setUrl} = url.actions;
export const {setPees} = pees.actions;
export const {setQueue, enqueue, dequeue} = queue.actions;
export const {setPopUp} = popup.actions;


export default configureStore({

    reducer:{
        isYes : yes.reducer,
        date : date.reducer,
        time : time.reducer,
        water : water.reducer,
        yo : yo.reducer,
        silgeum : silgeum.reducer,
        weird : weird.reducer,
        url : url.reducer,
        pees : pees.reducer,
        queue : queue.reducer,
        popup : popup.reducer,

    }


});