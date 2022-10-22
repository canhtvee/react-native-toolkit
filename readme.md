# Dependency graph

`Philosophy`: all things are JS modules, applications only contains `views` and `views's dependencies = utils`

1. `utils` contains base Js modules, and it has no dependencies
2. `commons` contains common Js modules, and only depends on `utils`
   - `commons's childs` depend on `utils`
   - `common module and it's siblings` depend on each other
3. `screens` contains screens of application, and only depends on `commons` and `utils`
   - `screens's childs` depend on `commons` and `utils`
   - `screen and it's siblings` are independent of each other
4. `containers` depend on `screens`, `commons`, and `utils`

## containers node

```
containers
    |___navigator
    |___navigator
    |___...
    :
```

## screens node

```
screens
    |___screen
    |   |___modules
    |   |   |___services
    |   |   |___hooks
    |   |   |
    |   |___component
    |   |___component
    |   |___...
    |   |
    |
    :
```

## commons node

```
commons
    |___modules
    |   |___component
    |   |___service
    |   :
    :
```

## utils node

```
utils
    |___resources
    |   |___colors
    |   |___strings
    |   :
    |
    |
    |___modules
    |   |___theme
    |   |___language
    |   :
    |
    |
    |___hooks
```
