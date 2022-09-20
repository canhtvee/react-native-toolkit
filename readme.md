# Dependency graph

`Philosophy`: all things are JS modules, applications only contains `views` and `views's dependencies = utils`

1. `utils` is independent
2. `commons` only depend on `utils`
   - `commons's child` depend on `utils` and `siblings`
3. `screens` only depend on `commons` and `utils`
   - `screens's child` depend on `utils` and `commons`
   - `siblings` are independent of each other
4. `containers` depend on `screens`, `commons`, and `utils`

## containers node

```
containers
      |__navigator
      |__navigator
      |__...
      :
      :
```

## screens node

```
screens
      |__screen
      |        |__items
      |        |      |__component
      |        |      |__component
      |        |      |__...
      |        |
      |        |__modules
      |        |      |__hook
      |        |      |__service
      |        |      :
      |        |______|__...
      :
      :
```

## commons node

```
commons
      |__module
      |        |__component
      |        |__service
      |        :
      :        |__..
      :
      |__...
```

## utils node

```
utils
    |__resources
    |         |__colors
    |         |__strings
    |         :
    |         |__...
    |__modules
    |         |__theme
    |         |__language
    |         :
    |         |__...
    |
    |__hooks
```
