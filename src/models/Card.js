import Api from "../controllers/Api.js";

class Card{


    static async formatObject(){
        let data = await Api.getAPI()
        
        data.products.forEach(elem => {
            this.configCard(elem)
        })
    }

    static async reviewSelect(number){
        return `./assents/classificacoes/${number}.png`
    }

    static async imgSelect(number){
        return `https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${number}/Image.png`
    }

    static async shouldPromotion(boolean, obj){
        if(boolean){
            return [obj.productPromotionPrice, obj.productPrice]
        }
        else{
            return [obj.productPrice]
        }
    }

    static async configCard(obj){

        let {id, productName, price, promotionStatus, reviews} = obj

        let formatObj = {
            img: await this.imgSelect(id),
            name: productName,
            price: await this.shouldPromotion(promotionStatus, price),
            reviewsImg: await this.reviewSelect(reviews)
        }

        this.createCard(formatObj)
    }

    static async createCard(obj){
        const main = document.getElementsByTagName('main')

        let {img, name, price, reviewsImg} = obj

        const card = document.createElement('div')
        card.classList.add('card')

        card.innerHTML = `
        <figure class="card__img">
        <img src=${img} alt="">
        </figure>

        <figure class="card__classificacao">
        <img src=${reviewsImg} alt="">
        </figure>

        <span class="card__descricao">
        ${name}
        </span>
        `

        if(price.length > 1){
            card.innerHTML += `
            <div class="card__preco">
            <p class="card__preco--card__preco--newPrice">Por R$${price[0]}</p>
            <p class="card__preco--oldPrice">De R$${price[1]}</p>
            </div>
    
            <div class="card__button">
            <button>Comprar</button>
            </div>
            `
        }
        else{
            card.innerHTML += `
            <div class="card__preco">
            <p class="card__preco--card__preco--newPrice">Por R$${price[0]}</p>
            </div>
    
            <div class="card__button">
            <button>Comprar</button>
            </div>
            `
        }

        main[0].appendChild(card)
    }
}

export default Card 