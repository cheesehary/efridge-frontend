#!/bin/sh
if [ "$TRAVIS_TEST_RESULT" = 0 ]
then
  sudo pip install --upgrade pip;
  pip --version;
  pip install awscli --upgrade --user;
  aws --version;
  export PATH="$PATH:$HOME/.local/bin";
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin;
  docker build -f budget-service/Dockerfile.prod -t "$DOCKER_REPO:latest" .;
  docker push "$DOCKER_REPO:latest";
  aws ecs update-service --cluster money-pot --service app-service --force-new-deployment;
else
  echo "Test failed";
fi