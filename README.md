# API de Autorização

## Criando Chaves
### Criar Chaves RS256 e transformar para `base64`
```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwt.key
openssl rsa -in jwt.key -pubout -outform PEM -out jwt.key.pub
```

### Criar arquivo `.env`
```bash
ACCESS_TOKEN_PRIVATE_KEY="private_key_base64"
ACCESS_TOKEN_PUBLIC_KEY="public_key_base64"
```

## Utilização via Docker
```bash
docker compose up -d
```

## Criação de Token JWT
### `/validation/create`, método `POST`
Requisição
```json
{
    "key": "chave para criação do token"
}
```

Retorno
```json
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIxMjMiLCJpYXQiOjE..."
}
```

## Verificação de Token JWT
### `/validation/verify`, método `POST`
Requisição
```json
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIxMjMiLCJpYXQiOjE..."
}
```

Retorno
```json
{
    "valid": true,
    "expired": false,
    "decoded": {
        "key": "chave para criação do token",
        "iat": 1709012080,
        "exp": 1709012980
    }
}
```
