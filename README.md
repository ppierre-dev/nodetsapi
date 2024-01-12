# API RESTFUL pour une application type UberEats

## Endpoints
### `POST /admin/restaurant`
Création d'un nouveau restaurant
Exemple de payload :
```json
{
    "name": "Le Petit Bistro",
    "ownerName": "Isabelle Dupont",
    "foodTypes": ["French", "Seafood"],
    "postalCode": "75001",
    "address": "10 Rue de la Roquette",
    "phone": "01 45 67 89 10",
    "email": "lepetitbistro@gmail.com",
    "password": "qwerty"
}
```
