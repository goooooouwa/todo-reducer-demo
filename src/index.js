const redux = require('redux');

function rootReducer(state = {}, action) {
    return {
        todos: todosReducer(state.todos, action),
        filter: filterReducer(state.filter, action)
    };
}

function filterReducer(state = 'showAll', action) {
    // Example action:
    // {
    //     type: 'CHANGE_FILTER',
    //     filter: 'showCompleted' // or 'showAll', 'showActive'
    // }

    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.filter;
        default:
            return state;
    }
}

function todosReducer(state = [], action) {
    // example action:
    // {
    //     type: 'ADD_TODO',
    //     todo: {
    //         text: 'task 3',
    //         completed: false
    //     }
    // }

    switch (action.type) {
        case 'ADD_TODO':
            return state.concat(action.todo);
        default:
            return state;
    }
}

function main() {
    // Setup: create a store
    let store = redux.createStore(rootReducer);

    // Setup: subscribe the store
    store.subscribe(() => {
        let state = store.getState();
        let todos;
        switch (state.filter) {
            case 'showAll':
                todos = state.todos;
                break;
            case 'showActive':
                todos = state.todos.filter(function (todo) {
                    return !todo.completed;
                });
                break;
            case 'showCompleted':
                todos = state.todos.filter(function (todo) {
                    return todo.completed;
                });
                break;
            default:
                todos = state.todos;
        }

        console.log(`filter: ${state.filter}
todos: ${JSON.stringify(todos)}`);
    })



    console.log('dispatch DO_SOMETHING');
    store.dispatch({
        type: 'DO_SOMETHING',
        text: 'hello'
    });

    console.log('dispatch CHANGE_FILTER');
    store.dispatch({
        type: 'CHANGE_FILTER',
        filter: 'showActive'
    });

    console.log('dispatch ADD_TODO');
    store.dispatch({
        type: 'ADD_TODO',
        todo: {
            text: 'some task',
            completed: false
        }
    });

    console.log('dispatch CHANGE_FILTER');
    store.dispatch({
        type: 'CHANGE_FILTER',
        filter: 'showCompleted'
    });
}

main();