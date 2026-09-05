init: help

build: ## Build the project
	@npm run build

preview: ## Preview the project
	@npm run preview

publish: build ## Build then publish the package to npm
	@npm publish --access public

help: ## Show command list
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'