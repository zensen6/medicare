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
        { name: "종이컵 한 컵", volume: "200" },
        { name: "머그컵 한 컵", volume: "350"  },
        { name: "작은 페트병", volume: "500"  },
        { name: "큰 페트병", volume: "2"  }
    ],
    reducers:{
        setFrequentList : (state,action) => {
            return action.payload;
        }
    }
});


const customList = createSlice({
    name : 'customList',
    initialState: [
        { name: "종이컵 1/2 컵", volume: "90"},
        { name: "머그컵 1/2 컵", volume: "175"},
        { name: "작은 페트병 1/2 병", volume: "250" },
        { name: "큰 페트병 1/2 병", volume: "1" },
        { name: "1회용 봉투컵", volume: "45" },
        { name: "커피 라지 한잔", volume: "470" },
        { name: "대용량 커피 한잔", volume: "590" },
        { name: "커피 라지 두잔", volume: "470"},
        { name: "대용량 커피 두잔", volume: "590" },
        { name: "커피 라지 세잔", volume: "470" },
        { name: "대용량 커피 세잔", volume: "590" },
    
    
    ],
    reducers:{
        setCustomList : (state,action) => {
            return action.payload; // 배열 수정시에는 return이 좋음
        }
    }
});


const selectedList = createSlice({
    name : 'selectedList',
    initialState: [
        { id: 1, name: "종이컵 한 컵", volume: "200mL", checked: true },
        { id: 2, name: "머그컵 한 컵", volume: "350mL", checked: true },
        { id: 3, name: "작은 페트병", volume: "500mL", checked: true },
        { id: 4, name: "큰 페트병", volume: "2L", checked: true }
    ],
    reducers:{
        setSelectedList : (state,action) => {
            return action.payload;
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
export const {setCustomList} = customList.actions;
export const {setSelectedList} = selectedList.actions;

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
        customList: customList.reducer,
        selectedList: selectedList.reducer,
    }


});