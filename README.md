# proyecto-2

# Portal de opiniones 

Este ejercicio consiste en crear una API que simule el funcionamiento de una aplicación de un portal de opiniones.


# Entidades 

User:
  -id
  -email
  -password
  -create_ad
opinions:
  -id
  -user
  -text
  -Votos de opiniones negativas o positivas (opcional)
  -created_ad

  # Endpoints
  -**POST /user** Endpoint: registro de usuarios
  -**POST /login** Endpoint: login de usuarios
  -**GET /** Endpoint: listado de opiniones publicadas. Cada opinión deberá
  incluir información del creador como el nombre
  -**POST/** Endpoint: publicación de una opinión
  -**PATCH/** Endpoint: actualización del perfil de usuario