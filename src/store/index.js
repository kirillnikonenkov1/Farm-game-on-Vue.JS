import controler from "../components/controller/matterList.js"


let as = {
    state: {
    },
    getters: {
        
    },
    mutations: {
        increment(state, payload) {
            state[payload.item].amount += payload.quantity;
        },
        decrease(state, payload) {
            state[payload.item].amount -= payload.quantity;
        },
    }
} 

let test = Object.values(controler)

for (let i = 0; i < test.length; i++) {
    for (let j = 0; j < test[i].length; j++) {
        as.state[test[i][j]] = {
            amount: 0,
        };
    }
}

export default as;
 