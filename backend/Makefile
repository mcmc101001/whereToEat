DOCKER_USERNAME = mcmc101001
APP_VERSION = v3
APP_NAME = where-to-eat-backend
build:
	docker build --tag ${DOCKER_USERNAME}/${APP_NAME}:${APP_VERSION} .

run:
	docker run --rm --name ${APP_NAME} \
		-p 8080:8080 \
		--env-file .env \
		${DOCKER_USERNAME}/${APP_NAME}:${APP_VERSION}