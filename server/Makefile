SHELL := /bin/bash

.PHONY: help migrate seed

help: ## This help message
	@echo "usage: make [target]"
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m: \2/')"

migrate: ## Run db migrate
	exec node_modules/.bin/sequelize db:migrate

seed: ## Run db seed
	exec node_modules/.bin/sequelize db:seed:all

