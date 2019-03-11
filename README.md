# demond


# build

stack build --fast

# release

stack clean
stack build

# fix horrors

rm -rf .stack-work

# run

stack exec demond-exe

# repl

stack repl

# deploy

The application is deployed at

https://dashboard.heroku.com/apps/demond

linked to

https://github.com/Anniepoo/demond

and uses the fine/stack buildset

```
heroku buildpacks:set fine/stack
```

TODO  - at some point use the env variables to set a difficulty level

heroku config:set VAR_NAME=var_value
