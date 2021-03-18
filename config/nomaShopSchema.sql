  

  CREATE TABLE roles (
  id SERIAL ,
  code varchar(255) unique not null,
  libelle varchar(50)  NOT NULL ,
  type varchar(50)  NOT NULL ,
  PRIMARY KEY (id)
);

  
  CREATE TABLE users (
  id SERIAL,
  code varchar(255) unique not null,
  email varchar(50)  NOT NULL ,  
  username varchar(50)  NOT NULL ,
  password varchar(255)  NOT NULL ,
  name varchar(50)  NOT NULL ,
  lastname varchar(50)  NOT NULL ,
  gender varchar(50)  NOT NULL ,
  birthday date  NOT NULL ,
  telephone varchar(50),
  adresse varchar(50)  NOT NULL ,
  image varchar(50),
  _type varchar(50),
  abonnement_newsletters varchar(50),
  role_code varchar(255),
  created_at date,
  updated_at date,
  PRIMARY KEY (id),
  FOREIGN KEY (role_code) references roles(code)
);

CREATE TABLE fournisseurs (
    id SERIAL,
    code varchar(255) unique not null ,
    libelle varchar(50)  NOT NULL ,
    PRIMARY KEY (id)
  );

  CREATE TABLE marques (
    id SERIAL,
    code varchar(255) UNIQUE NOT NULL,
    libelle varchar(50)  NOT NULL ,
    PRIMARY KEY (id)
  );


CREATE TABLE permissions (
  id SERIAL,
  code varchar(255) unique not null,
  role_code varchar(255) ,
  action varchar(50)  NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (role_code) references roles(code)
);

CREATE TABLE gammes (
    id SERIAL,
    code varchar(255) unique not null,
    libelle varchar(50) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE familles (
    id SERIAL,
    code varchar(255)unique not null,
    libelle varchar(50)  NOT NULL ,
    couleurFamille varchar(50),

    gamme_code varchar(255)  NOT NULL ,
    PRIMARY KEY (id),
    FOREIGN KEY(gamme_code) references gammes(code)

  );

  CREATE TABLE sousfamilles (
    id SERIAL,
    code varchar(255)  UNIQUE NOT NULL,
    libelle varchar(50)  NOT NULL ,
    couleurSousFamille varchar(50),
    prix_ht float,
    prix_ttc float,
    tva float,
    
    famille_code varchar(255)  NOT NULL ,
    PRIMARY KEY (id),
    FOREIGN KEY(famille_code) references familles(code)

  );

  CREATE TABLE produits (
    id SERIAL,
    code varchar(255) UNIQUE NOT NULL,
    code_a_barre varchar(255)  NOT NULL ,
    libelle varchar(50)  NOT NULL ,
    image varchar(255),
    collisage varchar(255)  NOT NULL ,
    ordre varchar(255),
    tva float,
    prix_achat_ht float,
    prix_achat_ttc float,
    prix_vente_ht float,
    prix_vente_ttc float NOT NULL ,

    famille_code varchar(255),
    gamme_code varchar(255),
    fournisseur_code varchar(255)  NOT NULL ,
    marque_code varchar(255)  NOT NULL ,
    sousFamille_code varchar(255)  NOT NULL ,
    PRIMARY KEY (id),
    FOREIGN KEY(fournisseur_code) references fournisseurs(code),
    FOREIGN KEY(marque_code) references marques(code),
    FOREIGN KEY(sousFamille_code) references sousfamilles(code),
    FOREIGN KEY (famille_code) references familles(code),
    FOREIGN KEY (gamme_code) references gammes(code)

  );

   CREATE TABLE groupes (
    id SERIAL,
    code varchar(255) unique not null,

    produit_code varchar(255)  NOT NULL ,
    PRIMARY KEY (id),
    FOREIGN KEY(produit_code) references produits(code)    
  );
   

  CREATE TYPE type_achats AS ENUM ('retour', 'demandeRetour','commande','commandeV'); --achats


  CREATE TABLE achats (
    id SERIAL,
    code varchar(255) unique not null,
    type_achat  type_achats  NOT NULL ,
    date_achat date NOT NULL ,
    mode_paiement varchar(50), 
    montant_total_ht float ,
    montant_total_ttc float NOT NULL ,
    montant_total_tva float  ,
    net_a_payer_ht float  ,
    remise float,
    net_a_payer float NOT NULL ,
    longitude_livraison varchar(50),
    latitude_livraison varchar(50),
    adresse_livraison varchar(50) NOT NULL ,
    date_prevu_livraison date NOT NULL ,
    commentaire varchar(250),
    annule bool NOT NULL ,

    user_code varchar(255)  NOT NULL ,
    grossiste_code varchar(255),
    fournisseur_code varchar(255),
    PRIMARY KEY (id, code),
    FOREIGN KEY(user_code) references users(code),
    FOREIGN KEY(fournisseur_code) references fournisseurs(code)
  );
  
  CREATE TYPE type_fidelites AS ENUM ('and', 'or'); --fidelites
  
  CREATE TABLE fidelites (
    id SERIAL,
    code varchar(255) unique not null,
    valeur varchar(50),
    date_debut date  NOT NULL ,
    date_fin date  NOT NULL ,
    cummulable varchar(50)  NOT NULL ,
    actif bool  NOT NULL ,
    condition type_fidelites  not null,

    gamme_code varchar(255)  NOT NULL ,
    sousFamille_code varchar(255)  NOT NULL ,
    famille_code varchar(255)  NOT NULL ,
    groupe_code varchar(255)  NOT NULL ,
    produit_code varchar(255)  NOT NULL ,
    user_code varchar(255),

    PRIMARY KEY (id),
    FOREIGN KEY(user_code) references users(code),

    FOREIGN KEY(gamme_code) references gammes(code),
    FOREIGN KEY(famille_code) references familles(code),
    FOREIGN KEY(sousFamille_code) references sousfamilles(code),
    FOREIGN KEY(groupe_code) references groupes(code)

  );
  
  CREATE TABLE promotions (
    id SERIAL,
    code varchar(255)  UNIQUE NOT NULL,
    libelle varchar(50)  NOT NULL ,
    type varchar(20)  NOT NULL ,
    valeur_min float,
    valeur_max float,
    qte_min float,
    qte_max float,
    date_debut date  NOT NULL ,
    date_fin date  NOT NULL ,
    remise float  NOT NULL ,
    actif bool  NOT NULL ,

    gamme_code varchar(255)  NOT NULL ,
    sousFamille_code varchar(255)  NOT NULL ,
    famille_code varchar(255)  NOT NULL ,
    groupe_code varchar(255)  NOT NULL ,

    produit_code varchar(255)NOT NULL,
    user_code varchar(255)  NOT NULL ,

    PRIMARY KEY (id),
    FOREIGN KEY(user_code) references users(code),
    FOREIGN KEY(produit_code) references produits(code),

    FOREIGN KEY(gamme_code) references gammes(code),
    FOREIGN KEY(famille_code) references familles(code),
    FOREIGN KEY(sousFamille_code) references sousfamilles(code),
    FOREIGN KEY(groupe_code) references groupes(code)

    
  );
  
 
  
  
  CREATE TABLE conditionfidelites (
    id SERIAL,
    type varchar(50)  NOT NULL ,
    code varchar(255) UNIQUE NOT NULL,

    qte_min float,
    qte_max float,
    chiffre_min float,
    chiffre_max float,

    gamme_code varchar(255)  NOT NULL ,
    sousFamille_code varchar(255)  NOT NULL ,
    famille_code varchar(255)  NOT NULL ,
    groupe_code varchar(255)  NOT NULL ,

    fidelite_code varchar(255),

    PRIMARY KEY (id),
    FOREIGN KEY(fidelite_code) references fidelites(code),
    FOREIGN KEY(gamme_code) references gammes(code),
    FOREIGN KEY(famille_code) references familles(code),
    FOREIGN KEY(sousFamille_code) references sousfamilles(code),
    FOREIGN KEY(groupe_code) references groupes(code)

  );
  
  
   CREATE TABLE gratuites (
    id SERIAL,
    code varchar(255) unique not null,
    date_debut date  NOT NULL ,
    date_fin date  NOT NULL ,
    cummulable varchar(50)  NOT NULL ,
    quantite float  NOT NULL ,
    actif bool  NOT NULL ,

    user_code varchar(255)  NOT NULL ,
    produit_code varchar(255)  NOT NULL ,

    gamme_code varchar(255)  NOT NULL ,
    sousFamille_code varchar(255)  NOT NULL ,
    famille_code varchar(255)  NOT NULL ,
    groupe_code varchar(255)  NOT NULL ,

    PRIMARY KEY (id),
    FOREIGN KEY(user_code) references users(code),
    FOREIGN KEY(produit_code) references produits(code),

    FOREIGN KEY(gamme_code) references gammes(code),
    FOREIGN KEY(famille_code) references familles(code),
    FOREIGN KEY(sousFamille_code) references sousfamilles(code),
    FOREIGN KEY(groupe_code) references groupes(code)

  );
  
  CREATE TABLE conditiongratuites (
    id SERIAL,
    code varchar(255) UNIQUE NOT NULL,
    type varchar(50)  NOT NULL ,
    qte_min float,
    qte_max float,
    chiffre_min float,
    chiffre_max float,
     
    produit_code varchar(255)  NOT NULL ,
    gamme_code varchar(255)  NOT NULL ,
    sousFamille_code varchar(255)  NOT NULL ,
    famille_code varchar(255)  NOT NULL ,
    groupe_code varchar(255)  NOT NULL ,

    gratuite_code varchar(255)  NOT NULL ,
    

    PRIMARY KEY (id),
    FOREIGN KEY(gratuite_code) references gratuites(code),
    FOREIGN KEY(produit_code) references produits(code),
    FOREIGN KEY(gamme_code) references gammes(code),
    FOREIGN KEY(famille_code) references familles(code),
    FOREIGN KEY(sousFamille_code) references sousfamilles(code),
    FOREIGN KEY(groupe_code) references groupes(code)

  );
  
  CREATE TYPE type_detailAchats AS ENUM ('achat', 'avoir','gratuite','demandeAvoir'); --type detail achats
  
  
  CREATE TABLE detailachats (
    id SERIAL, 
    quantite varchar(255)  NOT NULL ,
    type_detailAchat type_detailAchats  NOT NULL ,
    tva float,
    total_ht float,
    total_ttc float  NOT NULL ,
    total float  NOT NULL ,
    remise float  NOT NULL ,
    total_net_ht float,
    total_net float  NOT NULL ,
    date_creation date  NOT NULL ,

    produit_code varchar(255)  NOT NULL ,
    achat_code varchar(255)  NOT NULL ,
    gratuite_code varchar(255),

    PRIMARY KEY (id),
    FOREIGN KEY(produit_code) references produits(code),
    FOREIGN KEY(achat_code) references achats(code),
    FOREIGN KEY(gratuite_code) references gratuites(code)

  );

  CREATE TABLE stocks (
    id SERIAL,
    quantite float  NOT NULL ,

    produit_code varchar(255)  NOT NULL ,

    PRIMARY KEY (id),
    FOREIGN KEY(produit_code) references produits(code)

  );




CREATE TABLE commentaires (
  id SERIAL,
  contenu varchar(50),
  date_creation date,
  isDeleted bool ,

  produit_code varchar(50),
  user_code varchar(50),
  
  PRIMARY KEY (id),
    FOREIGN KEY(produit_code) references produits(code),
    FOREIGN KEY(user_code) references users(code)

);