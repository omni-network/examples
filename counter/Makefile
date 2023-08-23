.PHONY: deploy-%
deploy-%:
	@if [[ "$*" == "local"|| "$*" == "testnets" || "$*" == "omni" ]]; then \
		cd contracts && \
		if [ ! -d "node_modules" ]; then \
			echo "Installing dependencies..."; \
			yarn install; \
		fi && \
		../scripts/deploy.sh $*; \
	else \
		echo "Invalid target. Must be either 'local', 'testnet' or 'omni'."; \
		exit 1; \
	fi

.PHONY: serve
serve:
	@cd ui; \
	if [ ! -d "node_modules" ]; then \
		yarn install; \
	fi; \
	npx wagmi generate; \
	yarn dev;
