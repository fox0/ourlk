SOURCES := $(shell find src -name '*.ts')

all: dist/ourlk.user.js

dist/ourlk.user.js: ${SOURCES} src/header.js node_modules
	npm run build
	cat src/header.js dist/ourlk.user.js > dist/temp.js && mv dist/temp.js dist/ourlk.user.js

node_modules:
	npm install

clean:
	rm -rf dist node_modules
