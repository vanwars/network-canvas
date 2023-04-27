export default (stages = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL': 
            return action.payload;
        case 'CREATE': 
            return [...stages, action.payload];
        case 'UPDATE':
            return stages.map((stage) => (stage._id === action.payload._id ? action.payload : stage));
        case 'DELETE':
            return stages.filter((stage) => stage._id !== action.payload);
        default:
            return stages;
    }
}