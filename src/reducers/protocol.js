export default (protocol = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL': 
            return action.payload;
        case 'CREATE': 
            return [...protocol, action.payload];
        case 'UPDATE':
            return protocol.map((protocol) => (protocol._id === action.payload._id ? action.payload : protocol));
        case 'DELETE':
            return protocol.filter((protocol) => protocol._id !== action.protocol);
        default:
            return protocol;

    }
}