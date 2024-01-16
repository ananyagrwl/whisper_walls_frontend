import {configureStore} from "@reduxjs/toolkit"
import Name from "./Name"

const Store = configureStore({
    reducer: {
        name: Name,
        // token: Token
    }
})

export default Store