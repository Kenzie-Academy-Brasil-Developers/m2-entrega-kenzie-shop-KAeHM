import Card from "./models/Card.js";

class app{

    static async init(){
        await Card.formatObject()
    } 
}

app.init()
