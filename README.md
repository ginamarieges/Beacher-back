# ENDPOINTS

## USER

- **[POST]/user/login**

  :green_circle: `Status 200`

  :red_circle: `Status 401 "Wrong credentials"`

  :red_circle: `Status 400 "Username is not allowed to be empty"`

  :red_circle: `Status 400 "Password is not allowed to be empty"`

## BEACHES

- **[GET]/beaches**

  :green_circle: `Status 200`

- **[DELETE]/beaches/delete/:id**

  :green_circle: `Status 200 "Beach successfully deleted"`

  :red_circle: `Status 404 "Beach not found"`

- **[POST]/beaches/**

  :green_circle: `Status 201 { newBeach }`

  :red_circle: `Status 400 "name is not allowed to be empty"`

  :red_circle: `Status 400 "town is not allowed to be empty"`

  :red_circle: `Status 400 "image is not allowed to be empty"`

  :red_circle: `Status 400 "region is not allowed to be empty"`

- **[GET] /beaches/:id**

  :green_circle: `Status 200 { beach }`

  :red_circle: `Status 404 "Beach not found"`

## ERRORS

:red_circle: `Status 404 "Endpoint not found"`

:red_circle: `Status 500 "General error"`
