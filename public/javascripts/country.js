export class Country {

    constructor(id, name, tabTranslation, tabArticles) {
        this.id = id; // id utilisé dans la map
        this.name = name; // nom du pays (utilisé pour le filtre)
        this.tabTranslation = tabTranslation; // données pour la requete dans l'api
        this.tabArticles = tabArticles; // tableau par années des articles
    }

  }
