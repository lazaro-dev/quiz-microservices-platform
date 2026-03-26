#!/bin/bash

if [ $1 == '-u' ]
then
   docker-compose -f docker-compose.dev.yml up -d --remove-orphans
elif [ $1 == '-d' ]
then
   docker-compose -f docker-compose.dev.yml down
elif [ $1 == '-b' ]
then
   docker-compose -f docker-compose.dev.yml build $2
fi
