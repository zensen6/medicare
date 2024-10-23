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

const frequentList = createSlice({
    name : 'frequentList',
    initialState: [
        { id: 1, name: "종이컵 한 컵", volume: "200mL", checked: true },
        { id: 2, name: "머그컵 한 컵", volume: "350mL", checked: true },
        { id: 3, name: "작은 페트병", volume: "500mL", checked: true },
        { id: 4, name: "큰 페트병", volume: "2L", checked: true }
    ],
    reducers:{
        setFrequentList : (state,action) => {
            state.value = action.payload;
        }
    }
});


const customtList = createSlice({
    name : 'customList',
    initialState: [
        { id: 5, name: "종이컵 1/2 컵", volume: "90mL", checked: false },
        { id: 6, name: "머그컵 1/2 컵", volume: "175mL", checked: false },
        { id: 7, name: "작은 페트병 1/2 병", volume: "250mL", checked: false },
        { id: 8, name: "큰 페트병 1/2 병", volume: "1L", checked: false },
        { id: 9, name: "1회용 봉투컵", volume: "45mL", checked: false },
        { id: 10, name: "커피 라지 한잔", volume: "470mL", checked: false },
        { id: 11, name: "대용량 커피 한잔", volume: "590mL", checked: false },
    ],
    reducers:{
        setFrequentList : (state,action) => {
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
export const {setFrequentList} = frequentList.actions;

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
        frequentList: frequentList.reducer,
    }


});