# Dependency graph

`Philosophy`: all things are JS modules, applications only contains `views` and `views's dependencies = utils`

1. `utils` contains base Js modules, and it has no dependencies
2. `commons` contains common Js modules, and only depends on `utils`
   - `commons's childs` depend on `utils`
   - `common module and it's siblings` depend on each other
3. `features` contains screens of application, and only depends on `commons` and `utils`
   - `features's childs` depend on `commons` and `utils`
   - `feature and it's siblings` are independent of each other
4. `containers` depend on `features`, `commons`, and `utils`

## containers node

```
containers
    |___navigator
    |___navigator
    |___...
    :
```

## features node

```
features
    |___feature
    |   |___service
    |   |___hook
    |   |___component
    |   |___...
    |
    |___feature
    |   |___screen
    |   |   |___service
    |   |   |___hook
    |   |   |___component
    |___|___|___...
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
