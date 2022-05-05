class Api{

    static async getAPI(){
        let url = 'https://m2-kenzie-shop.herokuapp.com/products'
        let response = await fetch(url)
        let tratedResponde = await response.json()
        return tratedResponde
    }

}

export default Api